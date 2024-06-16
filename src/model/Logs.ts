//src\model\Logs.ts
export interface Logs {
    id: number;
    timeStamp: Date;
    coin_symbol: string;
    market: string;
    gap: number;
    isSuccess: boolean;
    //deltails: string;
}