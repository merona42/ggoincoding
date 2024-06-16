//src\app\_component\CoinLogTable.tsx
"use client";
import { getLogs } from '../_lib/getLogs';
import { useQuery } from '@tanstack/react-query';
import style from './coinLogTable.module.css';
import dayjs from "dayjs";
import cx from "classnames";
type Probs={
    today: Date,
}
export default function CoinLogTable({today} : Probs) {
    const {data: logs}= useQuery({
        queryKey:['logs',today.toDateString()],
        queryFn:getLogs
    })

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
                    <tr key={log.id} className={cx({[style.success]: log.isSuccess,[style.fail]:!log.isSuccess})} >
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