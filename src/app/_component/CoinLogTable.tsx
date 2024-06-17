//src\app\_component\CoinLogTable.tsx
"use client";
import { getLogs } from '../_lib/getLogs';
import { useQuery } from '@tanstack/react-query';
import style from './coinLogTable.module.css';
import dayjs from "dayjs";
import cx from "classnames";
import { Coin as ICoin} from '@/model/Coin';
type Probs={
    today: Date,
    selectedShowCoin: ICoin | undefined,
    setSelectedShowCoin:(value: ICoin | undefined) => void
}
export default function CoinLogTable({today,selectedShowCoin, setSelectedShowCoin} : Probs) {
    const {data: logs}= useQuery({
        queryKey:['logs',today.toDateString()],
        queryFn:getLogs
    })
    const trOnClick=(symbol : string)=>{
        setSelectedShowCoin(symbol);
    }
    return (
        <table className={style.container}>
            <thead className={style.tableHeader}>
                <tr>
                    <th>ID</th>
                    <th>Timestamp</th>
                    <th>Coin Symbol</th>
                    <th>Market</th>
                    <th>Gap</th>
                    <th>성공 여부</th>
                </tr>
            </thead>
            <tbody className={style.tableBody}>
                {logs?.map(log => (
                    <tr key={log.id}
                    onClick={()=>trOnClick(log.coin_symbol)} className={cx({[style.success]: log.isSuccess,[style.fail]:!log.isSuccess})} >
                        <td>{log.id}</td>
                        <td>{dayjs(log.timeStamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{log.coin_symbol}</td>
                        <td>{log.market}</td>
                        <td>{log.gap}</td>
                        <td>{log.isSuccess ? '성공' : '실패'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}