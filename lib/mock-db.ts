import {
  ActivityLog,
  Company,
  Customer,
  CustomerInput,
  MockDb,
  SessionUser,
  Task,
  TaskInput,
  User,
  UserInput,
} from "@/lib/types";
import { makeId } from "@/lib/utils";

const companiesSeed: Company[] = [
  { id: "company_aurora", name: "Company A", status: "active", adminId: "user_admin_aurora", industry: "Fintech" },
  { id: "company_northstar", name: "Company B", status: "active", adminId: "user_admin_northstar", industry: "Healthcare" },
  { id: "company_summit", name: "Company C", status: "suspended", adminId: "user_admin_summit", industry: "Operations" },
];

const usersSeed: User[] = [
  { id: "owner_lyve", companyId: "", name: "Avery Chen", email: "owner@lyvecrm.app", role: "platform_owner", title: "Platform Owner" },
  { id: "user_admin_aurora", companyId: "company_aurora", name: "Nina Patel", email: "admin@aurora.test", role: "company_admin", title: "CRM Administrator" },
  { id: "user_exec_aurora_1", companyId: "company_aurora", name: "Rahul Mehta", email: "rahul@aurora.test", role: "user", title: "Account Executive" },
  { id: "user_exec_aurora_2", companyId: "company_aurora", name: "Sara Kim", email: "sara@aurora.test", role: "user", title: "Growth Associate" },
  { id: "user_admin_northstar", companyId: "company_northstar", name: "Maya Singh", email: "admin@northstar.test", role: "company_admin", title: "Sales Director" },
  { id: "user_exec_northstar_1", companyId: "company_northstar", name: "Leo Morgan", email: "leo@northstar.test", role: "user", title: "Success Manager" },
  { id: "user_admin_summit", companyId: "company_summit", name: "Chris Park", email: "admin@summit.test", role: "company_admin", title: "Operations Lead" },
];

const customersSeed: Customer[] = [
  {
    id: "customer_1",
    companyId: "company_aurora",
    assignedUserId: "user_exec_aurora_1",
    name: "Priya Shah",
    email: "priya@greenframe.io",
    phone: "+91 98765 11001",
    status: "New",
    followUpDate: "2026-04-29",
    notes: "Requested pricing details for the growth plan.",
    createdAt: "2026-04-20T09:15:00.000Z",
  },
  {
    id: "customer_2",
    companyId: "company_aurora",
    assignedUserId: "user_exec_aurora_2",
    name: "Jonas Becker",
    email: "jonas@altgrid.de",
    phone: "+49 1512 003211",
    status: "Contacted",
    followUpDate: "2026-05-01",
    notes: "Interested in team workflows and analytics export.",
    createdAt: "2026-04-18T12:05:00.000Z",
  },
  {
    id: "customer_3",
    companyId: "company_northstar",
    assignedUserId: "user_exec_northstar_1",
    name: "Elena Ruiz",
    email: "elena@carelane.com",
    phone: "+34 661 880 234",
    status: "Converted",
    followUpDate: "2026-04-30",
    notes: "Closed on annual contract, onboarding scheduled.",
    createdAt: "2026-04-12T08:30:00.000Z",
  },
  {
    id: "customer_4",
    companyId: "company_aurora",
    assignedUserId: "user_exec_aurora_1",
    name: "Marcus Bell",
    email: "marcus@pilotforge.ai",
    phone: "+1 415 555 0192",
    status: "Lost",
    followUpDate: "2026-05-04",
    notes: "Budget freeze until Q3.",
    createdAt: "2026-04-11T16:25:00.000Z",
  },
];

const tasksSeed: Task[] = [
  {
    id: "task_1",
    companyId: "company_aurora",
    customerId: "customer_1",
    assignedUserId: "user_exec_aurora_1",
    title: "Send growth tier proposal",
    status: "pending",
    dueDate: "2026-04-28",
    createdAt: "2026-04-23T09:00:00.000Z",
  },
  {
    id: "task_2",
    companyId: "company_aurora",
    customerId: "customer_2",
    assignedUserId: "user_exec_aurora_2",
    title: "Schedule qualification call",
    status: "in_progress",
    dueDate: "2026-04-29",
    createdAt: "2026-04-24T10:45:00.000Z",
  },
  {
    id: "task_3",
    companyId: "company_northstar",
    customerId: "customer_3",
    assignedUserId: "user_exec_northstar_1",
    title: "Confirm onboarding checklist",
    status: "done",
    dueDate: "2026-04-26",
    createdAt: "2026-04-19T11:20:00.000Z",
  },
];

