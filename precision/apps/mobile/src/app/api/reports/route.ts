import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { delay } from '@/lib/delay';
import { getSessionFromCookies } from '@precision/auth';

const PORTUGUESE_MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Helper para converter HH:MM para minutos desde a meia-noite
const timeToMinutes = (timeStr: string): number => {
  if (!timeStr || timeStr === '--:--') return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// Helper para converter minutos para HH:MM formatado
const minutesToTimeStr = (totalMinutes: number): string => {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}:${String(m).padStart(2, '0')}`;
};

// Helper para formatar em formato decimal com vírgula
const formatNro = (minutes: number): string => {
  const decimal = minutes / 60;
  return decimal.toFixed(2).replace('.', ',');
};

// Retorna os minutos previstos de trabalho para um mês inteiro (dias de semana * 8h)
const getExpectedMinutesForMonth = (year: number, monthZeroIndexed: number): number => {
  let expectedMinutes = 0;
  const daysInMonth = new Date(year, monthZeroIndexed + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthZeroIndexed, day);
    const dayOfWeek = d.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Segunda a Sexta
      expectedMinutes += 8 * 60; // 8 horas por dia
    }
  }
  return expectedMinutes;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    // Simular latência de rede para exibir o skeleton loader de forma bonita
    await delay(800);

    const employee = await prisma.employee.findUnique({
      where: { id: session.userId },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Funcionário não encontrado' }, { status: 404 });
    }

    // Buscar todos os registros confirmados do funcionário ordenados por data
    const records = await prisma.timeRecord.findMany({
      where: {
        employeeId: employee.id,
        confirmed: true,
      },
      orderBy: { date: 'asc' },
    });

    // 1. Agrupar registros por dia
    const dailyRecordsMap: { [date: string]: typeof records } = {};
    records.forEach(r => {
      if (!dailyRecordsMap[r.date]) {
        dailyRecordsMap[r.date] = [];
      }
      dailyRecordsMap[r.date].push(r);
    });

    // 2. Calcular o trabalhado e as horas extras de cada dia
    const dailyCalculations: {
      [date: string]: {
        workedMinutes: number;
        overtimeMinutes: number;
        overtimeUpTo2: number;
        overtimeAfter2: number;
        overtimeSaturday: number;
        overtimeSunday: number;
      }
    } = {};

    Object.keys(dailyRecordsMap).forEach(dateStr => {
      const dayRecords = dailyRecordsMap[dateStr];
      const inRec = dayRecords.find(r => r.type === 'IN');
      const lunchOutRec = dayRecords.find(r => r.type === 'LUNCH_OUT');
      const lunchInRec = dayRecords.find(r => r.type === 'LUNCH_IN');
      const outRec = dayRecords.find(r => r.type === 'OUT');

      // Calcular períodos de trabalho
      let period1 = 0;
      if (inRec && lunchOutRec) {
        period1 = Math.max(0, timeToMinutes(lunchOutRec.time) - timeToMinutes(inRec.time));
      }
      let period2 = 0;
      if (lunchInRec && outRec) {
        period2 = Math.max(0, timeToMinutes(outRec.time) - timeToMinutes(lunchInRec.time));
      }

      const workedMinutes = period1 + period2;

      // Determinar dia da semana
      const [year, month, day] = dateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      const dayOfWeek = d.getDay(); // 0 = Domingo, 6 = Sábado

      let overtimeMinutes = 0;
      let overtimeUpTo2 = 0;
      let overtimeAfter2 = 0;
      let overtimeSaturday = 0;
      let overtimeSunday = 0;

      if (dayOfWeek === 0) {
        // Domingo
        overtimeMinutes = workedMinutes;
        overtimeSunday = workedMinutes;
      } else if (dayOfWeek === 6) {
        // Sábado
        overtimeMinutes = workedMinutes;
        overtimeSaturday = workedMinutes;
      } else {
        // Segunda a Sexta
        if (workedMinutes > 8 * 60) {
          overtimeMinutes = workedMinutes - 8 * 60;
          overtimeUpTo2 = Math.min(overtimeMinutes, 120);
          overtimeAfter2 = Math.max(0, overtimeMinutes - 120);
        }
      }

      dailyCalculations[dateStr] = {
        workedMinutes,
        overtimeMinutes,
        overtimeUpTo2,
        overtimeAfter2,
        overtimeSaturday,
        overtimeSunday,
      };
    });

    // 3. Agrupar os totais diários por mês
    const monthlyGroups: {
      [monthKey: string]: {
        monthName: string;
        year: string;
        workedMinutes: number;
        overtimeMinutes: number;
        overtimeUpTo2: number;
        overtimeAfter2: number;
        overtimeSaturday: number;
        overtimeSunday: number;
      }
    } = {};

    // Inicializar os meses de Janeiro a Junho de 2026 para garantir que apareçam mesmo vazios
    const startMonth = 0; // Janeiro
    const endMonth = 5;   // Junho
    const startYear = 2026;

    for (let m = startMonth; m <= endMonth; m++) {
      const monthStr = String(m + 1).padStart(2, '0');
      const key = `${startYear}-${monthStr}`;
      monthlyGroups[key] = {
        monthName: PORTUGUESE_MONTHS[m],
        year: String(startYear),
        workedMinutes: 0,
        overtimeMinutes: 0,
        overtimeUpTo2: 0,
        overtimeAfter2: 0,
        overtimeSaturday: 0,
        overtimeSunday: 0,
      };
    }

    // Somar cálculos diários nos respectivos meses
    Object.keys(dailyCalculations).forEach(dateStr => {
      const [yearStr, monthStr] = dateStr.split('-');
      const key = `${yearStr}-${monthStr}`;
      const dayCalc = dailyCalculations[dateStr];

      // Se o mês já estiver inicializado no objeto
      if (monthlyGroups[key]) {
        monthlyGroups[key].workedMinutes += dayCalc.workedMinutes;
        monthlyGroups[key].overtimeMinutes += dayCalc.overtimeMinutes;
        monthlyGroups[key].overtimeUpTo2 += dayCalc.overtimeUpTo2;
        monthlyGroups[key].overtimeAfter2 += dayCalc.overtimeAfter2;
        monthlyGroups[key].overtimeSaturday += dayCalc.overtimeSaturday;
        monthlyGroups[key].overtimeSunday += dayCalc.overtimeSunday;
      } else {
        // Para meses fora do intervalo inicial (se houver)
        const monthIndex = parseInt(monthStr, 10) - 1;
        monthlyGroups[key] = {
          monthName: PORTUGUESE_MONTHS[monthIndex] || `Mês ${monthStr}`,
          year: yearStr,
          workedMinutes: dayCalc.workedMinutes,
          overtimeMinutes: dayCalc.overtimeMinutes,
          overtimeUpTo2: dayCalc.overtimeUpTo2,
          overtimeAfter2: dayCalc.overtimeAfter2,
          overtimeSaturday: dayCalc.overtimeSaturday,
          overtimeSunday: dayCalc.overtimeSunday,
        };
      }
    });

    // 4. Formatar e calcular os previstos mensais
    let totalWorkedAllMonths = 0;
    let totalExpectedAllMonths = 0;
    let totalOvertimeAllMonths = 0;
    let totalUpTo2AllMonths = 0;
    let totalAfter2AllMonths = 0;
    let totalSaturdayAllMonths = 0;
    let totalSundayAllMonths = 0;

    const reports = Object.keys(monthlyGroups)
      .sort((a, b) => a.localeCompare(b)) // Ordenar de forma crescente
      .map(key => {
        const group = monthlyGroups[key];
        const yearNum = parseInt(group.year, 10);
        const monthIndex = PORTUGUESE_MONTHS.indexOf(group.monthName);
        
        // Obter minutos previstos para o mês
        const expectedMinutes = getExpectedMinutesForMonth(yearNum, monthIndex);

        // Atualizar somatórios globais
        totalWorkedAllMonths += group.workedMinutes;
        totalExpectedAllMonths += expectedMinutes;
        totalOvertimeAllMonths += group.overtimeMinutes;
        totalUpTo2AllMonths += group.overtimeUpTo2;
        totalAfter2AllMonths += group.overtimeAfter2;
        totalSaturdayAllMonths += group.overtimeSaturday;
        totalSundayAllMonths += group.overtimeSunday;

        return {
          monthKey: key, // "YYYY-MM"
          monthLabel: `${group.monthName}/${group.year}`,
          total: minutesToTimeStr(group.workedMinutes),
          expected: minutesToTimeStr(expectedMinutes),
          totalOvertime: minutesToTimeStr(group.overtimeMinutes),
          overtimeNro: formatNro(group.overtimeMinutes),
          maxDaily: '2:00',
          standard: '0:00',
          overtimeUpTo2: minutesToTimeStr(group.overtimeUpTo2),
          overtimeAfter2: minutesToTimeStr(group.overtimeAfter2),
          overtimeSaturday: minutesToTimeStr(group.overtimeSaturday),
          overtimeSunday: minutesToTimeStr(group.overtimeSunday),
        };
      });

    // 5. Estrutura de retorno com a lista e os somatórios totais
    return NextResponse.json({
      employee: {
        name: employee.name,
        role: employee.role,
      },
      reports,
      summary: {
        totalWorked: minutesToTimeStr(totalWorkedAllMonths),
        totalExpected: minutesToTimeStr(totalExpectedAllMonths),
        totalOvertime: minutesToTimeStr(totalOvertimeAllMonths),
        totalOvertimeNro: formatNro(totalOvertimeAllMonths),
        totalUpTo2: minutesToTimeStr(totalUpTo2AllMonths),
        totalAfter2: minutesToTimeStr(totalAfter2AllMonths),
        totalSaturday: minutesToTimeStr(totalSaturdayAllMonths),
        totalSunday: minutesToTimeStr(totalSundayAllMonths),
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatórios:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
