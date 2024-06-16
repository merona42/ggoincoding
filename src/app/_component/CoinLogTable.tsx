//src\app\_component\CoinLogTable.tsx
import React, { useEffect, useState } from 'react';
import { Logs } from '../../model/Logs';

export function CoinLogTable() {
  const [logs, setLogs] = useState<Logs[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/logs');
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    };

    fetchLogs();
  }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Timestamp</th>
                    <th>Coin Symbol</th>
                    <th>Market</th>
                    <th>Gap</th>
                </tr>
            </thead>
            <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.timestamp.toString()}</td>
                        <td>{log.coin_symbol}</td>
                        <td>{log.market}</td>
                        <td>{log.gap}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}