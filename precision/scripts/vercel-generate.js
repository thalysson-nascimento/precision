const { execSync } = require('child_process');

if (process.env.VERCEL) {
  console.log('[Vercel Build Hook] Vercel environment detected. Running Prisma client generation...');
  try {
    // Generate SQLite client first to ensure the folder and types exist for compiling
    console.log('[Vercel Build Hook] Generating SQLite Client...');
    execSync('npx prisma generate --schema=../../packages/database/schema.sqlite.prisma', { stdio: 'inherit' });

    // Generate PostgreSQL client
    console.log('[Vercel Build Hook] Generating PostgreSQL Client...');
    execSync('npx prisma generate --schema=../../packages/database/schema.postgres.prisma', { stdio: 'inherit' });

    console.log('[Vercel Build Hook] All Prisma clients successfully generated.');
  } catch (error) {
    console.error('[Vercel Build Hook] Failed to generate Prisma clients:', error);
    process.exit(1);
  }
} else {
  console.log('[Vercel Build Hook] Local build detected. Skipping inline Prisma generation (managed by Turborepo dependency graph).');
}