const activityLogsSeed: ActivityLog[] = [
  {
    id: "activity_1",
    companyId: "company_aurora",
    userId: "user_admin_aurora",
    actorName: "Nina Patel",
    type: "task_created",
    description: "Created a follow-up task for Priya Shah.",
    timestamp: "2026-04-24T10:10:00.000Z",
  },
  {
    id: "activity_2",
    companyId: "company_northstar",
    userId: "user_exec_northstar_1",
    actorName: "Leo Morgan",
    type: "task_completed",
    description: "Marked onboarding checklist as complete.",
    timestamp: "2026-04-25T16:05:00.000Z",
  },
  {
    id: "activity_3",
    companyId: "company_aurora",
    userId: "user_exec_aurora_2",
    actorName: "Sara Kim",
    type: "followup_updated",
    description: "Updated follow-up date for Jonas Becker.",
    timestamp: "2026-04-26T07:55:00.000Z",
  },
];

export const companies = companiesSeed;
export const users = usersSeed;
export const customers = customersSeed;
export const tasks = tasksSeed;
export const activityLogs = activityLogsSeed;

export function createSeedDb(): MockDb {
  return structuredClone({
    companies: companiesSeed,
    users: usersSeed,
    customers: customersSeed,
    tasks: tasksSeed,
    activityLogs: activityLogsSeed,
  });
}

export function getVisibleCompanies(db: MockDb, session: SessionUser) {
  if (session.role === "platform_owner") return db.companies;
  if (!session.companyId) return [];
  return db.companies.filter((company) => company.id === session.companyId);
}

export function getVisibleUsers(db: MockDb, session: SessionUser) {
  if (session.role === "platform_owner") return db.users.filter((user) => user.role !== "platform_owner");
  if (session.role === "company_admin") return db.users.filter((user) => user.companyId === session.companyId);
  return db.users.filter((user) => user.id === session.id);
}

export function getVisibleCustomers(db: MockDb, session: SessionUser) {
  if (session.role === "platform_owner") return db.customers;
  if (session.role === "company_admin") return db.customers.filter((customer) => customer.companyId === session.companyId);
  return db.customers.filter((customer) => customer.assignedUserId === session.id);
}

export function getVisibleTasks(db: MockDb, session: SessionUser) {
  if (session.role === "platform_owner") return db.tasks;
  if (session.role === "company_admin") return db.tasks.filter((task) => task.companyId === session.companyId);
  return db.tasks.filter((task) => task.assignedUserId === session.id);
}

