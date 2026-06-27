import { Employee } from '../models/employee.model';
import { EmployeeRepository } from '../repositories/employee.repository';

export class AuthService {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async getCurrentUser(): Promise<Employee | null> {
    try {
      const data = await this.employeeRepository.getTodayRecords();
      return data.employee;
    } catch {
      return null;
    }
  }
}
