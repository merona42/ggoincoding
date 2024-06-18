//src\app\_component\CoinLogTable.tsx
"use client";
import { getLogs } from '../_lib/getLogs';
import { useQuery } from '@tanstack/react-query';
import style from './coinLogTable.module.css';
import dayjs from "dayjs";
import cx from "classnames";
import { useContext, useState } from 'react';
import { SelectedCoinContext } from './CoinProvider';
import { SelectedBarContext } from './SelectedBarProvider';
import { Trade as ITrade } from '@/model/Trade';
type Probs={
    today: Date,
    scrollToShowDiv:()=>void,
}
export default function CoinLogTable({today,scrollToShowDiv} : Probs) {
    const {selectedCoin,setSelectedCoin} = useContext(SelectedCoinContext);
    const {selectedBar,setSelectedBar} = useContext(SelectedBarContext);
    const [selectedTr,setSelectedTr] = useState(-1);
    const {data: logs}= useQuery({
        queryKey:['logs',dayjs(today).format('YYYY-MM-DD')],
        queryFn:getLogs
    })
    const trOnClick=(log :ITrade )=>{
        setSelectedCoin(log.Coin.symbol);
        setSelectedBar(log);
        scrollToShowDiv();
        setSelectedTr(log.tradeId);
    }
    return (
        <table className={style.container}>
            <thead className={style.tableHeader}>
                <tr>
                    <th>Symbol</th>
                    <th>Timestamp</th>
                    <th>Type</th>
                    <th>Price</th>

                </tr>
            </thead>
            <tbody className={style.tableBody}>
                {logs?.map(log => (
                    <tr key={log.tradeId}
                    onClick={()=>trOnClick(log)} className={cx(style.tableTr,{[style.success]: log.isSuccess,[style.fail]:!log.isSuccess,
                        [style.isSelectedTr]:selectedTr===log.tradeId
                    }
                    )} >
                        <td>{log.Coin.symbol}</td>
                        <td>{dayjs(log.timeStamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{log.type}</td>
                        <td>{log.type === '판매 성공'? log.price : '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}