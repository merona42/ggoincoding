import { Coin } from "@/model/Coin";
import { QueryFunction } from "@tanstack/react-query";


export const getCoins : QueryFunction<Coin[],[_1:string, today:string]>
 = async({queryKey})=>{
    const [_1,today] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coins/${today}`,{
        next:{
            tags: ['coins',today]
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}