export function getVisibleActivity(db: MockDb, session: SessionUser) {
  if (session.role === "platform_owner") return [...db.activityLogs].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  if (session.role === "company_admin") {
    return db.activityLogs
      .filter((log) => log.companyId === session.companyId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }
  return db.activityLogs
    .filter((log) => log.userId === session.id)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

function pushActivity(db: MockDb, log: Omit<ActivityLog, "id" | "timestamp">) {
  db.activityLogs.unshift({
    id: makeId("activity"),
    timestamp: new Date().toISOString(),
    ...log,
  });
}

function ensureCompanyScope(session: SessionUser, companyId: string) {
  if (session.role === "platform_owner") {
    throw new Error("Platform owner cannot manage company CRM data.");
  }
  if (session.companyId !== companyId) {
    throw new Error("Company scope violation.");
  }
}

export function addCustomer(db: MockDb, session: SessionUser, input: CustomerInput) {
  ensureCompanyScope(session, session.companyId ?? "");

  const customer: Customer = {
    id: makeId("customer"),
    companyId: session.companyId ?? "",
    createdAt: new Date().toISOString(),
    ...input,
  };

  db.customers.unshift(customer);
  pushActivity(db, {
    companyId: customer.companyId,
    userId: session.id,
    actorName: session.name,
    type: "customer_added",
    description: `Added customer ${customer.name}.`,
  });
  return customer;
}

export function updateCustomer(db: MockDb, session: SessionUser, customerId: string, input: Partial<CustomerInput>) {
  const customer = db.customers.find((entry) => entry.id === customerId);
  if (!customer) throw new Error("Customer not found.");
  ensureCompanyScope(session, customer.companyId);
  if (session.role === "user" && customer.assignedUserId !== session.id) {
    throw new Error("User cannot edit unassigned customer.");
  }

  Object.assign(customer, input);
  pushActivity(db, {
    companyId: customer.companyId,
    userId: session.id,
    actorName: session.name,
    type: input.followUpDate ? "followup_updated" : "customer_updated",
    description: `Updated ${customer.name}.`,
  });
  return customer;
}

export function deleteCustomer(db: MockDb, session: SessionUser, customerId: string) {
  const customerIndex = db.customers.findIndex((entry) => entry.id === customerId);
  if (customerIndex === -1) throw new Error("Customer not found.");

  const customer = db.customers[customerIndex];
  ensureCompanyScope(session, customer.companyId);

  db.customers.splice(customerIndex, 1);
  db.tasks = db.tasks.filter((task) => task.customerId !== customer.id);
  pushActivity(db, {
    companyId: customer.companyId,
    userId: session.id,
    actorName: session.name,
    type: "customer_deleted",
    description: `Deleted customer ${customer.name}.`,
  });
}

export function addTask(db: MockDb, session: SessionUser, input: TaskInput) {
  ensureCompanyScope(session, session.companyId ?? "");

  const task: Task = {
    id: makeId("task"),
    companyId: session.companyId ?? "",
    customerId: input.customerId,
    assignedUserId: input.assignedUserId,
    title: input.title,
    dueDate: input.dueDate,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  db.tasks.unshift(task);
  pushActivity(db, {
    companyId: task.companyId,
    userId: session.id,
    actorName: session.name,
    type: "task_created",
    description: `Created task ${task.title}.`,
  });
  return task;
}

export function updateTaskStatus(db: MockDb, session: SessionUser, taskId: string, status: Task["status"]) {
  const task = db.tasks.find((entry) => entry.id === taskId);
  if (!task) throw new Error("Task not found.");
  ensureCompanyScope(session, task.companyId);
  if (session.role === "user" && task.assignedUserId !== session.id) {
    throw new Error("User cannot update unassigned task.");
  }

  task.status = status;
  pushActivity(db, {
    companyId: task.companyId,
    userId: session.id,
    actorName: session.name,
    type: status === "done" ? "task_completed" : "task_updated",
    description: `${status === "done" ? "Completed" : "Updated"} task ${task.title}.`,
  });
  return task;
}

export function addCompanyUser(db: MockDb, session: SessionUser, input: UserInput) {
  ensureCompanyScope(session, session.companyId ?? "");
  if (session.role !== "company_admin") throw new Error("Only company admins can create users.");

  const user: User = {
    id: makeId("user"),
    companyId: session.companyId ?? "",
    name: input.name,
    email: input.email,
    title: input.title,
    role: "user",
  };

  db.users.push(user);
  pushActivity(db, {
    companyId: user.companyId,
    userId: session.id,
    actorName: session.name,
    type: "user_created",
    description: `Created user ${user.name}.`,
  });
  return user;
}

export function simulateRealtimeUpdate(db: MockDb) {
  const activeCompanies = db.companies.filter((company) => company.status === "active");
  const company = activeCompanies[Math.floor(Math.random() * activeCompanies.length)];
  const companyUsers = db.users.filter((user) => user.companyId === company.id && user.role !== "company_admin");
  const actor = companyUsers[Math.floor(Math.random() * companyUsers.length)] ?? db.users.find((user) => user.id === company.adminId);
  const companyCustomers = db.customers.filter((customer) => customer.companyId === company.id);
  const companyTasks = db.tasks.filter((task) => task.companyId === company.id && task.status !== "done");

  const eventType = ["customer_added", "task_created", "task_completed", "followup_updated"][Math.floor(Math.random() * 4)];

  if (eventType === "customer_added" && actor) {
    const sourceNames = ["Aria Labs", "Kite Bridge", "Copper Oak", "Able Ridge"];
    const name = `${sourceNames[Math.floor(Math.random() * sourceNames.length)]} ${Math.floor(Math.random() * 90 + 10)}`;
    db.customers.unshift({
      id: makeId("customer"),
      companyId: company.id,
      assignedUserId: actor.id,
      name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@prospect.io`,
      phone: `+1 555 ${Math.floor(Math.random() * 9000 + 1000)}`,
      status: "New",
      followUpDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
      notes: "Auto-simulated prospect from inbound lead capture.",
      createdAt: new Date().toISOString(),
    });
    pushActivity(db, {
      companyId: company.id,
      userId: actor.id,
      actorName: actor.name,
      type: "customer_added",
      description: `Added customer ${name} from live lead intake.`,
    });
    return;
  }

  if (eventType === "task_created" && actor && companyCustomers[0]) {
    const customer = companyCustomers[Math.floor(Math.random() * companyCustomers.length)];
    db.tasks.unshift({
      id: makeId("task"),
      companyId: company.id,
      customerId: customer.id,
      assignedUserId: actor.id,
      title: `Follow up with ${customer.name}`,
      status: "pending",
      dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
    });
    pushActivity(db, {
      companyId: company.id,
      userId: actor.id,
      actorName: actor.name,
      type: "task_created",
      description: `Created a new follow-up for ${customer.name}.`,
    });
    return;
  }

  if (eventType === "task_completed" && actor && companyTasks[0]) {
    const task = companyTasks[Math.floor(Math.random() * companyTasks.length)];
    task.status = "done";
    pushActivity(db, {
      companyId: company.id,
      userId: actor.id,
      actorName: actor.name,
      type: "task_completed",
      description: `Completed task ${task.title}.`,
    });
    return;
  }

  if (actor && companyCustomers[0]) {
    const customer = companyCustomers[Math.floor(Math.random() * companyCustomers.length)];
    customer.followUpDate = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
    pushActivity(db, {
      companyId: company.id,
      userId: actor.id,
      actorName: actor.name,
      type: "followup_updated",
      description: `Moved follow-up date for ${customer.name}.`,
    });
  }
}
