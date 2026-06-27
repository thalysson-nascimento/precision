import { Employee, TimeRecord, HistoryDay, ReportMonth, ReportsSummary } from '../models/employee.model';

export class EmployeeMapper {
  static toEmployee(raw: any): Employee {
    return {
      id: raw.id || '',
      name: raw.name || '',
      email: raw.email || '',
      role: raw.role || '',
      workStart: raw.workStart || '08:00',
      lunchStart: raw.lunchStart || '12:00',
      lunchEnd: raw.lunchEnd || '13:00',
      workEnd: raw.workEnd || '18:00',
    };
  }

  static toTimeRecord(raw: any): TimeRecord {
    return {
      id: raw.id || '',
      employeeId: raw.employeeId || '',
      date: raw.date || '',
      type: raw.type as any,
      time: raw.time || '',
      confirmed: !!raw.confirmed,
    };
  }

  static toHistoryDay(raw: any): HistoryDay {
    return {
      date: raw.date || '',
      times: Array.isArray(raw.times) ? raw.times : [],
      isComplete: !!raw.isComplete,
    };
  }

  static toReportMonth(raw: any): ReportMonth {
    return {
      monthKey: raw.monthKey || '',
      monthLabel: raw.monthLabel || '',
      total: raw.total || '00:00h',
      expected: raw.expected || '00:00h',
      totalOvertime: raw.totalOvertime || '00:00h',
      overtimeNro: raw.overtimeNro || '00:00h',
      maxDaily: raw.maxDaily || '02:00h',
      standard: raw.standard || '00:00h',
      overtimeUpTo2: raw.overtimeUpTo2 || '00:00h',
      overtimeAfter2: raw.overtimeAfter2 || '00:00h',
      overtimeSaturday: raw.overtimeSaturday || '00:00h',
      overtimeSunday: raw.overtimeSunday || '00:00h',
    };
  }

  static toReportsSummary(raw: any): ReportsSummary {
    return {
      totalWorked: raw.totalWorked || '00:00h',
      totalExpected: raw.totalExpected || '00:00h',
      totalOvertime: raw.totalOvertime || '00:00h',
      totalOvertimeNro: raw.totalOvertimeNro || '00:00h',
      totalUpTo2: raw.totalUpTo2 || '00:00h',
      totalAfter2: raw.totalAfter2 || '00:00h',
      totalSaturday: raw.totalSaturday || '00:00h',
      totalSunday: raw.totalSunday || '00:00h',
    };
  }
}
