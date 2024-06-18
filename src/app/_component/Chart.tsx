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
                                ctx.strokeStyle = 'rgba(255,99,132,0.8)'; // red with transparency
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
        "판매 성공": 'rgba(34,193,195,0.8)', // teal
        "상환 성공": 'rgba(253,187,45,0.8)', // gold
        "전송 가능": 'rgba(54,162,235,0.8)', // blue
        "대출 성공": 'rgba(75,192,192,0.8)', // light teal
        "전송 성공": 'rgba(255,159,64,0.8)', // orange
        "바이백 성공": 'rgba(255,99,132,0.8)', // red
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
                backgroundColor: trade.isSuccess ? colorMappingTable[trade.type] : 'rgba(255,69,0,0.8)', // red for failure
                yAxisID: 'y-axis-2',
            };
        }
        acc[key].data.push({ x: new Date(trade.timeStamp), y: 30000 });
        return acc;
    }, {} as { [key: string]: ChartData<"bar", { x: Date, y: number }[], Date>["datasets"][0] }) : {};

    const combinedChartData: ChartData<"bar" | "line", { x: Date, y: number }[], Date> = {
        labels: convertedCharts.map(chart => chart.timeStamp),
        datasets: [
            {
                label: 'binance-bitthumb',
                type: 'line' as const,
                data: convertedCharts.map(chart => ({ x: chart.timeStamp, y: chart.price_diff * 100 })), // 값을 퍼센트로 변환
                borderColor: 'rgba(75,192,192,0.8)', // light teal
                backgroundColor: 'rgba(75,192,192,0.2)',
                pointBackgroundColor: 'rgba(75,192,192,0.8)',
                pointBorderColor: 'rgba(75,192,192,0.8)',
                fill: true,
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
                ticks: {
                    color: '#4e5d6c'
                },
            },
            'y-axis-1': {
                type: 'linear',
                position: 'left',
                ticks: {
                    callback: function (value) {
                        return `${value}%`; // Y축 레이블에 퍼센트 표시
                    },
                    color: '#4e5d6c'
                },
                grid: {
                    color: 'rgba(78, 93, 108, 0.1)'
                }
            },
            'y-axis-2': {
                type: 'linear',
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    color: '#4e5d6c'
                }
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    thresholdLine: {
                        type: 'line',
                        yMin: threshold * 100, // 값을 퍼센트로 변환
                        yMax: threshold * 100, // 값을 퍼센트로 변환
                        borderColor: 'rgba(217, 83, 79, 0.8)', // deep red
                        borderWidth: 2,
                        label: {
                            content: 'Threshold',
                            position: 'end',
                            backgroundColor: 'rgba(217, 83, 79, 0.7)',
                            color: 'white'
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
                            return `Time: ${dayjs(chart.timeStamp).format('HH:mm:ss')}, 차익: ${(chart.price_diff * 100).toFixed(2)}%`; // 툴팁에 퍼센트 표시
                        } else if (context.dataset.type === 'bar') {
                            const dataPoint = context.raw as { x: Date, y: number };
                            const trade = trades!.find(trade => new Date(trade.timeStamp).getTime() === dataPoint.x.getTime());
                            return `Type: ${trade?.type}\nTime: ${dayjs(trade?.timeStamp).format('HH:mm:ss')}\n`+ ((trade?.type==='판매 성공' || trade?.type==='바이백 성공') ? `가격 : ${trade.price}` : '');
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
