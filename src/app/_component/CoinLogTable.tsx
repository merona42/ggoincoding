//src\app\_component\CoinLogTable.tsx
"use client";
import { getLogs } from '../_lib/getLogs';
import { useQuery } from '@tanstack/react-query';
import style from './coinLogTable.module.css';
import dayjs from "dayjs";
import cx from "classnames";
type Probs = {
    today: Date,
}
export default function CoinLogTable({ today }: Probs) {
    const { data: logs } = useQuery({
        queryKey: ['logs', today.toDateString()],
        queryFn: getLogs
    })

    return (
        <table className={style.container}>
            <thead className={style.tableHeader}>
                <tr>
                    <th>Symbol</th>
                    <th>Timestamp</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Is Success</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody className={style.tableBody}>
                {logs?.map(log => (
                    <tr key={log.tradeId}>
                        <td>{log.Coin.symbol}</td>
                        <td>{dayjs(log.timeStamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                        <td>{log.type}</td>
                        <td>{log.price}</td>
                        <td>{log.isSuccess ? 'Success' : 'Fail'}</td>
                        <td className={cx({ [style.success]: log.type === 'buy', 
                                            [style.fail]: log.type === 'sell' })}>{log.type}</td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
}