//src\app\_lib\getLogs.ts
import { Logs } from "@/model/Logs";
import { QueryFunction } from "@tanstack/react-query";

export const getLogs: QueryFunction<Logs[], [_1: string, today: string]>
  = async ({ queryKey }) => {
    const [_1, today] = queryKey;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logs/${today}`, {
      next: {
        'tags': ['logs', today]
      }
    })
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }