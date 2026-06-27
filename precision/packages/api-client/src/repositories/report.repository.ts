import { http } from '../http';
import { ReportMonth, ReportsSummary } from '../models/employee.model';
import { EmployeeMapper } from '../mappers/employee.mapper';

export interface MonthlyReportsResponse {
  employee: {
    name: string;
    role: string;
  };
  reports: ReportMonth[];
  summary: ReportsSummary;
}

export class ReportRepository {
  async getMonthlyReports(): Promise<MonthlyReportsResponse> {
    const raw = await http.get<any>('/api/reports');
    return {
      employee: {
        name: raw.employee?.name || '',
        role: raw.employee?.role || '',
      },
      reports: (raw.reports || []).map(EmployeeMapper.toReportMonth),
      summary: EmployeeMapper.toReportsSummary(raw.summary || {}),
    };
  }
}
