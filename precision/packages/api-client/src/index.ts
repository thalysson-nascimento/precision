import { EmployeeRepository } from './repositories/employee.repository';
import { ReportRepository } from './repositories/report.repository';
import { EmployeeService } from './services/employee.service';
import { ReportService } from './services/report.service';
import { AuthService } from './services/auth.service';

export * from './models/employee.model';
export * from './mappers/employee.mapper';
export * from './repositories/employee.repository';
export * from './repositories/report.repository';
export * from './services/employee.service';
export * from './services/report.service';
export * from './services/auth.service';
export * from './http';

// Instanciar e exportar instâncias padrões para uso simplificado no app
const employeeRepository = new EmployeeRepository();
const reportRepository = new ReportRepository();

export const employeeService = new EmployeeService(employeeRepository);
export const reportService = new ReportService(reportRepository);
export const authService = new AuthService(employeeRepository);
