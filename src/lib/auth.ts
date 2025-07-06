import path from 'path';
import Database from 'better-sqlite3';
import { betterAuth } from 'better-auth';

export const getAuth = () => {
  const dbPath = path.resolve(process.cwd(), 'src/database/sqlite.db');
  const db = new Database(dbPath);
  return betterAuth({ database: db });
};