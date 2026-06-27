import { ReportRepository, MonthlyReportsResponse } from '../repositories/report.repository';

export class ReportService {
  private reportRepository: ReportRepository;

  constructor(reportRepository: ReportRepository) {
    this.reportRepository = reportRepository;
  }

  async getMonthlyReports(): Promise<MonthlyReportsResponse> {
    return this.reportRepository.getMonthlyReports();
  }
}
