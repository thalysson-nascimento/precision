export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  workStart: string;
  lunchStart: string;
  lunchEnd: string;
  workEnd: string;
}

export type TimeRecordType = 'IN' | 'LUNCH_OUT' | 'LUNCH_IN' | 'OUT';

export interface TimeRecord {
  id: string;
  employeeId: string;
  date: string;
  type: TimeRecordType;
  time: string;
  confirmed: boolean;
}

export interface HistoryDay {
  date: string;
  times: string[];
  isComplete: boolean;
}

export interface ReportMonth {
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
