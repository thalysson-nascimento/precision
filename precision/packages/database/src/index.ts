import prismaPostgres from './adapters/postgres';

let _prisma: any;

const isPostgres =
  process.env.NODE_ENV === 'production' ||
  (process.env.DATABASE_URL &&
    (process.env.DATABASE_URL.startsWith('postgres') ||
      process.env.DATABASE_URL.startsWith('postgresql')));

const prisma = new Proxy({} as any, {
  get(target, prop) {
    if (!_prisma) {
      if (isPostgres) {
        _prisma = prismaPostgres;
        console.log('[Prisma Debug] Loaded Postgres adapter statically, client exists:', !!_prisma);
      } else {
        try {
          _prisma = require('./adapters/sqlite').default;
        } catch (err) {
          console.warn('[Prisma Debug] Failed to load SQLite adapter in dev mode:', err);
        }
      }

      // Cache for hot-reload in development mode
      if (process.env.NODE_ENV !== 'production') {
        const globalForPrisma = globalThis as unknown as { prisma: any };
        if (!globalForPrisma.prisma) {
          globalForPrisma.prisma = _prisma;
        }
        _prisma = globalForPrisma.prisma;
      }
    }

    // Proxy other operations to the actual PrismaClient instance
    if (prop === 'then') {
      return undefined;
    }
    return Reflect.get(_prisma, prop);
  }
}) as unknown as import('./generated/sqlite/index').PrismaClient;

export { prisma };
export * from './generated/sqlite/index';
export type { PrismaClient } from './generated/sqlite/index';
export type PrismaClientSqlite = import('./generated/sqlite/index').PrismaClient;
export type PrismaClientPostgres = import('./generated/postgres/index').PrismaClient;
export type PrismaClientType = PrismaClientSqlite | PrismaClientPostgres;
