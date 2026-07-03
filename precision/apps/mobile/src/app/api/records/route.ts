import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/delay';
import { getSessionFromCookies } from '@precision/auth';

// Helper para obter a data local no formato YYYY-MM-DD
const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper para obter a hora local em minutos desde a meia-noite
const timeToMinutes = (timeStr: string): number => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// GET: Retorna o funcionário e seus registros do dia atual
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Simular latência de rede conforme diretrizes
    await delay(600);

    const employee = await prisma.employee.findUnique({
      where: { id: session.userId },
      include: {
        team: true,
        manager: true,
        company: true,
      },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }

    if (employee.company) {
      const isSubscriptionExpired = 
        employee.company.subscriptionStatus === 'EXPIRED' || 
        (employee.company.subscriptionEndsAt && new Date(employee.company.subscriptionEndsAt).getTime() < Date.now());

      if (isSubscriptionExpired) {
        return NextResponse.json({ error: 'subscription_expired' }, { status: 403 });
      }
    }

    const todayStr = getTodayDateString();
    
    // Check blockages
    let isBlocked = false;
    let blockageReason: string | null = null;
    
    if (employee.companyId) {
      const [year, month, day] = todayStr.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.getDay();

      const blockage = await prisma.workBlockage.findFirst({
        where: {
          companyId: employee.companyId,
          OR: [
            {
              type: 'WEEKDAY',
              dayOfWeek: dayOfWeek,
            },
            {
              type: 'DATE',
              date: todayStr,
            }
          ]
        }
      });

      if (blockage) {
        isBlocked = true;
        blockageReason = blockage.type === 'DATE' ? blockage.reason : 'WEEKDAY';
      }
    }

    const records = await prisma.timeRecord.findMany({
      where: {
        employeeId: employee.id,
        date: todayStr,
      },
    });

    // Buscar todos os registros do funcionário (ordenados por data decrescente)
    const allRecords = await prisma.timeRecord.findMany({
      where: {
        employeeId: employee.id,
      },
      orderBy: [
        { date: 'desc' },
        { type: 'asc' },
      ],
    });

    // Agrupar registros por data
    const recordsMap: { [date: string]: typeof allRecords } = {};
    allRecords.forEach(r => {
      if (!recordsMap[r.date]) {
        recordsMap[r.date] = [];
      }
      recordsMap[r.date].push(r);
    });

    // Filtrar registros do passado (excluindo hoje)
    const allPastRecords = allRecords.filter(r => r.date !== todayStr);
    const pastRecordsMap: { [date: string]: number } = {};
    allPastRecords.forEach(r => {
      pastRecordsMap[r.date] = (pastRecordsMap[r.date] || 0) + 1;
    });

    // Contar quantos dias tiveram entre 1 e 3 registros (marcações incompletas)
    const incompleteDaysCount = Object.values(pastRecordsMap).filter(
      count => count > 0 && count < 4
    ).length;

    // Formatar histórico para envio
    const history = Object.keys(recordsMap)
      .filter(date => date !== todayStr) // Excluir o dia de hoje
      .map(date => {
        const dayRecords = recordsMap[date];
        const inRec = dayRecords.find(r => r.type === 'IN');
        const lunchOutRec = dayRecords.find(r => r.type === 'LUNCH_OUT');
        const lunchInRec = dayRecords.find(r => r.type === 'LUNCH_IN');
        const outRec = dayRecords.find(r => r.type === 'OUT');

        const times = [
          inRec?.time || '--:--',
          lunchOutRec?.time || '--:--',
          lunchInRec?.time || '--:--',
          outRec?.time || '--:--',
        ];

        // É completo se tem 4 marcações
        const isComplete = dayRecords.filter(r => r.confirmed).length === 4;

        return {
          date, // "YYYY-MM-DD"
          times, // ["08:00", "12:00", "13:00", "18:00"]
          isComplete,
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date)); // Ordenar por data decrescente

    // Formatar o mês e ano atual, ex: "Junho/2026"
    const currentMonthLabel = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const monthParts = currentMonthLabel.split(' de ');
    const capitalizedMonth = monthParts[0].charAt(0).toUpperCase() + monthParts[0].slice(1);
    const currentMonthStr = `${capitalizedMonth}/${monthParts[1]}`;

    return NextResponse.json({ 
      employee, 
      records, 
      incompleteDays: incompleteDaysCount,
      history,
      currentMonth: currentMonthStr,
      blockage: {
        isBlocked,
        reason: blockageReason
      }
    });
  } catch (error) {
    console.error('Erro ao buscar registros:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// POST: Confirma/bate pontos de forma inteligente baseado no horário atual e no contrato
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Simular latência de rede conforme diretrizes
    await delay(1000);

    const body = await req.json().catch(() => ({}));
    const { date } = body;

    const employee = await prisma.employee.findUnique({
      where: { id: session.userId },
      include: { company: true },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }

    if (employee.company) {
      const isSubscriptionExpired = 
        employee.company.subscriptionStatus === 'EXPIRED' || 
        (employee.company.subscriptionEndsAt && new Date(employee.company.subscriptionEndsAt).getTime() < Date.now());

      if (isSubscriptionExpired) {
        return NextResponse.json({ error: 'subscription_expired' }, { status: 403 });
      }
    }

    const todayStr = getTodayDateString();
    const targetDate = date || todayStr;
    const isToday = targetDate === todayStr;

    // Check blockages
    if (employee.companyId) {
      const [year, month, day] = targetDate.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.getDay();

      const blockage = await prisma.workBlockage.findFirst({
        where: {
          companyId: employee.companyId,
          OR: [
            {
              type: 'WEEKDAY',
              dayOfWeek: dayOfWeek,
            },
            {
              type: 'DATE',
              date: targetDate,
            }
          ]
        }
      });

      if (blockage) {
        return NextResponse.json({ error: 'A data informada está bloqueada para registros.' }, { status: 403 });
      }
    }

    // Horário local atual
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMinutes}`;
    const currentMinutesVal = timeToMinutes(currentTimeStr);

    // Mapeamento dos limites contratuais do funcionário
    const contracts = [
      { type: 'IN', time: employee.workStart },
      { type: 'LUNCH_OUT', time: employee.lunchStart },
      { type: 'LUNCH_IN', time: employee.lunchEnd },
      { type: 'OUT', time: employee.workEnd },
    ];

    // Buscar registros existentes hoje
    const existingRecords = await prisma.timeRecord.findMany({
      where: {
        employeeId: employee.id,
        date: targetDate,
      },
    });

    const existingTypes = new Set(existingRecords.map(r => r.type));

    // Filtrar contratos elegíveis.
    const toRegister = contracts.filter(c => {
      if (isToday) {
        const contractMinutesVal = timeToMinutes(c.time);
        return contractMinutesVal <= currentMinutesVal && !existingTypes.has(c.type);
      } else {
        return !existingTypes.has(c.type);
      }
    });

    // Registrar as marcações elegíveis
    if (toRegister.length > 0) {
      const creations = toRegister.map(item => {
        return prisma.timeRecord.create({
          data: {
            employeeId: employee.id,
            date: targetDate,
            type: item.type,
            time: item.time, // Salva o horário contratual
            confirmed: true,
          },
        });
      });

      await Promise.all(creations);
    }

    // Buscar os registros atualizados
    const updatedRecords = await prisma.timeRecord.findMany({
      where: {
        employeeId: employee.id,
        date: targetDate,
      },
    });

    return NextResponse.json({ success: true, records: updatedRecords });
  } catch (error) {
    console.error('Erro ao bater ponto:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// PUT: Edita ou insere manualmente o horário de uma marcação específica (Modal)
export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Simular latência de rede conforme diretrizes
    await delay(1000);

    const body = await req.json();
    const { type, time, date } = body;

    if (!type || !time) {
      return NextResponse.json({ error: 'Dados insuficientes para edição' }, { status: 400 });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: session.userId },
      include: { company: true },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }

    if (employee.company) {
      const isSubscriptionExpired = 
        employee.company.subscriptionStatus === 'EXPIRED' || 
        (employee.company.subscriptionEndsAt && new Date(employee.company.subscriptionEndsAt).getTime() < Date.now());

      if (isSubscriptionExpired) {
        return NextResponse.json({ error: 'subscription_expired' }, { status: 403 });
      }
    }

    const targetDate = date || getTodayDateString();

    // Check blockages
    if (employee.companyId) {
      const [year, month, day] = targetDate.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.getDay();

      const blockage = await prisma.workBlockage.findFirst({
        where: {
          companyId: employee.companyId,
          OR: [
            {
              type: 'WEEKDAY',
              dayOfWeek: dayOfWeek,
            },
            {
              type: 'DATE',
              date: targetDate,
            }
          ]
        }
      });

      if (blockage) {
        return NextResponse.json({ error: 'A data informada está bloqueada para registros.' }, { status: 403 });
      }
    }

    // Upsert da marcação
    const record = await prisma.timeRecord.upsert({
      where: {
        employeeId_date_type: {
          employeeId: employee.id,
          date: targetDate,
          type,
        },
      },
      update: {
        time,
        confirmed: true,
      },
      create: {
        employeeId: employee.id,
        date: targetDate,
        type,
        time,
        confirmed: true,
      },
    });

    // Buscar todos os registros do dia alvo
    const updatedRecords = await prisma.timeRecord.findMany({
      where: {
        employeeId: employee.id,
        date: targetDate,
      },
    });

    return NextResponse.json({ success: true, record, records: updatedRecords });
  } catch (error) {
    console.error('Erro ao editar marcação:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
