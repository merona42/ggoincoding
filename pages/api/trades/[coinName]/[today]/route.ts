import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/lib/sequelize';
import { QueryTypes } from 'sequelize';
import { Chart } from "@/model/Chart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { _1, coinName, today } = req.query;
    try {
        // 데이터베이스 연결 확인
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // 데이터 쿼리 실행
        const result = await sequelize.query(
            `SELECT * FROM trade_logs WHERE DATE(timestamp) = '${today}', coin_symbol = '${coinName}'`,
            { type: QueryTypes.SELECT }
        );

        // 쿼리 결과를 Trades 인터페이스에 맞게 변환
        const charts: Chart[] = result.map((row: any) => ({
            id: row["trade_id"],
            Coin: {
                coinId: 1,
                symbol: row["coin_symbol"],
            },
            timeStamp: row["timestamp"],
            type: row["details"],
            price: row["price"],
            isSuccess: row["is_success"]
        }));

        // 변환된 결과 반환
        res.status(200).json(charts);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({ message: 'Unable to connect to the database' });
    }
}