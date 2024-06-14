import { TradeCount } from "@/model/TradeCount";
import { QueryFunction } from "@tanstack/react-query";


export const getTradeCounts : QueryFunction<TradeCount>
 = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tradeCounts`,{
        next:{
            tags: ['tradeCounts']
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}