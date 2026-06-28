/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

require('dotenv').config();

const dbUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
const adapter = new PrismaBetterSqlite3({
  url: dbUrl,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Limpar dados antigos
  await prisma.timeAdjustment.deleteMany();
  await prisma.timeRecord.deleteMany();
  await prisma.employee.deleteMany();

  // Criar o funcionário padrão (Thalysson Nascimento)
  const mainEmployee = await prisma.employee.create({
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

  // Criar outros funcionários para simular a equipe
  const employees = [
    { name: 'Carlos Souza', email: 'carlos@example.com', role: 'Analista de Operações' },
    { name: 'Ana Lima', email: 'ana@example.com', role: 'Executiva de Vendas' },
    { name: 'Fernando Costa', email: 'fernando@example.com', role: 'Suporte de TI' },
    { name: 'Mariana Silva', email: 'mariana@example.com', role: 'Analista de RH' },
    { name: 'João Pedro', email: 'joao@example.com', role: 'Analista Financeiro' },
    { name: 'Roberto Mendes', email: 'roberto@example.com', role: 'Assistente Operacional' },
    { name: 'Luciana Tavares', email: 'luciana@example.com', role: 'Coordenadora de RH' },
    { name: 'Paulo Roberto', email: 'paulo@example.com', role: 'Administrador de Redes' },
  ];

  const dbEmployees = {};
  for (const emp of employees) {
    const created = await prisma.employee.create({
      data: {
        name: emp.name,
        email: emp.email,
        role: emp.role,
        workStart: '08:00',
        lunchStart: '12:00',
        lunchEnd: '13:00',
        workEnd: '18:00',
      },
    });
    dbEmployees[emp.email] = created;
  }

  // 1. Gerar registros históricos para o funcionário padrão (Thalysson) de Janeiro a Junho/2026
  const mainRecords = [];
  const startYear = 2026;
  const startMonth = 0; // Janeiro
  const endMonth = 5;   // Junho
  const todayStr = '2026-06-26';

  for (let m = startMonth; m <= endMonth; m++) {
    const daysInMonth = new Date(startYear, m + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = String(day).padStart(2, '0');
      const monthStr = String(m + 1).padStart(2, '0');
      const dateStr = `${startYear}-${monthStr}-${dayStr}`;

      if (dateStr > todayStr) {
        continue;
      }

      const d = new Date(startYear, m, day);
      const dayOfWeek = d.getDay(); // 0 = Dom, 6 = Sab
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        continue;
      }

      if (dateStr === todayStr) {
        mainRecords.push({ date: dateStr, type: 'IN', time: '08:00', confirmed: true, employeeId: mainEmployee.id });
        continue;
      }

      const isIncomplete = day % 7 === 0 || day % 11 === 0;

      if (isIncomplete) {
        mainRecords.push({ date: dateStr, type: 'IN', time: '08:05', confirmed: true, employeeId: mainEmployee.id });
        mainRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:02', confirmed: true, employeeId: mainEmployee.id });
      } else {
        const offsetIn = Math.floor(Math.random() * 10) - 5; // -5 a +4 min
        const hourIn = offsetIn < 0 ? 7 : 8;
        const minIn = offsetIn < 0 ? 60 + offsetIn : offsetIn;
        const timeIn = `${String(hourIn).padStart(2, '0')}:${String(minIn).padStart(2, '0')}`;

        mainRecords.push({ date: dateStr, type: 'IN', time: timeIn, confirmed: true, employeeId: mainEmployee.id });
        mainRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:05', confirmed: true, employeeId: mainEmployee.id });
        mainRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:03', confirmed: true, employeeId: mainEmployee.id });

        const offsetOut = Math.floor(Math.random() * 10) - 5;
        const hourOut = offsetOut < 0 ? 17 : 18;
        const minOut = offsetOut < 0 ? 60 + offsetOut : offsetOut;
        const timeOut = `${String(hourOut).padStart(2, '0')}:${String(minOut).padStart(2, '0')}`;
        mainRecords.push({ date: dateStr, type: 'OUT', time: timeOut, confirmed: true, employeeId: mainEmployee.id });
      }
    }
  }

  await prisma.timeRecord.createMany({
    data: mainRecords,
  });

  // 2. Gerar registros de ponto da semana atual (Segunda 2026-06-22 a Sexta 2026-06-26) para os outros funcionários
  const teamRecords = [];
  const weekDays = ['2026-06-22', '2026-06-23', '2026-06-24', '2026-06-25', '2026-06-26'];

  weekDays.forEach(dateStr => {
    // Carlos Souza: presente todos os dias
    const cs = dbEmployees['carlos@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '08:02', confirmed: true, employeeId: cs.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: cs.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: cs.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: cs.id });

    // Ana Lima: presente todos os dias
    const al = dbEmployees['ana@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '07:58', confirmed: true, employeeId: al.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:15', confirmed: true, employeeId: al.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:15', confirmed: true, employeeId: al.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:05', confirmed: true, employeeId: al.id });

    // Fernando Costa: presente todos os dias, atraso na Sexta 26/06
    const fc = dbEmployees['fernando@example.com'];
    const fcInTime = dateStr === '2026-06-26' ? '09:30' : '08:05';
    teamRecords.push({ date: dateStr, type: 'IN', time: fcInTime, confirmed: true, employeeId: fc.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: fc.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: fc.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: fc.id });

    // Mariana Silva: presente todos os dias
    const ms = dbEmployees['mariana@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '07:55', confirmed: true, employeeId: ms.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: ms.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: ms.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: ms.id });

    // João Pedro: presente todos os dias
    const jp = dbEmployees['joao@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '07:50', confirmed: true, employeeId: jp.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: jp.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: jp.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: jp.id });

    // Roberto Mendes: faltou bater a saída na Terça 23/06
    const rm = dbEmployees['roberto@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '08:00', confirmed: true, employeeId: rm.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: rm.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: rm.id });
    if (dateStr !== '2026-06-23') {
      teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: rm.id });
    }

    // Luciana Tavares: atestado na Quarta 24/06 (sem registros nesse dia)
    const lt = dbEmployees['luciana@example.com'];
    if (dateStr !== '2026-06-24') {
      teamRecords.push({ date: dateStr, type: 'IN', time: '08:00', confirmed: true, employeeId: lt.id });
      teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: lt.id });
      teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: lt.id });
      teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: lt.id });
    }

    // Paulo Roberto: ajuste manual pendente na Quarta 24/06 (apenas LUNCH_OUT, LUNCH_IN e OUT confirmados; IN pendente)
    const pr = dbEmployees['paulo@example.com'];
    if (dateStr === '2026-06-24') {
      teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: pr.id });
      teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: pr.id });
      teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: pr.id });
    } else {
      teamRecords.push({ date: dateStr, type: 'IN', time: '08:00', confirmed: true, employeeId: pr.id });
      teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: pr.id });
      teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: pr.id });
      teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: pr.id });
    }
  });

  await prisma.timeRecord.createMany({
    data: teamRecords,
  });

  // 3. Criar solicitações de ajuste pendentes iniciais
  const rmEmp = dbEmployees['roberto@example.com'];
  const ltEmp = dbEmployees['luciana@example.com'];
  const prEmp = dbEmployees['paulo@example.com'];

  await prisma.timeAdjustment.createMany({
    data: [
      {
        employeeId: rmEmp.id,
        date: '2026-06-23',
        type: 'ESQUECIMENTO DE SAÍDA',
        time: '18:00',
        justification: 'Fiquei trabalhando até mais tarde no projeto X e esqueci de bater o ponto na saída.',
        status: 'PENDING',
        createdAt: new Date('2026-06-23T19:00:00Z'),
      },
      {
        employeeId: ltEmp.id,
        date: '2026-06-24',
        type: 'ATESTADO MÉDICO',
        time: null,
        justification: 'Consulta odontológica de rotina na quarta-feira pela manhã.',
        attachment: 'atestado_2410.pdf',
        status: 'PENDING',
        createdAt: new Date('2026-06-24T14:30:00Z'),
      },
      {
        employeeId: prEmp.id,
        date: '2026-06-24',
        type: 'AJUSTE MANUAL INÍCIO',
        time: '08:15',
        justification: 'O aplicativo móvel falhou ao carregar a geolocalização no momento de registrar a entrada.',
        status: 'PENDING',
        createdAt: new Date('2026-06-24T08:30:00Z'),
      },
    ],
  });

  console.log('Banco de dados semeado com sucesso para a Precision no monorepo!');
  console.log(`Funcionário padrão: ${mainEmployee.name}`);
  console.log(`Outros funcionários criados: ${Object.keys(dbEmployees).length}`);
}

main()
  .catch((e) => {
    console.error('Erro ao semear o banco:', e);
    process.exit(1);
  });
