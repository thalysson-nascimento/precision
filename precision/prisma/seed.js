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
  await prisma.team.deleteMany();
  await prisma.jobRole.deleteMany();
  await prisma.company.deleteMany();

  const now = new Date();
  
  // 1. Criar Empresas
  const activeDate = new Date();
  activeDate.setMonth(activeDate.getMonth() + 3);

  const expiredDate = new Date();
  expiredDate.setDate(expiredDate.getDate() - 1);

  const companyTech = await prisma.company.create({
    data: {
      name: 'Precision Tech',
      address: 'Av. Paulista',
      number: '1000',
      contact: 'contato@precisiontech.com.br',
      subscriptionPlan: 'THREE_MONTHS',
      subscriptionStatus: 'ACTIVE',
      subscriptionEndsAt: activeDate,
    },
  });

  const companyAlpha = await prisma.company.create({
    data: {
      name: 'Alpha Corp',
      address: 'Rua das Flores',
      number: '45',
      contact: 'contato@alphacorp.com.br',
      subscriptionPlan: 'SIX_MONTHS',
      subscriptionStatus: 'EXPIRED',
      subscriptionEndsAt: expiredDate,
    },
  });

  // 2. Criar Cargos e Equipes por Empresa
  const techDevRole = await prisma.jobRole.create({
    data: { name: 'Desenvolvedor Senior', companyId: companyTech.id }
  });
  const techHRAssistantRole = await prisma.jobRole.create({
    data: { name: 'Coordenadora de RH', companyId: companyTech.id }
  });
  const techOpsRole = await prisma.jobRole.create({
    data: { name: 'Analista de Operacoes', companyId: companyTech.id }
  });
  const techSalesRole = await prisma.jobRole.create({
    data: { name: 'Executiva de Vendas', companyId: companyTech.id }
  });
  const techITRole = await prisma.jobRole.create({
    data: { name: 'Suporte de TI', companyId: companyTech.id }
  });
  const techNetworkRole = await prisma.jobRole.create({
    data: { name: 'Administrador de Redes', companyId: companyTech.id }
  });
  const techFinRole = await prisma.jobRole.create({
    data: { name: 'Analista Financeiro', companyId: companyTech.id }
  });
  const techOpsAssistantRole = await prisma.jobRole.create({
    data: { name: 'Assistente Operacional', companyId: companyTech.id }
  });
  const techManagerRole = await prisma.jobRole.create({
    data: { name: 'Gerente de RH', companyId: companyTech.id }
  });

  const alphaAnalystRole = await prisma.jobRole.create({
    data: { name: 'Analista', companyId: companyAlpha.id }
  });

  const techDevTeam = await prisma.team.create({
    data: { name: 'Desenvolvimento', companyId: companyTech.id }
  });
  const techHRTeam = await prisma.team.create({
    data: { name: 'Recursos Humanos', companyId: companyTech.id }
  });
  const techSalesTeam = await prisma.team.create({
    data: { name: 'Vendas', companyId: companyTech.id }
  });

  const alphaDevTeam = await prisma.team.create({
    data: { name: 'Engenharia', companyId: companyAlpha.id }
  });

  // 3. Criar SUPERADMIN (sem empresa)
  const superAdmin = await prisma.employee.create({
    data: {
      name: 'Admin Global',
      email: 'superadmin@precision.com',
      password: '123456',
      userRole: 'SUPERADMIN',
      role: 'Diretor Geral',
    },
  });

  // 4. Criar Colaboradores Precision Tech
  const techOwner = await prisma.employee.create({
    data: {
      name: 'Tech Owner',
      email: 'owner@precisiontech.com',
      password: '123456',
      userRole: 'OWNER',
      role: 'Presidente',
      companyId: companyTech.id,
      isTeamLeader: true,
      contractNumber: 'CT-9080-X',
      phone: '(11) 98888-7777',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
    },
  });

  const techAdmin = await prisma.employee.create({
    data: {
      name: 'Tech Admin',
      email: 'admin@precisiontech.com',
      password: '123456',
      userRole: 'ADMIN',
      role: 'Gerente de RH',
      companyId: companyTech.id,
      isTeamLeader: true,
      teamId: techHRTeam.id,
      contractNumber: 'CT-2041-A',
      phone: '(11) 97777-6666',
      address: 'Rua Bela Cintra, 200 - São Paulo, SP',
      managerId: techOwner.id,
    },
  });

  const mainEmployee = await prisma.employee.create({
    data: {
      name: 'Thalysson Nascimento',
      email: 'thalysson@example.com',
      password: '123456',
      userRole: 'EMPLOYEE',
      role: 'Desenvolvedor Senior',
      workStart: '08:00',
      lunchStart: '12:00',
      lunchEnd: '13:00',
      workEnd: '18:00',
      companyId: companyTech.id,
      isTeamLeader: false,
      teamId: techDevTeam.id,
      contractNumber: 'CT-8041-F',
      phone: '(11) 98888-8888',
      address: 'Rua Augusta, 400 - São Paulo, SP',
      managerId: techOwner.id,
    },
  });

  const employees = [
    { name: 'Carlos Souza', email: 'carlos@example.com', role: 'Analista de Operacoes', teamId: techDevTeam.id, contractNumber: 'CT-7011-B', phone: '(11) 91111-2222', address: 'Rua Consolação, 500', isTeamLeader: false, isActive: true },
    { name: 'Ana Lima', email: 'ana@example.com', role: 'Executiva de Vendas', teamId: techSalesTeam.id, contractNumber: 'CT-3042-C', phone: '(11) 92222-3333', address: 'Alameda Santos, 800', isTeamLeader: true, isActive: true },
    { name: 'Fernando Costa', email: 'fernando@example.com', role: 'Suporte de TI', teamId: techDevTeam.id, contractNumber: 'CT-1025-D', phone: '(11) 93333-4444', address: 'Rua Pamplona, 900', isTeamLeader: false, isActive: true },
    { name: 'Mariana Silva', email: 'mariana@example.com', role: 'Analista de RH', teamId: techHRTeam.id, contractNumber: 'CT-6033-E', phone: '(11) 94444-5555', address: 'Rua Oscar Freire, 1200', isTeamLeader: false, isActive: true },
    { name: 'Joao Pedro', email: 'joao@example.com', role: 'Analista Financeiro', teamId: techSalesTeam.id, contractNumber: 'CT-5022-G', phone: '(11) 95555-6666', address: 'Rua Haddock Lobo, 600', isTeamLeader: false, isActive: true },
    { name: 'Roberto Mendes', email: 'roberto@example.com', role: 'Assistente Operacional', teamId: techHRTeam.id, contractNumber: 'CT-4099-H', phone: '(11) 96666-7777', address: 'Rua Augusta, 1500', isTeamLeader: false, isActive: true },
    { name: 'Luciana Tavares', email: 'luciana@example.com', role: 'Coordenadora de RH', teamId: techHRTeam.id, contractNumber: 'CT-6088-I', phone: '(11) 97777-8888', address: 'Rua Bela Cintra, 800', isTeamLeader: false, isActive: true },
    { name: 'Paulo Roberto', email: 'paulo@example.com', role: 'Administrador de Redes', teamId: techDevTeam.id, contractNumber: 'CT-1090-J', phone: '(11) 98888-9999', address: 'Rua Itapeva, 100', isTeamLeader: false, isActive: false },
  ];

  const dbEmployees = {};
  for (const emp of employees) {
    const created = await prisma.employee.create({
      data: {
        name: emp.name,
        email: emp.email,
        password: '123456',
        userRole: 'EMPLOYEE',
        role: emp.role,
        workStart: '08:00',
        lunchStart: '12:00',
        lunchEnd: '13:00',
        workEnd: '18:00',
        companyId: companyTech.id,
        isActive: emp.isActive,
        contractNumber: emp.contractNumber,
        phone: emp.phone,
        address: emp.address,
        isTeamLeader: emp.isTeamLeader,
        teamId: emp.teamId,
        managerId: techAdmin.id, // Tech Admin handles general employees
      },
    });
    dbEmployees[emp.email] = created;
  }

  // 5. Criar Colaboradores Alpha Corp
  const alphaOwner = await prisma.employee.create({
    data: {
      name: 'Alpha Owner',
      email: 'owner@alphacorp.com',
      password: '123456',
      userRole: 'OWNER',
      role: 'Presidente',
      companyId: companyAlpha.id,
    },
  });

  const alphaEmployee = await prisma.employee.create({
    data: {
      name: 'Alpha Employee',
      email: 'employee@alphacorp.com',
      password: '123456',
      userRole: 'EMPLOYEE',
      role: 'Analista',
      workStart: '08:00',
      lunchStart: '12:00',
      lunchEnd: '13:00',
      workEnd: '18:00',
      companyId: companyAlpha.id,
    },
  });

  // 6. Gerar registros históricos para Thalysson
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

  // 7. Gerar registros de ponto da semana atual para outros funcionários
  const teamRecords = [];
  const weekDays = ['2026-06-22', '2026-06-23', '2026-06-24', '2026-06-25', '2026-06-26'];

  weekDays.forEach(dateStr => {
    const cs = dbEmployees['carlos@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '08:02', confirmed: true, employeeId: cs.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: cs.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: cs.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: cs.id });

    const al = dbEmployees['ana@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '07:58', confirmed: true, employeeId: al.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:15', confirmed: true, employeeId: al.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:15', confirmed: true, employeeId: al.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:05', confirmed: true, employeeId: al.id });

    const fc = dbEmployees['fernando@example.com'];
    const fcInTime = dateStr === '2026-06-26' ? '09:30' : '08:05';
    teamRecords.push({ date: dateStr, type: 'IN', time: fcInTime, confirmed: true, employeeId: fc.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: fc.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: fc.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: fc.id });

    const ms = dbEmployees['mariana@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '07:55', confirmed: true, employeeId: ms.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: ms.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: ms.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: ms.id });

    const jp = dbEmployees['joao@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '07:50', confirmed: true, employeeId: jp.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: jp.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: jp.id });
    teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: jp.id });

    const rm = dbEmployees['roberto@example.com'];
    teamRecords.push({ date: dateStr, type: 'IN', time: '08:00', confirmed: true, employeeId: rm.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: rm.id });
    teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: rm.id });
    if (dateStr !== '2026-06-23') {
      teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: rm.id });
    }

    const lt = dbEmployees['luciana@example.com'];
    if (dateStr !== '2026-06-24') {
      teamRecords.push({ date: dateStr, type: 'IN', time: '08:00', confirmed: true, employeeId: lt.id });
      teamRecords.push({ date: dateStr, type: 'LUNCH_OUT', time: '12:00', confirmed: true, employeeId: lt.id });
      teamRecords.push({ date: dateStr, type: 'LUNCH_IN', time: '13:00', confirmed: true, employeeId: lt.id });
      teamRecords.push({ date: dateStr, type: 'OUT', time: '18:00', confirmed: true, employeeId: lt.id });
    }

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

  // 8. Criar solicitações de ajuste pendentes
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

  console.log('Banco de dados semeado com sucesso em Precision no modo multi-tenant!');
}

main()
  .catch((e) => {
    console.error('Erro ao semear o banco:', e);
    process.exit(1);
  });
