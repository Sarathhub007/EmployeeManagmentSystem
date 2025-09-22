export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'employee';
  avatar?: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  manager?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  managerId: string;
  employeeCount: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  totalHours?: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  overallRating: number;
  goals: string[];
  achievements: string[];
  areasForImprovement: string[];
  status: 'draft' | 'completed' | 'acknowledged';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}