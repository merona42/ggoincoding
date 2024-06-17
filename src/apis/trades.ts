import { NextApiRequest, NextApiResponse } from 'next';
import { createConnection } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { coinName, marketType, today } = req.query;

  const connection = await createConnection();

  // name을 따로 저장 안해서 coin_symbol로 해놨긴 한데, name 저장은 수정해야함.. 혼자 못해..ㅎ
  const [rows] = await connection.execute(
    'SELECT * FROM gap_detection_logs WHERE coin_symbol = ? AND market = ? AND timestamp = ?',
    [coinName, marketType, today]
  );

  res.status(200).json(rows);
}