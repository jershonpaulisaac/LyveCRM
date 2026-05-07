"use client";

import {
  CheckCircle2,
  ListTodo,
  Users,
  UserSquare2,
} from "lucide-react";

import { ActivityFeed } from "@/components/activity/activity-feed";
import { KPIStatCard } from "@/components/dashboards/kpi-stat-card";
import { TaskList } from "@/components/dashboards/task-list";
import { useCRM } from "@/components/providers/crm-provider";
import { CustomerTable } from "@/components/tables/customer-table";
import { UserTable } from "@/components/tables/user-table";

export default function CompanyDashboardPage() {
  const {
    session,
    scoped,
    createCustomer,
    editCustomer,
    removeCustomer,
    createTask,
    changeTaskStatus,
    createUser,
    removeUser,
  } = useCRM();

  // ❗ IMPORTANT: render fallback instead of null (better for tests)
  if (!session || session.role !== "company_admin" || !scoped) {
    return (
      <div className="p-6 text-sm text-red-500" data-testid="access-denied">
        Access denied or loading...
      </div>
    );
  }

  const company = scoped.companies?.[0];

  const teamUsers = scoped.users.filter((u) => u.role === "user");

  const activeLeads = scoped.customers.filter(
    (c) => c.status === "New" || c.status === "Contacted"
  ).length;

  const tasksPending = scoped.tasks.filter(
    (t) => t.status !== "done"
  ).length;

  const tasksCompleted = scoped.tasks.filter(
    (t) => t.status === "done"
  ).length;

  return (
  <div data-testid="company-dashboard" className="space-y-6">
      
      {/* HEADER */}
      <section
        className="animate-rise flex flex-col gap-3 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8"
        data-testid="company-header"
      >
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-sm text-[var(--text-primary)]">
          <UserSquare2 className="h-4 w-4" />
          Company admin workspace
        </div>

        <div className="space-y-2">
          <h1
            className="text-3xl font-semibold tracking-tight"
            data-testid="dashboard-title"
          >
            Tenant-isolated CRM operations
          </h1>

          <p className="max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            Manage customers, assign tasks, add users, and track activity in real time.
          </p>

          {company && (
            <p
              className="text-sm font-medium text-[var(--text-primary)]"
              data-testid="company-name"
            >
              Company: {company.name}
            </p>
          )}
        </div>
      </section>

      {/* KPI */}
      <section
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        data-testid="kpi-section"
      >
        <KPIStatCard
          label="Total Customers"
          value={scoped.customers.length}
          hint="Your pipeline"
          icon={<Users className="h-5 w-5" />}
        />

        <KPIStatCard
          label="Active Leads"
          value={activeLeads}
          hint="New or contacted"
          icon={<Users className="h-5 w-5" />}
        />

        <KPIStatCard
          label="Tasks Pending"
          value={tasksPending}
          hint="Needs attention"
          icon={<ListTodo className="h-5 w-5" />}
        />

        <KPIStatCard
          label="Tasks Completed"
          value={tasksCompleted}
          hint="Completed work"
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
      </section>

      {/* CUSTOMER TABLE */}
      <section data-testid="customer-section">
        <CustomerTable
          title="Customer pipeline"
          description="Search, filter, edit, delete customers."
          customers={scoped.customers}
          users={teamUsers}
          canManage
          onCreate={createCustomer}
          onUpdate={editCustomer}
          onDelete={removeCustomer}
        />
      </section>

      {/* TASK + ACTIVITY */}
      <section
        className="grid gap-6 xl:grid-cols-[1fr_0.9fr]"
        data-testid="task-activity-section"
      >
        <TaskList
          title="Follow-up tasks"
          description="Track progress in real time"
          tasks={scoped.tasks}
          customers={scoped.customers}
          users={teamUsers}
          canCreate
          canUpdate
          onCreate={createTask}
          onStatusChange={changeTaskStatus}
        />

        <ActivityFeed
          title="Company activity"
          description="Live tenant activity stream"
          items={scoped.activityLogs.slice(0, 12)}
        />
      </section>

      {/* USERS */}
      <section data-testid="user-section">
        <UserTable
          users={scoped.users}
          canManage
          onCreate={createUser}
          onDelete={removeUser}
        />
      </section>
    </div>
  );
}