/* eslint-disable @typescript-eslint/no-require-imports */
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'prisma', 'dev.db');
console.log('Abrindo banco de dados:', dbPath);

const db = new Database(dbPath);

// Criar tabela Team
db.exec(`
  CREATE TABLE IF NOT EXISTS "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log('Tabela Team criada/verificada.');

// Criar índice único para Team.name
db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS "Team_name_key" ON "Team"("name")
`);

// Criar tabela Company
db.exec(`
  CREATE TABLE IF NOT EXISTS "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "number" TEXT,
    "contact" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log('Tabela Company criada/verificada.');

// Criar índice único para Company.name
db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS "Company_name_key" ON "Company"("name")
`);

// Criar tabela JobRole
db.exec(`
  CREATE TABLE IF NOT EXISTS "JobRole" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log('Tabela JobRole criada/verificada.');

// Criar índice único para JobRole.name
db.exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS "JobRole_name_key" ON "JobRole"("name")
`);

// Verificar tabelas existentes
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('\nTabelas no banco de dados:');
tables.forEach(t => console.log(' -', t.name));

db.close();
console.log('\nTabelas criadas com sucesso!');
