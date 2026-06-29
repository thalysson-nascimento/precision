import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

let dbUrl = process.env.DATABASE_URL || 'file:../../prisma/dev.db';

// Resolve relative file paths to ensure consistent database access across package working directories
if (dbUrl.startsWith('file:')) {
  const filePath = dbUrl.replace('file:', '');
  if (!path.isAbsolute(filePath)) {
    // If it points to ./prisma/dev.db (set in monorepo root .env), resolve it relative to monorepo root
    if (filePath.startsWith('./prisma/') || filePath.startsWith('prisma/')) {
      // From apps/mobile, the prisma directory is at ../../prisma
      dbUrl = `file:${path.resolve(process.cwd(), '../../prisma/dev.db')}`;
    } else {
      dbUrl = `file:${path.resolve(process.cwd(), filePath)}`;
    }
  }
}

const adapter = new PrismaBetterSqlite3({
  url: dbUrl,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
