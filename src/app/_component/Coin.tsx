"use client"
import { Coin as ICoin } from "@/model/Coin"
import { useContext } from "react"
import { SelectedCoinContext } from "./CoinProvider"
import style from "./coin.module.css"
import cx from 'classnames'
type Probs = {
    coin: ICoin
}

export default function Coin({coin}:Probs){
    
    const{selectedCoin,setSelectedCoin} = useContext(SelectedCoinContext);
    const onClick=()=>{
        setSelectedCoin(coin);
    }
    return (
        <div onClick={onClick} 
        className={cx(style.coinButton, {
            [style.selectedCoin]: selectedCoin && selectedCoin === coin
        })}>
            <div className={style.coinImage}>
                <img src={coin.image} alt={coin.name}/>
            </div>
            <div className={style.coinName}>
                {coin.name}
            </div>
            
        </div>
    )
}