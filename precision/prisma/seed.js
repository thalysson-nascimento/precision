/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({
  url: 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Limpar dados antigos
  await prisma.timeRecord.deleteMany();
  await prisma.employee.deleteMany();

  // Criar o funcionário padrão (Thalysson Nascimento)
  const employee = await prisma.employee.create({
    data: {
      name: 'Thalysson Nascimento',
      email: 'thalysson@example.com',
      role: 'Desenvolvedor Senior',
      workStart: '08:00',
      lunchStart: '12:00',
      lunchEnd: '13:00',
      workEnd: '18:00',
    },
  });

  // Gerar registros dinâmicos de Janeiro até Junho/2026
  const records = [];
  const startYear = 2026;
  const startMonth = 0; // Janeiro
  const endMonth = 5;   // Junho
  const todayStr = '2026-06-26';

  for (let m = startMonth; m <= endMonth; m++) {
    // Quantidade de dias no mês
    const daysInMonth = new Date(startYear, m + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = String(day).padStart(2, '0');
      const monthStr = String(m + 1).padStart(2, '0');
      const dateStr = `${startYear}-${monthStr}-${dayStr}`;

      // Pular hoje (será tratado de forma especial) e dias futuros
      if (dateStr > todayStr) {
        continue;
      }

      const d = new Date(startYear, m, day);
      const dayOfWeek = d.getDay(); // 0 = Dom, 6 = Sab
      
      // Pular finais de semana
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }

      if (dateStr === todayStr) {
        // Hoje inicia com apenas Entrada confirmada
        records.push({ date: dateStr, type: 'IN', time: '08:00', confirmed: true });
        continue;
      }

      // Dias da semana anteriores
      // Criamos alguns dias incompletos (marcações pendentes) e o resto completo
      // Marcamos os dias divisíveis por 7 ou 11 como incompletos
      const isIncomplete = day % 7 === 0 || day % 11 === 0;

      if (isIncomplete) {
        // Incompleto (apenas Entrada e Saída Almoço registradas)
        const minIn = Math.floor(Math.random() * 8); // 08:00 a 08:07
        const timeIn = `08:${String(minIn).padStart(2, '0')}`;

        const minLunchOut = Math.floor(Math.random() * 8); // 12:00 a 12:07
        const timeLunchOut = `12:${String(minLunchOut).padStart(2, '0')}`;

        records.push({ date: dateStr, type: 'IN', time: timeIn, confirmed: true });
        records.push({ date: dateStr, type: 'LUNCH_OUT', time: timeLunchOut, confirmed: true });
      } else {
        // Completo (Entrada, Saída Almoço, Retorno, Saída Final)
        const offsetIn = Math.floor(Math.random() * 10) - 5; // -5 a +4 min
        const hourIn = offsetIn < 0 ? 7 : 8;
        const minIn = offsetIn < 0 ? 60 + offsetIn : offsetIn;
        const timeIn = `${String(hourIn).padStart(2, '0')}:${String(minIn).padStart(2, '0')}`;

        const minLunchOut = Math.floor(Math.random() * 8); // 12:00 a 12:07
        const timeLunchOut = `12:${String(minLunchOut).padStart(2, '0')}`;

        const minLunchIn = Math.floor(Math.random() * 8); // 13:00 a 13:07
        const timeLunchIn = `13:${String(minLunchIn).padStart(2, '0')}`;

        const offsetOut = Math.floor(Math.random() * 10) - 5; // -5 a +4 min
        const hourOut = offsetOut < 0 ? 17 : 18;
        const minOut = offsetOut < 0 ? 60 + offsetOut : offsetOut;
        const timeOut = `${String(hourOut).padStart(2, '0')}:${String(minOut).padStart(2, '0')}`;

        records.push({ date: dateStr, type: 'IN', time: timeIn, confirmed: true });
        records.push({ date: dateStr, type: 'LUNCH_OUT', time: timeLunchOut, confirmed: true });
        records.push({ date: dateStr, type: 'LUNCH_IN', time: timeLunchIn, confirmed: true });
        records.push({ date: dateStr, type: 'OUT', time: timeOut, confirmed: true });
      }
    }
  }

  // Adicionar o employeeId a cada registro
  const recordsWithEmployee = records.map(r => ({
    ...r,
    employeeId: employee.id,
  }));

  await prisma.timeRecord.createMany({
    data: recordsWithEmployee,
  });

  console.log('Banco de dados semeado com sucesso com dados de testes!');
  console.log('Funcionário criado:', employee);
  console.log(`${records.length} registros de histórico inseridos de Janeiro a Junho.`);
}

main()
  .catch((e) => {
    console.error('Erro ao semear o banco:', e);
    process.exit(1);
  });
