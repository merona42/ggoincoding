import { NextRequest, NextResponse } from 'next/server';
import sequelize from '@/lib/sequelize';
import { QueryTypes } from 'sequelize';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
      // 데이터베이스 연결 확인
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      // 데이터 쿼리 실행
      const result = await sequelize.query(
          `SELECT * FROM coins_success`,
          { type: QueryTypes.SELECT }
      );

      // 쿼리 결과 반환
      res.status(200).json(result);
  } catch (error) {
      console.error('Unable to connect to the database:', error);
      res.status(500).json({ message: 'Unable to connect to the database' });
  }
}