import { http } from '../http';
import { Employee, TimeRecord, HistoryDay } from '../models/employee.model';
import { EmployeeMapper } from '../mappers/employee.mapper';

export interface TodayRecordsResponse {
  employee: Employee;
  records: TimeRecord[];
  incompleteDays: number;
  history: HistoryDay[];
  currentMonth: string;
  blockage?: {
    isBlocked: boolean;
    reason: string | null;
  };
}

export interface MutationResponse {
  success: boolean;
  records: TimeRecord[];
  error?: string;
}

export class EmployeeRepository {
  async getTodayRecords(): Promise<TodayRecordsResponse> {
    const raw = await http.get<any>('/api/records');
    return {
      employee: EmployeeMapper.toEmployee(raw.employee),
      records: (raw.records || []).map(EmployeeMapper.toTimeRecord),
      incompleteDays: raw.incompleteDays || 0,
      history: (raw.history || []).map(EmployeeMapper.toHistoryDay),
      currentMonth: raw.currentMonth || '',
      blockage: raw.blockage,
    };
  }

  async confirmEligibleRecords(date?: string): Promise<MutationResponse> {
    const raw = await http.post<any>('/api/records', { date });
    return {
      success: !!raw.success,
      records: (raw.records || []).map(EmployeeMapper.toTimeRecord),
      error: raw.error,
    };
  }

  async updateRecordTime(type: string, time: string, date?: string): Promise<MutationResponse> {
    const raw = await http.put<any>('/api/records', { type, time, date });
    return {
      success: !!raw.success,
      records: (raw.records || []).map(EmployeeMapper.toTimeRecord),
      error: raw.error,
    };
  }

  async getLocationInfo(): Promise<{ ip: string; city: string; region: string; country: string }> {
    const raw = await http.get<any>('/api/location');
    return {
      ip: raw.ip || '',
      city: raw.city || '',
      region: raw.region || '',
      country: raw.country || '',
    };
  }
}
