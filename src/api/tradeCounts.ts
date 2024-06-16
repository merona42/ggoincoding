import { NextApiRequest, NextApiResponse } from 'next';
import { createConnection } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await createConnection();

  // gap 감지 된 로그들의 개수 가져오는거 맞지..?
  const [rows] = await connection.execute('SELECT COUNT(*) FROM gap_detection_logs');
  res.status(200).json(rows);
}