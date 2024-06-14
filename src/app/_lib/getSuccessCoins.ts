import { Coin } from "@/model/Coin";
import { QueryFunction } from "@tanstack/react-query";


export const getSuccessCoins : QueryFunction<Coin[],[_1:string, _2:string, today:string]>
 = async({queryKey})=>{
    const [_1,_2,today] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coins/success/${today}`,{
        next:{
            tags: ['coins','success',today]
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}