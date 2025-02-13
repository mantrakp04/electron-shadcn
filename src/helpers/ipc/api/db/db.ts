import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import * as schema from './schema';
import Database from 'better-sqlite3';
import fs from 'fs';

fs.mkdirSync(path.join('data'), { recursive: true });
const sqlite = new Database(path.join('data', 'database.db'));

export const db = drizzle(sqlite, { schema });

export async function runMigrations() {
  await migrate(db, { migrationsFolder: path.join('drizzle') });
}

export const executeQuery = async (e: any, sqlstr: string, params: any[], method: string) => {
  try {
    const result: any = sqlite.prepare(sqlstr);
    const ret = result[method](...params);

    if (!ret) {
      return [];
    }

    if (Array.isArray(ret)) {
      return ret.map((row) => {
        return Object.keys(row).map((key) => row[key]);
      });
    } else {
      return Object.keys(ret).map((key) => ret[key]);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
