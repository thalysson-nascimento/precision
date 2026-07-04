let prisma: any;

const isPostgres =
  process.env.NODE_ENV === 'production' ||
  (process.env.DATABASE_URL &&
    (process.env.DATABASE_URL.startsWith('postgres') ||
      process.env.DATABASE_URL.startsWith('postgresql')));

if (isPostgres) {
  const { prismaPostgres } = require('./adapters/postgres');
  prisma = prismaPostgres;
} else {
  try {
    const { prismaSqlite } = require('./adapters/sqlite');
    prisma = prismaSqlite;
  } catch (err) {
    console.warn('Failed to load SQLite adapter in dev mode:', err);
  }
}

// Global caching for Next.js hot reload in development
const globalForPrisma = globalThis as unknown as { prisma: any };

if (process.env.NODE_ENV !== 'production') {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma;
  }
  prisma = globalForPrisma.prisma;
}

const exportedPrisma = prisma as import('./generated/sqlite').PrismaClient;
export { exportedPrisma as prisma };
export * from './generated/sqlite';
export type { PrismaClient } from './generated/sqlite';
export type PrismaClientSqlite = import('./generated/sqlite').PrismaClient;
export type PrismaClientPostgres = import('./generated/postgres').PrismaClient;
export type PrismaClientType = PrismaClientSqlite | PrismaClientPostgres;
