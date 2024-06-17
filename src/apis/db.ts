import mysql from 'mysql2/promise';

export async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arbitrage_bot'
  });

  return connection;
}