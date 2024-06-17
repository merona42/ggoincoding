import { Chart } from "@/model/Chart";
import { QueryFunction } from "@tanstack/react-query";



export const getCharts : QueryFunction<Chart[],[_1:string, coinName:string, today:string]>
 = async({queryKey})=>{
    let [_1,coinName,today] = queryKey;
    coinName = coinName.replace(/\s+/g, '-').toLowerCase();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/charts/${coinName}/${today}`,{
        next:{
            tags: ['charts',coinName,today]
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch data');
    }
    return res.json();
}