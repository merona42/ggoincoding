import { Coin as ICoin } from "@/model/Coin"
import { useQuery } from "@tanstack/react-query"
import { getCharts } from "../_lib/getCharts"
import Chart from "./Chart"
import { getTrades } from "../_lib/getTrades"
import { coinMappingList } from "../_datas/CoinMappingList"
import { useContext } from "react"
import { SelectedBarContext } from "./SelectedBarProvider"
import dayjs from "dayjs"
type Probs={
    coin:string | undefined,
    today: Date,
}
export default function ChartList({coin, today}:Probs){

    const {selectedBar,setSelectedBar} = useContext(SelectedBarContext);
    if(!coin){
        return(<div>
            선택된 코인이 없습니다.
        </div>)
    }
    const {data : chartData}= useQuery({
        queryKey:['charts',coin as string,dayjs(today).format('YYYY-MM-DD')],
        queryFn: getCharts,
    })
    const {data: tradeData} = useQuery({
        queryKey:['trades',coin as string,dayjs(today).format('YYYY-MM-DD')],
        queryFn: getTrades,
    })
    return chartData?.length ? <Chart charts={chartData} trades={tradeData} selectedBar={selectedBar}/>: <>
        <div>
            아직 차트가 없습니다.
        </div>
    </>

        
    
}