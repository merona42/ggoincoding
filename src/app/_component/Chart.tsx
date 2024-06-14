"use client";
import { Chart as IChart } from "@/model/Chart";
import { Chart as ChartJS, registerables, ChartData, ChartOptions, TooltipItem, ChartDataset } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Trade as ITrade } from "@/model/Trade";
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter
import dayjs from "dayjs";
ChartJS.register(...registerables);




type Props = {
    charts: IChart[],
    trades: ITrade[] | undefined,
}

export default function ChartComponent({ charts, trades }: Props) {
    const threshold = 3; 

    const combinedChartData: ChartData<"bar" | "line", { x: Date, y: number }[], Date> = {
        labels: charts.map(chart => new Date(chart.timeStamp)),
        datasets: [
            {
                label: charts[0].Coin.market_type,
                type: 'line' as const,
                data: charts.map(chart => ({ x: new Date(chart.timeStamp), y: chart.price_diff })),
                borderColor: charts[0].Coin.market_type === 'binance-bitthumb' ? 'blue' : 'green',
                backgroundColor: charts[0].Coin.market_type === 'binance-bitthumb' ? 'blue' : 'green',
                pointBackgroundColor: charts.map(chart => chart.price_diff >= threshold ? 'red' : (charts[0].Coin.market_type === 'binance-bitthumb' ? 'blue' : 'green')),
                pointBorderColor: charts.map(chart => chart.price_diff >= threshold ? 'red' : (charts[0].Coin.market_type === 'binance-bitthumb' ? 'blue' : 'green')),

                fill: false,
                yAxisID: 'y-axis-1',
                segment: {
                    borderColor: (ctx) => {
                        if ((ctx.p0.parsed.y >= threshold && ctx.p1.parsed.y >= threshold)) {
                            return 'red';
                        }
                        return charts[0].Coin.market_type === 'binance-bitthumb' ? 'blue' : 'green';
                    }
                }
            },
            ...(trades ? [{
                label: 'Trades',
                type: 'bar' as const,
                data: trades.map(trade => ({ x: new Date(trade.timeStamp), y: trade.price })),
                backgroundColor: trades.map(trade => trade.type === 'buy' ? 'green' : trade.type === 'sell' ? 'red' : 'orange'),
                barThickness: 2,
                yAxisID: 'y-axis-2',
            }] : [])
        ],
    };

    const options: ChartOptions<"bar" | "line"> = {
        scales: {
            x: {
                type: 'time', // Ensure this is explicitly "time"
                time: {
                    unit: 'second',
                    displayFormats: {
                        second: 'HH:mm:ss',
                    }
                },
                grid: {
                    display: false, // Disable vertical grid lines
                }
            },
            'y-axis-1': {
                type: 'linear',
                position: 'left',
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
            tooltip: {
                callbacks: {
                    title: function() {
                        return ''; // 제목 제거
                    },
                    label: function(context: TooltipItem<"bar" | "line">) {
                        if (context.dataset.type === 'line') {
                            const chartIndex = context.dataIndex;
                            const chart = charts[chartIndex];
                            return `Time: ${dayjs(chart.timeStamp).format('HH:mm:ss') }, Price Diff: ${chart.price_diff}`;
                        } else if (context.dataset.type === 'bar') {
                            const tradeIndex = context.dataIndex;
                            const trade = trades![tradeIndex];
                            return `Type: ${trade.type}, Time: ${dayjs(trade.timeStamp).format('HH:mm:ss')}, Price: ${trade.price}` + (trade.market ? `, Market: ${trade.market}` : '');
                        }
                        return '';
                    }
                }
            }
        }
    };

    return (
        <div>
            <Chart type='bar' data={combinedChartData} options={options} />
        </div>
    );
}
