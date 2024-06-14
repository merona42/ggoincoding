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

    const combinedChartData: ChartData<"bar" | "line", { x: Date, y: number }[], Date> = {
        labels: charts.map(chart => new Date(chart.timeStamp)),
        datasets: [
            {
                label: charts[0].Coin.market_type,
                type: 'line' as const,
                data: charts.map(chart => ({ x: new Date(chart.timeStamp), y: chart.price_diff * 100 })), // 값을 퍼센트로 변환
                borderColor: charts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(46,209,205)' : 'rgb(112,225,36)',
                backgroundColor: charts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(46,209,205)' : 'rgb(112,225,36)',
                pointBackgroundColor: charts.map(chart => chart.price_diff >= threshold ? 'rgb(197,18,89)' : (charts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(41,188,185)' : 'rgb(92,193,26)')),
                pointBorderColor: charts.map(chart => chart.price_diff >= threshold ? 'rgb(197,18,89)' : (charts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(41,188,185)' : 'rgb(92,193,26)')),

                fill: false,
                yAxisID: 'y-axis-1',
                segment: {
                    borderColor: (ctx) => {
                        if ((ctx.p0.parsed.y >= threshold * 100 && ctx.p1.parsed.y >= threshold * 100)) { // 값을 퍼센트로 변환
                            return 'rgb(234, 21, 106)';
                        }
                        return charts[0].Coin.market_type === 'binance-bitthumb' ? 'rgb(46,209,205)' : 'rgb(112,225,36)';
                    }
                }
            },
            ...(trades ? [{
                label: 'Trades',
                type: 'bar' as const,
                data: trades.map(trade => ({ x: new Date(trade.timeStamp), y: trade.price })),
                backgroundColor: trades.map(trade => trade.type === 'buy' ? 'green' : trade.type === 'sell' ? 'rgb(192,63,192)' : 'orange'),
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
                            const chart = charts[chartIndex];
                            return `Time: ${dayjs(chart.timeStamp).format('HH:mm:ss') }, Price Diff: ${(chart.price_diff * 100).toFixed(2)}%`; // 툴팁에 퍼센트 표시
                        } else if (context.dataset.type === 'bar') {
                            const tradeIndex = context.dataIndex;
                            const trade = trades![tradeIndex];
                            return `Type: ${trade.type}, Time: ${dayjs(trade.timeStamp).format('HH:mm:ss')}, Price: ${trade.price}` + (trade.market ? `, Market: ${trade.market}` : '');
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
        <div>
            <div className={style.chartContainer} style={{ overflowX: 'auto' }}>
                <Chart type='bar' data={combinedChartData} options={options} />
            </div>
        </div>
    );
}
