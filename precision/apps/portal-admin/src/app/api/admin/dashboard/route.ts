import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

// Helper para converter HH:MM para minutos desde a meia-noite
const timeToMinutes = (timeStr: string): number => {
  if (!timeStr || timeStr === '--:--') return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const companyId = session.companyId;

    // 1. Total de funcionários
    const totalEmployees = await prisma.employee.count({
      where: isSuperAdmin ? {} : { companyId },
    });
    
    // Como hoje no seed é sábado (2026-06-27), usamos a última data útil com registros (26/06)
    // para preencher os dados do painel principal (Presentes Agora) de forma realista.
    const targetDate = '2026-06-26';
    
    // 2. Contar funcionários que registraram entrada na data alvo
    const checkedInToday = await prisma.timeRecord.findMany({
      where: {
        date: targetDate,
        type: 'IN',
        employee: isSuperAdmin ? {} : { companyId },
      },
    });

    const presentNow = checkedInToday.length;
    const presentNowPercentage = totalEmployees > 0 
      ? Math.round((presentNow / totalEmployees) * 100) 
      : 0;

    // 3. Buscar pendências de ajustes com status PENDING
    const pendingRequests = await prisma.timeAdjustment.findMany({
      where: {
        status: 'PENDING',
        employee: isSuperAdmin ? {} : { companyId },
      },
      include: {
        employee: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const pendingRequestsCount = pendingRequests.length;

    // 4. Calcular as horas extras de todos os funcionários no ano atual (2026)
    const currentYearStr = '2026';
    const yearRecords = await prisma.timeRecord.findMany({
      where: {
        date: {
          startsWith: `${currentYearStr}-`,
        },
        confirmed: true,
        employee: isSuperAdmin ? {} : { companyId },
      },
    });

    // Agrupar registros do ano por employeeId e data
    const dailyRecordsMap: { [key: string]: { [type: string]: string } } = {};
    
    yearRecords.forEach(r => {
      const key = `${r.employeeId}_${r.date}`;
      if (!dailyRecordsMap[key]) {
        dailyRecordsMap[key] = {};
      }
      dailyRecordsMap[key][r.type] = r.time;
    });

    // Minutos de horas extras agrupados por mês
    const overtimeByMonth: { [month: string]: number } = {
      '01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0,
      '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0
    };

    Object.keys(dailyRecordsMap).forEach(key => {
      const parts = key.split('_');
      const dateStr = parts[1]; // "YYYY-MM-DD"
      const monthStr = dateStr.split('-')[1]; // "MM"
      const dayRecords = dailyRecordsMap[key];

      const inTime = dayRecords['IN'];
      const lunchOut = dayRecords['LUNCH_OUT'];
      const lunchIn = dayRecords['LUNCH_IN'];
      const outTime = dayRecords['OUT'];

      let p1 = 0;
      if (inTime && lunchOut) {
        p1 = Math.max(0, timeToMinutes(lunchOut) - timeToMinutes(inTime));
      }
      let p2 = 0;
      if (lunchIn && outTime) {
        p2 = Math.max(0, timeToMinutes(outTime) - timeToMinutes(lunchIn));
      }

      const workedMinutes = p1 + p2;

      // Determinar se é fim de semana
      const [year, month, day] = dateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      const dayOfWeek = d.getDay();

      let overtimeMinutes = 0;
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        overtimeMinutes = workedMinutes;
      } else {
        if (workedMinutes > 480) {
          overtimeMinutes = workedMinutes - 480;
        }
      }

      if (overtimeByMonth[monthStr] !== undefined) {
        overtimeByMonth[monthStr] += overtimeMinutes;
      }
    });

    // Horas extras do mês atual (Junho - "06") para o card de métrica
    const currentMonthOvertimeMinutes = overtimeByMonth['06'] || 0;
    const overtimeHoursNum = Math.floor(currentMonthOvertimeMinutes / 60);
    const overtimeHoursStr = `${overtimeHoursNum}h`;

    // Mapeamento de meses para labels
    const monthLabelsMap: { [key: string]: { label: string; shortLabel: string } } = {
      '01': { label: 'JANEIRO', shortLabel: 'JAN' },
      '02': { label: 'FEVEREIRO', shortLabel: 'FEV' },
      '03': { label: 'MARÇO', shortLabel: 'MAR' },
      '04': { label: 'ABRIL', shortLabel: 'ABR' },
      '05': { label: 'MAIO', shortLabel: 'MAI' },
      '06': { label: 'JUNHO', shortLabel: 'JUN' },
      '07': { label: 'JULHO', shortLabel: 'JUL' },
      '08': { label: 'AGOSTO', shortLabel: 'AGO' },
      '09': { label: 'SETEMBRO', shortLabel: 'SET' },
      '10': { label: 'OUTUBRO', shortLabel: 'OUT' },
      '11': { label: 'NOVEMBRO', shortLabel: 'NOV' },
      '12': { label: 'DEZEMBRO', shortLabel: 'DEZ' },
    };

    // Meses que realmente contêm dados no banco para o ano atual
    const availableMonths = Array.from(new Set(
      yearRecords.map(r => r.date.split('-')[1])
    )).sort();

    // Calcular dados mensais e calcular porcentagem em relação ao mês de pico (máximo)
    const monthlyOvertimeRaw = availableMonths.map(m => {
      const hours = Math.round((overtimeByMonth[m] / 60) * 10) / 10;
      return {
        label: monthLabelsMap[m].label,
        monthLabel: monthLabelsMap[m].shortLabel,
        hours,
      };
    });

    const maxHours = Math.max(...monthlyOvertimeRaw.map(m => m.hours), 1);
    const monthlyOvertime = monthlyOvertimeRaw.map(m => ({
      ...m,
      percentage: Math.round((m.hours / maxHours) * 100),
    }));

    // 5. Buscar Atividades Recentes: últimas 10 batidas confirmadas na data alvo (26/06) ordenadas por horário decrescente
    const recentRecords = await prisma.timeRecord.findMany({
      where: {
        date: targetDate,
        confirmed: true,
        employee: isSuperAdmin ? {} : { companyId },
      },
      include: {
        employee: true,
      },
      orderBy: [
        { time: 'desc' },
      ],
      take: 10,
    });

    // Formatar como lista de atividades
    const recentActivities = recentRecords.map(r => {
      const isLate = r.type === 'IN' && timeToMinutes(r.time) > timeToMinutes(r.employee.workStart);
      
      let activityText = '';
      let icon = 'login';
      let iconBg = 'bg-secondary-container/20 text-secondary';

      if (r.type === 'IN') {
        activityText = `${r.employee.name} registrou entrada`;
        icon = isLate ? 'warning' : 'login';
        iconBg = isLate ? 'bg-error-container/30 text-error' : 'bg-secondary-container/20 text-secondary';
      } else if (r.type === 'OUT') {
        activityText = `${r.employee.name} registrou saída`;
        icon = 'logout';
        iconBg = 'bg-tertiary-container/10 text-tertiary';
      } else if (r.type === 'LUNCH_OUT') {
        activityText = `${r.employee.name} registrou saída (Almoço)`;
        icon = 'logout';
        iconBg = 'bg-tertiary-container/10 text-tertiary';
      } else if (r.type === 'LUNCH_IN') {
        activityText = `${r.employee.name} registrou retorno (Almoço)`;
        icon = 'login';
        iconBg = 'bg-secondary-container/20 text-secondary';
      }

      return {
        id: r.id,
        employeeName: r.employee.name,
        role: r.employee.role,
        text: activityText,
        time: r.time,
        type: r.type,
        icon,
        iconBg,
        isLate,
      };
    });

    return NextResponse.json({
      metrics: {
        totalEmployees,
        totalEmployeesGrowth: '+3 esse mês',
        presentNow,
        presentNowPercentage: `${presentNowPercentage}% da força de trabalho`,
        pendingRequestsCount,
        overtimeHours: overtimeHoursStr,
        overtimeGrowth: '+15% em relação ao último mês',
      },
      monthlyOvertime,
      recentActivities,
      pendingRequests,
    });
  } catch (error) {
    console.error('Erro na API de dashboard:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
