import { Coin } from "./Coin";

export interface Chart{
    Coin:Coin,
    timeStamp:Date,
    price_diff:number
}