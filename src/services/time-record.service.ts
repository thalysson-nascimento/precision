export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  role: string;
  workStart: string;
  lunchStart: string;
  lunchEnd: string;
  workEnd: string;
}

export interface TimeRecordData {
  id: string;
  employeeId: string;
  date: string;
  type: 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT';
  time: string;
  confirmed: boolean;
}

export interface HistoryDayData {
  date: string;
  times: string[];
  isComplete: boolean;
}

export interface GetRecordsResponse {
  employee: EmployeeData;
  records: TimeRecordData[];
  incompleteDays: number;
  history: HistoryDayData[];
  currentMonth: string;
}

export interface MutationResponse {
  success: boolean;
  records: TimeRecordData[];
  error?: string;
}

export interface ReportMonthData {
  monthKey: string;
  monthLabel: string;
  total: string;
  expected: string;
  totalOvertime: string;
  overtimeNro: string;
  maxDaily: string;
  standard: string;
  overtimeUpTo2: string;
  overtimeAfter2: string;
  overtimeSaturday: string;
  overtimeSunday: string;
}

export interface ReportsSummary {
  totalWorked: string;
  totalExpected: string;
  totalOvertime: string;
  totalOvertimeNro: string;
  totalUpTo2: string;
  totalAfter2: string;
  totalSaturday: string;
  totalSunday: string;
}

export interface GetReportsResponse {
  employee: {
    name: string;
    role: string;
  };
  reports: ReportMonthData[];
  summary: ReportsSummary;
}

export const timeRecordService = {
  /**
   * Busca as informações contratuais e os registros de hoje.
   */
  async getTodayRecords(): Promise<GetRecordsResponse> {
    const res = await fetch('/api/records');
    if (!res.ok) {
      throw new Error('Falha ao carregar registros do dia.');
    }
    return res.json();
  },

  /**
   * Confirma/registra automaticamente os pontos elegíveis do horário atual ou de uma data específica.
   */
  async confirmEligibleRecords(date?: string): Promise<MutationResponse> {
    const res = await fetch('/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    });
    if (!res.ok) {
      throw new Error('Falha ao registrar ponto.');
    }
    return res.json();
  },

  /**
   * Edita ou insere manualmente o horário de uma determinada marcação para um dia específico.
   */
  async updateRecordTime(type: string, time: string, date?: string): Promise<MutationResponse> {
    const res = await fetch('/api/records', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, time, date }),
    });
    if (!res.ok) {
      throw new Error('Falha ao atualizar ponto.');
    }
    return res.json();
  },

  /**
   * Busca os relatórios mensais agregados.
   */
  async getMonthlyReports(): Promise<GetReportsResponse> {
    const res = await fetch('/api/reports');
    if (!res.ok) {
      throw new Error('Falha ao carregar relatórios mensais.');
    }
    return res.json();
  },
};
