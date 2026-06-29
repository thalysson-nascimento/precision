import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSessionFromCookies } from '@precision/auth';

function parseTimeToMinutes(timeStr: string | null | undefined): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function formatMinutesToTime(totalMinutes: number): string {
  const isNegative = totalMinutes < 0;
  const absMinutes = Math.abs(totalMinutes);
  const h = String(Math.floor(absMinutes / 60)).padStart(2, '0');
  const m = String(absMinutes % 60).padStart(2, '0');
  return `${isNegative ? '-' : ''}${h}:${m}`;
}

function calculateWorkedMinutesForDay(dayRecords: { type: string; time: string }[]): number {
  const inRec = dayRecords.find(r => r.type === 'IN');
  const lunchOutRec = dayRecords.find(r => r.type === 'LUNCH_OUT');
  const lunchInRec = dayRecords.find(r => r.type === 'LUNCH_IN');
  const outRec = dayRecords.find(r => r.type === 'OUT');

  let totalMinutes = 0;

  if (inRec && lunchOutRec) {
    totalMinutes += Math.max(0, parseTimeToMinutes(lunchOutRec.time) - parseTimeToMinutes(inRec.time));
  }
  if (lunchInRec && outRec) {
    totalMinutes += Math.max(0, parseTimeToMinutes(outRec.time) - parseTimeToMinutes(lunchInRec.time));
  }
  if (inRec && outRec && !lunchOutRec && !lunchInRec) {
    totalMinutes += Math.max(0, parseTimeToMinutes(outRec.time) - parseTimeToMinutes(inRec.time));
  }

  return totalMinutes;
}

function getLast6Months(): { monthKey: string; label: string }[] {
  const result: { monthKey: string; label: string }[] = [];
  const now = new Date();
  const monthsNames = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const monthKey = `${year}-${month}`;
    const label = `${monthsNames[d.getMonth()]}/${String(year).slice(2)}`;
    result.push({ monthKey, label });
  }
  return result;
}

function aggregateMonthlyStats(employees: any[]) {
  const months = getLast6Months();
  const monthlyStats = months.map(m => ({
    monthKey: m.monthKey,
    label: m.label,
    workedMinutes: 0,
    expectedMinutes: 0,
  }));

  for (const emp of employees) {
    const expectedDailyMinutes = (parseTimeToMinutes(emp.workEnd) - parseTimeToMinutes(emp.workStart)) -
                                 (parseTimeToMinutes(emp.lunchEnd) - parseTimeToMinutes(emp.lunchStart));

    const recordsByDay: Record<string, { type: string; time: string }[]> = {};
    for (const rec of emp.records || []) {
      if (!recordsByDay[rec.date]) {
        recordsByDay[rec.date] = [];
      }
      recordsByDay[rec.date].push(rec);
    }

    for (const [dateStr, dayRecords] of Object.entries(recordsByDay)) {
      const monthKey = dateStr.slice(0, 7);
      const stat = monthlyStats.find(s => s.monthKey === monthKey);
      if (stat) {
        stat.workedMinutes += calculateWorkedMinutesForDay(dayRecords);
        stat.expectedMinutes += expectedDailyMinutes;
      }
    }
  }

  return monthlyStats.map(s => {
    const overtime = Math.max(0, s.workedMinutes - s.expectedMinutes);
    return {
      monthKey: s.monthKey,
      label: s.label,
      workedHours: Number((s.workedMinutes / 60).toFixed(1)),
      expectedHours: Number((s.expectedMinutes / 60).toFixed(1)),
      overtimeHours: Number((overtime / 60).toFixed(1)),
    };
  });
}

