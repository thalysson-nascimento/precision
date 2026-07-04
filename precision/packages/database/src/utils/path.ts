import path from 'path';
import fs from 'fs';

export function getSqliteDbPath(): string {
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.startsWith('file:')) {
    const filePath = dbUrl.replace('file:', '');
    if (path.isAbsolute(filePath)) {
      return filePath;
    }
    return path.resolve(process.cwd(), filePath);
  }

  // Traverse up to find the monorepo root containing prisma directory
  let currentDir = process.cwd();
  for (let i = 0; i < 5; i++) {
    const candidateDir = path.join(currentDir, 'prisma');
    if (fs.existsSync(candidateDir) && fs.statSync(candidateDir).isDirectory()) {
      return path.join(candidateDir, 'dev.db');
    }
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }

  // Fallback
  return path.resolve(process.cwd(), 'prisma/dev.db');
}
