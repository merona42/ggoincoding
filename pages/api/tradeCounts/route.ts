//tradeCount route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/lib/sequelize';
import { QueryTypes } from 'sequelize';
import { TradeCount } from '@/model/TradeCount';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { _1, coinName, today } = req.query;
    try {
        // 데이터베이스 연결 확인
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // 데이터 쿼리 실행
        const result = await sequelize.query(
            `SELECT is_success FROM trade_logs WHERE DATE(CONVERT_TZ(timestamp, '+00:00', '+09:00')) = '${today}'`,
            { type: QueryTypes.SELECT }
        );

        // 쿼리 결과를 TradeCount 인터페이스에 맞게 변환
        const tradeCount: TradeCount = {};

        for (const row of result) {
            const date = row.date; // Replace with the actual date field
            if (!tradeCount[date]) {
                tradeCount[date] = { success: 0, failure: 0 };
            }

            if (row.is_success) {
                tradeCount[date].success++;
            } else {
                tradeCount[date].failure++;
            }
        }

        // 변환된 결과 반환
        res.status(200).json(tradeCount);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({ message: 'Unable to connect to the database' });
    }
}