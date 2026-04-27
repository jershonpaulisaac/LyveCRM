export type Role = "platform_owner" | "company_admin" | "user";

export type CompanyStatus = "active" | "suspended";

export type CustomerStatus = "New" | "Contacted" | "Converted" | "Lost";

export type TaskStatus = "pending" | "in_progress" | "done";

export type ActivityType =
  | "customer_added"
  | "customer_updated"
  | "customer_deleted"
  | "task_created"
  | "task_completed"
  | "task_updated"
  | "followup_updated"
  | "user_created";

export interface Company {
  id: string;
  name: string;
  status: CompanyStatus;
  adminId: string;
  industry: string;
}

export interface User {
  id: string;
  companyId: string;
  name: string;
  email: string;
  role: Role;
  title: string;
}

export interface Customer {
  id: string;
  companyId: string;
  assignedUserId: string;
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  followUpDate: string;
  notes: string;
  createdAt: string;
}

export interface Task {
  id: string;
  companyId: string;
  customerId: string;
  assignedUserId: string;
  title: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  companyId: string;
  userId: string;
  actorName: string;
  type: ActivityType;
  description: string;
  timestamp: string;
}

export interface SessionUser {
  id: string;
  role: Role;
  companyId: string | null;
  name: string;
  email: string;
}

export interface MockDb {
  companies: Company[];
  users: User[];
  customers: Customer[];
  tasks: Task[];
  activityLogs: ActivityLog[];
}

export interface CustomerInput {
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  followUpDate: string;
  notes: string;
  assignedUserId: string;
}

export interface TaskInput {
  title: string;
  assignedUserId: string;
  customerId: string;
  dueDate: string;
}

export interface UserInput {
  name: string;
  email: string;
  title: string;
}
