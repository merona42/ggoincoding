"use client"
import { Coin as ICoin } from "@/model/Coin"
import { useContext } from "react"
import { SelectedCoinContext } from "./CoinProvider"
import style from "./coin.module.css"
import cx from 'classnames'
import { coinMappingList } from "../_datas/CoinMappingList" 
type Probs = {
    coin: string,
}

export default function Coin({coin}:Probs){
    
    const{selectedCoin,setSelectedCoin} = useContext(SelectedCoinContext);
    const onClick=()=>{
        setSelectedCoin(coin);
    }
   

    const nowCoin = coinMappingList?.find((c) => c.symbol.toLowerCase() === coin.toLowerCase());
    
    return (
        <div onClick={onClick} 
        className={cx(style.coinButton, {
            [style.selectedCoin]: selectedCoin && selectedCoin.toLowerCase() === coin.toLowerCase()
        })}>
            <div className={style.coinImage}>
                <img src={nowCoin?.coinImage} alt={nowCoin?.coinKoreanName}/>
            </div>
            <div className={style.coinName}>
                {nowCoin? nowCoin.coinKoreanName: coin}
            </div>
            
        </div>
    )
}