import "dotenv/config";
import { defineConfig } from "prisma/config";
import path from "path";

const isSqliteCommand = process.argv.some((arg) => arg.includes("sqlite"));
const isPostgres =
  !isSqliteCommand &&
  (process.env.NODE_ENV === "production" ||
    process.env.DB_PROVIDER === "postgres" ||
    (process.env.DATABASE_URL &&
      !process.env.DATABASE_URL.startsWith('file:')));

const sqliteUrl = "file:" + path.resolve(__dirname, "prisma/dev.db");

export default defineConfig({
  schema: isPostgres
    ? "packages/database/schema.postgres.prisma"
    : "packages/database/schema.sqlite.prisma",
  migrations: {
    path: isPostgres
      ? "packages/database/migrations/postgres"
      : "packages/database/migrations/sqlite",
  },
  datasource: {
    url: isPostgres
      ? process.env.DATABASE_URL || "postgresql://localhost:5432"
      : sqliteUrl,
  },
});
