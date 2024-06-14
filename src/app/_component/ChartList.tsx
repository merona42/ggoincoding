import { Coin as ICoin } from "@/model/Coin"
import { useQuery } from "@tanstack/react-query"
import { getCharts } from "../_lib/getCharts"
import Chart from "./Chart"
import { getTrades } from "../_lib/getTrades"

type Probs={
    coin:ICoin | undefined,
    today: Date,
}
export default function ChartList({coin, today}:Probs){
    console.log(coin);
    if(!coin){
        return(<div>
            선택된 코인이 없습니다.
        </div>)
    }
    const {data : chartData}= useQuery({
        queryKey:['charts',coin.name,coin.market_type,today.toDateString()],
        queryFn: getCharts
    })
    const {data: tradeData} = useQuery({
        queryKey:['trades',coin.name,coin.market_type,today.toDateString()],
        queryFn: getTrades
    })
    return chartData?.length ? <Chart charts={chartData} trades={tradeData}/>: <>
        <div>
            아직 차트가 없습니다.
        </div>
    </>

        
    
}