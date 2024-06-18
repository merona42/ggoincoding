//charts
import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/lib/sequelize';
import { QueryTypes } from 'sequelize';
import { Chart } from "@/model/Chart";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { _1, coinName, today } = req.query;
    try {
        // 데이터베이스 연결 확인
        await sequelize.authenticate();
        console.log('Chart Connection has been established successfully.');

        const results = await sequelize.query(
            `SELECT * FROM chart_logs WHERE DATE(CONVERT_TZ(timestamp, '+00:00', '+09:00')) = '${today}' AND coin_symbol = '${coinName}'`,
            { 
                type: QueryTypes.SELECT
            }
        );
        console.log("result");
        console.log(results);
        
        const charts: Chart[] = results.map((row: any) => ({
            Coin: {
                coinId: 1,
                symbol: row["coin_symbol"],
            },
            timeStamp: row["timestamp"],
            price_diff: row["gap"],
        }));

        // 변환된 결과 반환
        res.status(200).json(charts);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({ message: 'Unable to connect to the database' });
    }
}