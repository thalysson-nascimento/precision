import { EmployeeRepository, TodayRecordsResponse, MutationResponse } from '../repositories/employee.repository';

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async getTodayRecords(): Promise<TodayRecordsResponse> {
    return this.employeeRepository.getTodayRecords();
  }

  async confirmEligibleRecords(date?: string): Promise<MutationResponse> {
    return this.employeeRepository.confirmEligibleRecords(date);
  }

  async updateRecordTime(type: string, time: string, date?: string): Promise<MutationResponse> {
    return this.employeeRepository.updateRecordTime(type, time, date);
  }

  async getLocationInfo() {
    return this.employeeRepository.getLocationInfo();
  }
}