function aggregateEmployeeWorkedHours(employees: any[]) {
  return employees.map(emp => {
    const recordsByDay: Record<string, { type: string; time: string }[]> = {};
    for (const rec of emp.records || []) {
      if (!recordsByDay[rec.date]) {
        recordsByDay[rec.date] = [];
      }
      recordsByDay[rec.date].push(rec);
    }

    let totalWorkedMinutes = 0;
    for (const dayRecords of Object.values(recordsByDay)) {
      totalWorkedMinutes += calculateWorkedMinutesForDay(dayRecords);
    }

    return {
      name: emp.name,
      role: emp.role,
      hours: Number((totalWorkedMinutes / 60).toFixed(1)),
    };
  }).sort((a, b) => b.hours - a.hours).slice(0, 10);
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = await getSessionFromCookies(cookieStore);

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    const isSuperAdmin = session.userRole === 'SUPERADMIN';
    const companyId = session.companyId;

    // 1. GENERAL HIERARCHY (NO TYPE)
    if (!type) {
      const companies = await prisma.company.findMany({
        where: isSuperAdmin ? {} : { id: companyId },
        include: {
          teams: {
            include: {
              employees: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  role: true,
                  isActive: true,
                }
              }
            }
          },
          employees: {
            where: { teamId: null },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              isActive: true,
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });
      return NextResponse.json(companies);
    }

    // 2. COMPANY REPORT
    if (type === 'company') {
      if (!id) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
      if (!isSuperAdmin && companyId !== id) {
        return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
      }

      const company = await prisma.company.findUnique({
        where: { id },
        include: {
          teams: true,
          employees: {
            include: {
              records: true
            }
          }
        }
      });

      if (!company) return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 });

      const monthlyStats = aggregateMonthlyStats(company.employees);
      const employeesHours = aggregateEmployeeWorkedHours(company.employees);
      const activeCount = company.employees.filter(e => e.isActive).length;
      const inactiveCount = company.employees.filter(e => !e.isActive).length;

      // Extract basic employees info for table list (remove records to save payload size)
      const employeeList = company.employees.map(e => ({
        id: e.id,
        name: e.name,
        email: e.email,
        role: e.role,
        isActive: e.isActive,
        teamName: company.teams.find(t => t.id === e.teamId)?.name || 'Sem Equipe'
      }));

      return NextResponse.json({
        company: {
          id: company.id,
          name: company.name,
          address: company.address,
          number: company.number,
          contact: company.contact,
        },
        monthlyStats,
        employeesHours,
        activeCount,
        inactiveCount,
        employees: employeeList
      });
    }

    // 3. TEAM REPORT
    if (type === 'team') {
      if (!id) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

      const team = await prisma.team.findUnique({
        where: { id },
        include: {
          company: true,
          employees: {
            include: {
              records: true
            }
          }
        }
      });

      if (!team) return NextResponse.json({ error: 'Equipe não encontrada' }, { status: 404 });
      if (!isSuperAdmin && companyId !== team.companyId) {
        return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
      }

      const monthlyStats = aggregateMonthlyStats(team.employees);
      const employeesHours = aggregateEmployeeWorkedHours(team.employees);
      const activeCount = team.employees.filter(e => e.isActive).length;
      const inactiveCount = team.employees.filter(e => !e.isActive).length;

      const employeeList = team.employees.map(e => ({
        id: e.id,
        name: e.name,
        email: e.email,
        role: e.role,
        isActive: e.isActive,
        teamName: team.name
      }));

      return NextResponse.json({
        team: {
          id: team.id,
          name: team.name,
        },
        company: {
          name: team.company.name,
          address: team.company.address,
          number: team.company.number,
          contact: team.company.contact,
        },
        monthlyStats,
        employeesHours,
        activeCount,
        inactiveCount,
        employees: employeeList
      });
    }

    // 4. EMPLOYEE REPORT
    if (type === 'employee') {
      if (!id) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });

      const employee = await prisma.employee.findUnique({
        where: { id },
        include: {
          company: true,
          team: true,
          records: {
            orderBy: [
              { date: 'asc' },
              { time: 'asc' }
            ]
          }
        }
      });

      if (!employee) return NextResponse.json({ error: 'Colaborador não encontrado' }, { status: 404 });
      if (!isSuperAdmin && companyId !== employee.companyId) {
        return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
      }

      // Group records by day
      const recordsByDay: Record<string, { id: string; type: string; time: string; confirmed: boolean }[]> = {};
      for (const rec of employee.records) {
        if (!recordsByDay[rec.date]) {
          recordsByDay[rec.date] = [];
        }
        recordsByDay[rec.date].push(rec);
      }

      const expectedDailyMinutes = (parseTimeToMinutes(employee.workEnd) - parseTimeToMinutes(employee.workStart)) -
                                   (parseTimeToMinutes(employee.lunchEnd) - parseTimeToMinutes(employee.lunchStart));

      // Calculate details for each day
      let totalWorkedMinutes = 0;
      let totalExpectedMinutes = 0;

      const detailsList = Object.entries(recordsByDay).map(([dateStr, dayRecords]) => {
        const workedMin = calculateWorkedMinutesForDay(dayRecords);
        totalWorkedMinutes += workedMin;
        totalExpectedMinutes += expectedDailyMinutes;

        const balanceMin = workedMin - expectedDailyMinutes;

        // format record punches text
        const punchesText = dayRecords.map(r => `${r.type === 'IN' ? 'Entrada' : r.type === 'LUNCH_OUT' ? 'Saída Almoço' : r.type === 'LUNCH_IN' ? 'Retorno Almoço' : 'Saída Final'}: ${r.time}`).join(' | ');

        return {
          date: dateStr,
          punches: punchesText,
          worked: formatMinutesToTime(workedMin),
          expected: formatMinutesToTime(expectedDailyMinutes),
          balance: formatMinutesToTime(balanceMin),
          balanceRaw: balanceMin
        };
      }).sort((a, b) => a.date.localeCompare(b.date));

      const totalOvertimeMinutes = Math.max(0, totalWorkedMinutes - totalExpectedMinutes);

      return NextResponse.json({
        employee: {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          contractNumber: employee.contractNumber || 'Não Informado',
          workStart: employee.workStart,
          workEnd: employee.workEnd,
          lunchStart: employee.lunchStart,
          lunchEnd: employee.lunchEnd,
        },
        company: employee.company ? {
          name: employee.company.name,
          address: employee.company.address,
          number: employee.company.number,
          contact: employee.company.contact,
        } : null,
        team: employee.team ? {
          name: employee.team.name
        } : null,
        totalWorked: formatMinutesToTime(totalWorkedMinutes),
        totalExpected: formatMinutesToTime(totalExpectedMinutes),
        totalOvertime: formatMinutesToTime(totalOvertimeMinutes),
        records: detailsList
      });
    }

    return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });
  } catch (error) {
    console.error('Erro na API de Relatórios:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
