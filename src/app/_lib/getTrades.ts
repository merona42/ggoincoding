import { Chart } from "@/model/Chart";
import { Trade as ITrade } from "@/model/Trade";
import { QueryFunction } from "@tanstack/react-query";



export const getTrades : QueryFunction<ITrade[],[_1:string, coinName:string,marketType:string, today:string]>
 = async({queryKey})=>{
    const [_1,coinName,marketType,today] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trades/${coinName}/${marketType}/${today}`,{
        next:{
            tags: ['trades',coinName,marketType,today]
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}