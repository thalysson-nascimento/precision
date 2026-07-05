const { execSync } = require('child_process');

if (process.env.VERCEL) {
  console.log('[Vercel Build Hook] Vercel environment detected. Running Prisma client generation...');
  try {
    execSync('npx prisma generate --schema=../../packages/database/schema.postgres.prisma', { stdio: 'inherit' });
    console.log('[Vercel Build Hook] Prisma client successfully generated.');
  } catch (error) {
    console.error('[Vercel Build Hook] Failed to generate Prisma client:', error);
    process.exit(1);
  }
} else {
  console.log('[Vercel Build Hook] Local build detected. Skipping inline Prisma generation (managed by Turborepo dependency graph).');
}
