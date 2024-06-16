//pages\api\logs.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createConnection } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await createConnection();

  const [rows] = await connection.execute('SELECT * FROM gap_detection_logs');
  res.status(200).json(rows);
}