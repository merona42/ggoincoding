"use client";
import { useState } from "react";
import { Chart as IChart } from "@/model/Chart";
import { Chart as ChartJS, registerables, ChartData, ChartOptions, TooltipItem } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Trade as ITrade } from "@/model/Trade";
import 'chartjs-adapter-date-fns'; // date-fns 어댑터 import
import annotationPlugin from 'chartjs-plugin-annotation'; // annotation 플러그인 import
import zoomPlugin from 'chartjs-plugin-zoom'; // zoom 플러그인 import
import dayjs from "dayjs";
import style from "./chart.module.css";
ChartJS.register(...registerables, annotationPlugin, zoomPlugin);

type Props = {
    charts: IChart[],
    trades: ITrade[] | undefined,
}

export default function ChartComponent({ charts, trades }: Props) {
    const threshold = 0.03;
    const gapThreshold = 20000; // 20초를 밀리초로 변환

    // 모든 timeStamp 값을 Date 객체로 변환합니다.
    const convertedCharts = charts.map(chart => ({
        ...chart,
        timeStamp: new Date(chart.timeStamp)
    }));

    const combinedChartData: ChartData<"bar" | "line", { x: Date, y: number }[], Date> = {
        labels: convertedCharts.map(chart => chart.timeStamp),
        datasets: [
            {
                label: convertedCharts[0].Coin.market_type,
                type: 'line' as const,
                data: convertedCharts.map(chart => ({ x: chart.timeStamp, y: chart.price_diff * 100 })), // 값을 퍼센트로 변환
                borderColor: convertedCharts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(46,209,205)' : 'rgb(112,225,36)',
                backgroundColor: convertedCharts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(46,209,205)' : 'rgb(112,225,36)',
                pointBackgroundColor: /*convertedCharts.map(chart => chart.price_diff >= threshold ? 'rgb(197,18,89)' :*/ (convertedCharts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(41,188,185)' : 'rgb(92,193,26)'),
                pointBorderColor: /*convertedCharts.map(chart => chart.price_diff >= threshold ? 'rgb(197,18,89)' : */(convertedCharts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(41,188,185)' : 'rgb(92,193,26)'),
                fill: false,
                yAxisID: 'y-axis-1',
                segment: {
                    borderColor: (ctx) => {
                        const index = ctx.p1DataIndex;
                        const prevIndex = index - 1;
                        if (prevIndex >= 0 && (convertedCharts[index].timeStamp.getTime() - convertedCharts[prevIndex].timeStamp.getTime() >= gapThreshold)) {
                            return 'rgba(0,0,0,0)'; // 선을 잇지 않음
                        }
                        // return (ctx.p0.parsed.y >= threshold * 100 && ctx.p1.parsed.y >= threshold * 100) ? 'rgb(234, 21, 106)' :
                        //     (convertedCharts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(46,209,205)' : 'rgb(112,225,36)');
                    }
                }
            },
            ...(trades ? [{
                label: 'Trades',
                type: 'bar' as const,
                data: trades.map(trade => ({ x: new Date(trade.timeStamp), y: trade.price })),
                backgroundColor: trades.map(trade => trade.isSuccess ? (trade.type === 'buy' ? 'green' : trade.type === 'sell' ? 'rgb(192,63,192)' : 'orange') : 'red'),
                barThickness: 2,
                yAxisID: 'y-axis-2',
            }] : [])
        ],
    };

    const options: ChartOptions<"bar" | "line"> = {
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
                    callback: function(value) {
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
                            return `Time: ${dayjs(chart.timeStamp).format('HH:mm:ss') }, Price Diff: ${(chart.price_diff * 100).toFixed(2)}%`; // 툴팁에 퍼센트 표시
                        } else if (context.dataset.type === 'bar') {
                            const tradeIndex = context.dataIndex;
                            const trade = trades![tradeIndex];
                            return `Type: ${trade.type}, Time: ${dayjs(trade.timeStamp).format('HH:mm:ss')}, Price: ${trade.price}` + (trade.market ? `, Market: ${trade.market}` : '') +`, `+`성공여부: `+(trade.isSuccess ? '성공' : '실패');
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
            }
        }
    };

    return (
        <div style={{ width: '100%'}}>
            <div className={style.chartContainer} style={{ overflowX: 'auto', width: '100%'} }>
                <Chart type='bar' data={combinedChartData} options={options}  style={{ width: '100%', height: '500px' }}/>
            </div>
        </div>
    );
}
