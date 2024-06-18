"use client";
import React, { useRef, useEffect } from "react";
import { Chart as IChart } from "@/model/Chart";
import { Chart as ChartJS, registerables, ChartData, ChartOptions, TooltipItem, ChartTypeRegistry, Plugin } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Trade as ITrade } from "@/model/Trade";
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import zoomPlugin from 'chartjs-plugin-zoom';
import dayjs from "dayjs";
import style from "./chart.module.css";
import { SelectedBarContext } from "./SelectedBarProvider";
ChartJS.register(...registerables, annotationPlugin, zoomPlugin);

type Props = {
    charts: IChart[],
    trades: ITrade[] | undefined,
    selectedBar: any
}

const borderPlugin: Plugin<'bar' | 'line'> = {
    id: 'borderPlugin',
    beforeDraw: (chart, args, options) => {
        const { ctx, chartArea: { left, right, top, bottom }, scales: { x, y } } = chart;
        const selectedBar = options.selectedBar; // Access selectedBar from plugin options
        if (selectedBar) {
            const tradeTimestamp = new Date(selectedBar.timeStamp).getTime();
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                if (dataset.type === 'bar') {
                    (dataset.data as unknown as { x: Date, y: number }[]).forEach((dataPoint, index) => {
                        if (typeof dataPoint === 'object' && dataPoint !== null && 'x' in dataPoint && 'y' in dataPoint) {
                            const barTimestamp = new Date(dataPoint.x).getTime();
                            if (barTimestamp === tradeTimestamp) {
                                const meta = chart.getDatasetMeta(datasetIndex);
                                const bar = meta.data[index];
                                const { x: barX, y: barY, width: barWidth, height: barHeight } = bar.getProps(['x', 'y', 'width', 'height'], false);
                                ctx.save();
                                ctx.strokeStyle = 'red';
                                ctx.lineWidth = 2;
                                ctx.strokeRect(barX - barWidth / 2 - 4, barY - 7, barWidth + 8, barHeight + 8);
                                ctx.restore();
                            }
                        }
                    });
                }
            });
        }
    }
};

ChartJS.register(borderPlugin);

// 확장된 타입 정의
type ExtendedChartOptions<TType extends keyof ChartTypeRegistry> = ChartOptions<TType> & {
    plugins: {
        borderPlugin?: { selectedBar: any };
    };
};

const ChartComponent = ({ charts, trades, selectedBar }: Props) => {
    const chartRef = useRef<ChartJS<'bar' | 'line', { x: Date, y: number }[], unknown>>(null);
    const threshold = 0.03;
    const gapThreshold = 20000; // 20초를 밀리초로 변환
    const colorMappingTable: { [key: string]: string } = {
        "판매 성공": 'rgb(29,232,237)',
        "상환 성공": 'rgb(198,33,233)',
        "전송 가능": 'rgb(96,220,20)',
        "대출 성공": 'rgb(55,185,78)',
        "전송 성공": 'rgb(53,77,187)',
        "바이백 성공": 'rgb(226,221,14)',
    };

    // 모든 timeStamp 값을 Date 객체로 변환합니다.
    const convertedCharts = charts.map(chart => ({
        ...chart,
        timeStamp: new Date(chart.timeStamp)
    }));

    const groupedTrades = trades ? trades.reduce((acc, trade) => {
        const key = trade.isSuccess ? trade.type : '실패';
        if (!acc[key]) {
            acc[key] = {
                label: key,
                type: 'bar' as const,
                data: [],
                backgroundColor: trade.isSuccess ? colorMappingTable[trade.type] : 'red',
                yAxisID: 'y-axis-2',
            };
        }
        acc[key].data.push({ x: new Date(trade.timeStamp), y: trade.price });
        return acc;
    }, {} as { [key: string]: ChartData<"bar", { x: Date, y: number }[], Date>["datasets"][0] }) : {};

    const combinedChartData: ChartData<"bar" | "line", { x: Date, y: number }[], Date> = {
        labels: convertedCharts.map(chart => chart.timeStamp),
        datasets: [
            {
                label: 'binance-bitthumb',
                type: 'line' as const,
                data: convertedCharts.map(chart => ({ x: chart.timeStamp, y: chart.price_diff * 100 })), // 값을 퍼센트로 변환
                borderColor: 'brown',
                backgroundColor: 'brown',
                pointBackgroundColor: 'brown',
                pointBorderColor: 'brown',
                fill: false,
                yAxisID: 'y-axis-1',
                segment: {
                    borderColor: (ctx) => {
                        const index = ctx.p1DataIndex;
                        const prevIndex = index - 1;
                        if (prevIndex >= 0 && (convertedCharts[index].timeStamp.getTime() - convertedCharts[prevIndex].timeStamp.getTime() >= gapThreshold)) {
                            return 'rgba(0,0,0,0)'; // 선을 잇지 않음
                        }
                    }
                }
            },
            ...Object.values(groupedTrades)
        ],
    };

    const options: ExtendedChartOptions<"bar" | "line"> = {
        scales: {
            x: {
                type: 'time', // 명시적으로 "time"으로 설정
                time: {
                    unit: 'second',
                    displayFormats: {
                        second: 'HH:mm:ss',
                    },
                },
                grid: {
                    display: false, // 수직 격자선을 비활성화
                },
            },
            'y-axis-1': {
                type: 'linear',
                position: 'left',
                ticks: {
                    callback: function (value) {
                        return `${value}%`; // Y축 레이블에 퍼센트 표시
                    }
                }
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    thresholdLine: {
                        type: 'line',
                        yMin: threshold * 100, // 값을 퍼센트로 변환
                        yMax: threshold * 100, // 값을 퍼센트로 변환
                        borderColor: 'red',
                        borderWidth: 1,
                        label: {
                            content: 'Threshold',
                            position: 'end'
                        }
                    }
                }
            },
            tooltip: {
                callbacks: {
                    title: function () {
                        return ''; // 제목 제거
                    },
                    label: function (context: TooltipItem<"bar" | "line">) {
                        if (context.dataset.type === 'line') {
                            const chartIndex = context.dataIndex;
                            const chart = convertedCharts[chartIndex];
                            return `Time: ${dayjs(chart.timeStamp).format('HH:mm:ss')}, Price Diff: ${(chart.price_diff * 100).toFixed(2)}%`; // 툴팁에 퍼센트 표시
                        } else if (context.dataset.type === 'bar') {
                            const dataPoint = context.raw as { x: Date, y: number };
                            const trade = trades!.find(trade => new Date(trade.timeStamp).getTime() === dataPoint.x.getTime());
                            return `Type: ${trade?.type}\nTime: ${dayjs(trade?.timeStamp).format('HH:mm:ss')}\nPrice: ${trade?.price}\n`+ `성공여부: ` + (trade?.isSuccess ? '성공\n' : '실패\n');
                        }
                        return '';
                    }
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                }
            },
            borderPlugin: {
                selectedBar: selectedBar // Pass selectedBar to the plugin options
            }
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [selectedBar]);

    return (
        <div style={{ width: '100%' }}>
            <div className={style.chartContainer} style={{ overflowX: 'auto', width: '100%' }}>
                <Chart ref={chartRef} type='bar' data={combinedChartData} options={options} style={{ width: '100%', height: '500px' }} />
            </div>
        </div>
    );
}

export default ChartComponent;
