import { Chart } from "@/model/Chart";
import { QueryFunction } from "@tanstack/react-query";



export const getCharts: QueryFunction<Chart[], [_1: string, coinName: string, today: string]>
    = async ({ queryKey }) => {
        const [_1, coinName, today] = queryKey;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/charts/${coinName}/${today}/route`,{
            next:{
                tags: ['charts',coinName,today]
            }
        })
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    }