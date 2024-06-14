"use client";
import { useContext, useState } from "react";
import ChartList from "./ChartList"
import CoinList from "./CoinList"
import style from "./home.module.css"
import { SelectedCoinContext } from "./CoinProvider";
import Calender from "./Calender";
import { SelectedDateContext } from "./DateProvider";
import cx from "classnames";
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일을 임포트

dayjs.locale('ko'); // 한국어 로케일을 설정
export default function Home() {
    const{selectedCoin,setSelectedCoin} = useContext(SelectedCoinContext);
    const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
    const [isShouldShow, setIsShouldShow] = useState(false);
    const onClickCalender=()=>{
        setIsShouldShow(!isShouldShow);
    }
    return (
        <div className={style.container}>
            <div className={style.containerHeader}>
                <div>
                    꼬인코딩
                </div>
            </div>
            <div className={style.homeFixed}>
                <div className={style.header}>
                    <hr/>
                    <button onClick={onClickCalender}>{dayjs(selectedDate).format('YYYY년 MM월 DD일 dddd')}</button>
                        
                </div>
            </div>
            <div className={style.showDiv}>
                
                <div className={style.content}>
                    <div className={style.coinLeft}>
                        <CoinList today={selectedDate}/>
                    </div>
                    <div className={cx(style.graphRight, {[style.center]: !selectedCoin})}>      
                        {selectedCoin ?  <ChartList coin={selectedCoin} today={selectedDate} />:<div className={style.centerDiv} style={{color:'gray'}}>선택된 코인이 없습니다.</div>}
                    </div>
                </div>
                {isShouldShow && <Calender isShouldShow = {isShouldShow} setIsShouldShow = {setIsShouldShow}
                    />}
            </div>
            
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div>
            <div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div><div>
                ㄴ
            </div>

        </div>
    )
}
