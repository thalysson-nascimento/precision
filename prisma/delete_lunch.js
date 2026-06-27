/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  // Buscar o funcionário padrão
  const employee = await prisma.employee.findFirst({
    where: { email: 'thalysson@example.com' },
  });

  if (!employee) {
    console.error('Funcionário padrão não encontrado!');
    return;
  }

  // 1. Deletar os registros de Saída Almoço (LUNCH_OUT), Retorno Almoço (LUNCH_IN) e Saída Final (OUT)
  await prisma.timeRecord.deleteMany({
    where: {
      employeeId: employee.id,
      date: todayStr,
      type: {
        in: ['LUNCH_OUT', 'LUNCH_IN', 'OUT'],
      },
    },
  });

  // 2. Garantir que a Entrada (IN) esteja criada e confirmada
  await prisma.timeRecord.upsert({
    where: {
      employeeId_date_type: {
        employeeId: employee.id,
        date: todayStr,
        type: 'IN',
      },
    },
    update: {
      time: '08:00',
      confirmed: true,
    },
    create: {
      employeeId: employee.id,
      date: todayStr,
      type: 'IN',
      time: '08:00',
      confirmed: true,
    },
  });

  console.log('Banco de dados configurado para o teste!');
  console.log('Entrada confirmada às 08:00. Saída Almoço e Retorno Almoço removidos.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
