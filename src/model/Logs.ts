//src\model\Logs.ts
export interface Logs {
    id: string;
    timeStamp: Date;
    coin_symbol: string;
    market: string;
    gap: number;
    isSuccess: number;
    details: string;
    price: number;
}