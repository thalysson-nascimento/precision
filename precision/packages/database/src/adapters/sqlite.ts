import { PrismaClient } from '../generated/sqlite';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { getSqliteDbPath } from '../utils/path';
import path from 'path';
import fs from 'fs';

const dbPath = getSqliteDbPath();

// Ensure directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// In Prisma 7, PrismaBetterSqlite3 manages the database instantiation internally
const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});

export const prismaSqlite = new PrismaClient({ adapter });
export default prismaSqlite;
export type { PrismaClient as PrismaClientSqlite } from '../generated/sqlite';
