"use client";
import React, { useState, useContext, createContext, EventHandler } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { SelectedDateContext } from './DateProvider';
import { ko } from 'date-fns/locale';
import style from './calender.module.css'
import { SelectedCoinContext } from './CoinProvider';
import { useQuery } from '@tanstack/react-query';
import { getTradeCounts } from '../_lib/getTradeCounts';
import dayjs from "dayjs";
type Probs={
    isShouldShow:boolean,
    setIsShouldShow:(value: boolean) => void
}
export default function Calender({isShouldShow, setIsShouldShow}:Probs ){
    const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
    const {selectedCoin,setSelectedCoin} = useContext(SelectedCoinContext);
    const handleDayClick  = (date: Date) => {
        setSelectedDate(date);
        setSelectedCoin(undefined);
        setIsShouldShow(false);
    }
    const {data : tradeCountData} = useQuery({
      queryKey:['tradeCounts'],
      queryFn:getTradeCounts,
    })
    const isDisabled = (date : Date) => {
      const dateString =dayjs(date).format('YYYY-MM-DD');
      const trades = tradeCountData ? tradeCountData[dateString] : undefined;
      if(trades?.success===0 && trades?.failure===0)return true;
      return !trades;
    };
      
    function CustomDay(props: { date: Date }) {
      const dateString = dayjs(props.date).format('YYYY-MM-DD');
      const trades = tradeCountData ? 
      (tradeCountData[dateString] ? tradeCountData[dateString] : { success: 0, failure: 0 }) : { success: 0, failure: 0 };
    
      return (
        <button onClick={()=>handleDayClick(props.date)} disabled={isDisabled(props.date)}
        className={style.dayButton}>
            <div className={style.dayContent}>
                <div>{props.date.getDate()}</div>
                <div style={{ fontSize: '0.7em' }}>
                    <div className={style.success}>
                        {trades.success > 0 ? `성공: ${trades.success}` : ''}
                    </div>
                    <div className={style.fail}>
                         {trades.failure > 0 ? `실패: ${trades.failure}` : ''}
                    </div>

                    
                </div>
            </div>
         
        </button>
      );
    }
    
    return (
      <DayPicker
        locale={ko}
        selected={selectedDate}
        modifiers={{ disabled: isDisabled }}
        components={{
          Day: CustomDay,
        }}
        className={style.calender}
      />
    );
}