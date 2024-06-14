import { Coin } from "./Coin";

export interface Trade{
    Coin:Coin,
    type:'buy'|'sell'|'borrow',
    timeStamp:Date,
    price: number,
    market?: string,
}