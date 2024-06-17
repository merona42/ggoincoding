import { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '@/lib/sequelize';
import { QueryTypes } from 'sequelize';
import { Chart } from "@/model/Chart";
import { Coin as ICoin } from '@/model/Coin';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { _1, today } = req.query;
    try {
        // 데이터베이스 연결 확인
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // 데이터 쿼리 실행
        const result = await sequelize.query(
            `SELECT coin_symbol FROM successed_coins`,
            { type: QueryTypes.SELECT }
        );

        // 쿼리 결과를 Coins 인터페이스에 맞게 변환
        const coins: ICoin[] = result.map((row: any) => ({
            coinId: 1,
            symbol: row["coin_symbol"]
        }));

        // 변환된 결과 반환
        res.status(200).json(coins);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json({ message: 'Unable to connect to the database' });
    }
}