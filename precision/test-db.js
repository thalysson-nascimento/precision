const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({
  url: 'file:./prisma/dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Checking jobRole...");
  try {
    const roles = await prisma.jobRole.findMany();
    console.log("jobRole works! Count:", roles.length);
  } catch (err) {
    console.error("jobRole failed:", err);
  }

  console.log("Checking company...");
  try {
    const companies = await prisma.company.findMany();
    console.log("company works! Count:", companies.length);
  } catch (err) {
    console.error("company failed:", err);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
