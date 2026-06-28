import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const dbUrl = process.env.DATABASE_URL || 'file:../../prisma/dev.db';
const adapter = new PrismaBetterSqlite3({
  url: dbUrl,
});

// Force clearing the global Prisma cache to pick up model changes without server restart
if (globalThis && (globalThis as any).prisma) {
  delete (globalThis as any).prisma;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
