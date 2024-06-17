"use client"

import { useQuery } from "@tanstack/react-query"
import { getCoins } from "../_lib/getCoins"
import { Coin as ICoin} from "@/model/Coin"
import Coin from "./Coin"
import dayjs from "dayjs"
type Probs = {
    today: Date
}
export default function CoinList({today}:Probs){
    const {data}= useQuery({
        queryKey:['coins',dayjs(today).format('YYYY-MM-DD')],
        queryFn: getCoins
    })

    if(data && data.length>0){
        return (data?.map((coin)=>(
            <Coin key={coin.coinId} coin={coin.symbol}></Coin>
        )))
    }
    return <div style={{color:'gray'}}>코인 데이터가 없습니다.</div>
}