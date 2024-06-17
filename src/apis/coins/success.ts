// pages\api\coins\success\[today].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createConnection } from '../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { today } = req.query;

  const connection = await createConnection();

  const [rows] = await connection.execute(`SELECT * FROM coins WHERE DATE(timestamp) = ?`, [today]);
  res.status(200).json(rows);
}