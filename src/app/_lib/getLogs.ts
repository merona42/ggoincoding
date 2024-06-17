import { Chart } from "@/model/Chart";
import { Trade as ITrade } from "@/model/Trade";
import { QueryFunction } from "@tanstack/react-query";



export const getLogs : QueryFunction<ITrade[],[_1:string, today:string]>
 = async({queryKey})=>{
    const [_1,today] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logs/${today}/route`,{
        next:{
            tags: ['logs', today]
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}