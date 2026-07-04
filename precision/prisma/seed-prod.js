/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('../packages/database/src/generated/postgres/index');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Erro: A variável de ambiente DATABASE_URL não está configurada.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Iniciando o seed de produção no PostgreSQL...");

  const adminEmail = "thalyssonwg.nascimento@gmail.com";
  
  const superAdmin = await prisma.employee.upsert({
    where: { email: adminEmail },
    update: {
      name: "Thalysson Nascimento",
      password: "$%Thalysson@1987",
      userRole: "SUPERADMIN",
      role: "Diretor Geral",
      isPasswordTemp: false,
      isActive: true,
    },
    create: {
      name: "Thalysson Nascimento",
      email: adminEmail,
      password: "$%Thalysson@1987",
      userRole: "SUPERADMIN",
      role: "Diretor Geral",
      isPasswordTemp: false,
      isActive: true,
    },
  });

  console.log("Superadmin de produção criado/atualizado com sucesso:", superAdmin.email);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Erro ao rodar seed de produção:", e);
  process.exit(1);
});
