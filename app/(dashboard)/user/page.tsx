"use client";

import { BriefcaseBusiness, CheckCircle2, Clock3, UserRoundCheck } from "lucide-react";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { KPIStatCard } from "@/components/dashboards/kpi-stat-card";
import { TaskList } from "@/components/dashboards/task-list";
import { useCRM } from "@/components/providers/crm-provider";
import { CustomerTable } from "@/components/tables/customer-table";

export default function UserDashboardPage() {
  const { session, scoped, changeTaskStatus } = useCRM();

  if (!session || session.role !== "user" || !scoped) return null;

  const company = scoped.companies[0];
  const pendingTasks = scoped.tasks.filter((task) => task.status !== "done").length;
  const completedTasks = scoped.tasks.filter((task) => task.status === "done").length;

  return (
    <div className="space-y-6">
      <section className="animate-rise flex flex-col gap-3 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-sm text-[var(--text-primary)]">
          <UserRoundCheck className="h-4 w-4" />
          Employee workspace
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Assigned work, without the noise</h1>
          <p className="max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            Employees only see the customers and tasks assigned to them, plus their own activity timeline inside the company workspace.
          </p>
          {company ? <p className="text-sm font-medium text-[var(--text-primary)]">Company: {company.name}</p> : null}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <KPIStatCard label="My Customers" value={scoped.customers.length} hint="Assigned accounts" icon={<BriefcaseBusiness className="h-5 w-5" />} />
        <KPIStatCard label="Open Tasks" value={pendingTasks} hint="Ready for action" icon={<Clock3 className="h-5 w-5" />} />
        <KPIStatCard label="Completed" value={completedTasks} hint="Closed by you" icon={<CheckCircle2 className="h-5 w-5" />} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <TaskList
          title="My tasks"
          description="Update statuses on your assigned tasks only."
          tasks={scoped.tasks}
          customers={scoped.customers}
          users={scoped.users}
          canCreate={false}
          canUpdate
          onCreate={() => undefined}
          onStatusChange={changeTaskStatus}
        />
        <ActivityFeed title="My timeline" description="A personal view of updates you triggered." items={scoped.activityLogs.slice(0, 12)} />
      </section>

      <CustomerTable
        title="Assigned customers"
        description="Your visible customer set is limited to accounts assigned to you."
        customers={scoped.customers}
        users={scoped.users}
        canManage={false}
        onCreate={() => undefined}
        onUpdate={() => undefined}
      />
    </div>
  );
}
