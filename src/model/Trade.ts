import { Coin as ICoin } from "./Coin";

export interface Trade{
    tradeId: number;
    Coin:ICoin;
    timeStamp: Date;
    type: string;
    price: number;
    isSuccess: boolean;    
}