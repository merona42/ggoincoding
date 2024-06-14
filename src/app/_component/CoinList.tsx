"use client"

import { useQuery } from "@tanstack/react-query"
import { getSuccessCoins } from "../_lib/getSuccessCoins"
import { Coin as ICoin} from "@/model/Coin"
import Coin from "./Coin"

type Probs = {
    today: Date
}
export default function CoinList({today}:Probs){
    const {data}= useQuery({
        queryKey:['coins','success',today.toDateString()],
        queryFn: getSuccessCoins
    })

    if(data && data.length>0){
        return (data?.map((coin)=>(
            <Coin key={coin.coinId} coin={coin}></Coin>
        )))
    }
    return <div style={{color:'gray'}}>코인 데이터가 없습니다.</div>
}