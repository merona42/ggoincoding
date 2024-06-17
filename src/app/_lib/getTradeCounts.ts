import { Coin } from "@/model/Coin";
import { QueryFunction } from "@tanstack/react-query";


export const getTradeCounts : QueryFunction<Coin[],[_1:string, _2:string, today:string]>
 = async({queryKey})=>{
    const [_1,_2,today] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tradeCounts/route`);
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}