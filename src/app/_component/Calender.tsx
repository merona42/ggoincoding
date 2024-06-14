"use client";
import React, { useState, useContext, createContext, EventHandler } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { SelectedDateContext } from './DateProvider';
import { ko } from 'date-fns/locale';
import style from './calender.module.css'
import { SelectedCoinContext } from './CoinProvider';

interface TradeData {
    [date: string]: { success: number; failure: number };
  }
const tradeData : TradeData = {
    '2023-12-01': { success: 5, failure: 2 },
    '2023-12-02': { success: 0, failure: 3 },
    '2023-12-03': { success: 3, failure: 0 },
  };



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
    const isDisabled = (date : Date) => {
        const dateString = date.toISOString().split('T')[0];
        const trades = tradeData[dateString];
        return !trades;
      };
      
    function CustomDay(props: { date: Date }) {
      const dateString = props.date.toISOString().split('T')[0];
      const trades = tradeData[dateString] || { success: 0, failure: 0 };
    
      return (
        <button onClick={()=>handleDayClick(props.date)} disabled={isDisabled(props.date)}
        className={style.dayButton}>
            <div className={style.dayContent}>
                <div>{props.date.getDate()}</div>
                <div style={{ fontSize: '0.75em' }}>
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
    
   
    console.log(selectedDate);
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