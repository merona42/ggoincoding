import { Coin } from "./Coin";

export interface Trade{
    Coin:Coin,
    type: string,
    timeStamp:Date,
    price: number,
    isSuccess: boolean
}