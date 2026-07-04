import { PrismaClient } from '../generated/postgres/index';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const dbUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

export const prismaPostgres = new PrismaClient({ adapter });
export default prismaPostgres;
export type { PrismaClient as PrismaClientPostgres } from '../generated/postgres';
