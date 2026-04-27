"use client";

import { CheckCircle2, ListTodo, Users, UserSquare2 } from "lucide-react";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { KPIStatCard } from "@/components/dashboards/kpi-stat-card";
import { TaskList } from "@/components/dashboards/task-list";
import { useCRM } from "@/components/providers/crm-provider";
import { CustomerTable } from "@/components/tables/customer-table";
import { UserTable } from "@/components/tables/user-table";

export default function CompanyDashboardPage() {
  const { session, scoped, createCustomer, editCustomer, removeCustomer, createTask, changeTaskStatus, createUser } = useCRM();

  if (!session || session.role !== "company_admin" || !scoped) return null;

  const company = scoped.companies[0];
  const teamUsers = scoped.users.filter((user) => user.role === "user");
  const activeLeads = scoped.customers.filter((customer) => customer.status === "New" || customer.status === "Contacted").length;
  const tasksPending = scoped.tasks.filter((task) => task.status !== "done").length;
  const tasksCompleted = scoped.tasks.filter((task) => task.status === "done").length;

  return (
    <div className="space-y-6">
      <section className="animate-rise flex flex-col gap-3 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-sm text-[var(--text-primary)]">
          <UserSquare2 className="h-4 w-4" />
          Company admin workspace
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Tenant-isolated CRM operations</h1>
          <p className="max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            Manage customers, assign follow-up tasks, add employees, and monitor company-specific activity without exposing anything from other tenants.
          </p>
          {company ? <p className="text-sm font-medium text-[var(--text-primary)]">Company: {company.name}</p> : null}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPIStatCard label="Total Customers" value={scoped.customers.length} hint="Your company pipeline" icon={<Users className="h-5 w-5" />} />
        <KPIStatCard label="Active Leads" value={activeLeads} hint="New or contacted" icon={<Users className="h-5 w-5" />} />
        <KPIStatCard label="Tasks Pending" value={tasksPending} hint="Needs attention" icon={<ListTodo className="h-5 w-5" />} />
        <KPIStatCard label="Tasks Completed" value={tasksCompleted} hint="Recent team wins" icon={<CheckCircle2 className="h-5 w-5" />} />
      </section>

      <CustomerTable
        title="Customer pipeline"
        description="Search, filter, edit, and delete customers within your company scope."
        customers={scoped.customers}
        users={teamUsers}
        canManage
        onCreate={createCustomer}
        onUpdate={editCustomer}
        onDelete={removeCustomer}
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <TaskList
          title="Follow-up tasks"
          description="Assign next actions and track progress as statuses change in real time."
          tasks={scoped.tasks}
          customers={scoped.customers}
          users={teamUsers}
          canCreate
          canUpdate
          onCreate={createTask}
          onStatusChange={changeTaskStatus}
        />
        <ActivityFeed title="Company activity" description="Events visible only inside this tenant workspace." items={scoped.activityLogs.slice(0, 12)} />
      </section>

      <UserTable users={scoped.users} canManage onCreate={createUser} />
    </div>
  );
}
