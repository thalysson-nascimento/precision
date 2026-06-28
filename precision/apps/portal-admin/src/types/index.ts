export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  workStart: string;
  lunchStart: string;
  lunchEnd: string;
  workEnd: string;
  createdAt: string;
}

export interface PendingRequest {
  id: string;
  employeeId: string;
  date: string;
  type: string;
  time: string | null;
  justification: string;
  attachment: string | null;
  status: string;
  createdAt: string;
  employee: Employee;
}

export interface MetricData {
  totalEmployees: number;
  totalEmployeesGrowth: string;
  presentNow: number;
  presentNowPercentage: string;
  pendingRequestsCount: number;
  overtimeHours: string;
  overtimeGrowth: string;
}

export interface WeeklyPresenceData {
  label: string;
  dayLabel: string;
  percentage: number;
}

export interface RecentActivity {
  id: string;
  employeeName: string;
  role: string;
  text: string;
  time: string;
  type: string;
  icon: string;
  iconBg: string;
  isLate: boolean;
}

export interface DashboardData {
  metrics: MetricData;
  weeklyPresence: WeeklyPresenceData[];
  recentActivities: RecentActivity[];
  pendingRequests: PendingRequest[];
}
