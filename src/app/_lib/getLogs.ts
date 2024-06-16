//src\app\_lib\getLogs.ts
import { Logs } from "@/model/Logs";
import { QueryFunction } from "@tanstack/react-query";

export const getLogs: QueryFunction<Logs[], [_1: string, _2: string, today: string]>
  = async ({ queryKey }) => {
    const [_1, _2, today] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/src/api/logs/${today}`, {
      headers: {
        'tags': ['logs', today].join(',')
      }
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }