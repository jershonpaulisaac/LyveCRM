"use client";

import { Activity, Building2, Shield, Users } from "lucide-react";
import { ActivityFeed } from "@/components/activity/activity-feed";
import { CompanyListTable } from "@/components/dashboards/company-list-table";
import { KPIStatCard } from "@/components/dashboards/kpi-stat-card";
import { useCRM } from "@/components/providers/crm-provider";

export default function PlatformDashboardPage() {
  const { db, session, scoped } = useCRM();

  if (!session || session.role !== "platform_owner" || !scoped) return null;

  return (
    <div className="space-y-6">
      <section className="animate-rise flex flex-col gap-3 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)]/20 px-3 py-1 text-sm text-[var(--text-primary)]">
          <Shield className="h-4 w-4" />
          Platform owner workspace
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Global SaaS control center</h1>
          <p className="max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            Track tenant health, overall adoption, and activity volume across the entire LyveCRM installation without stepping into private company data management.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPIStatCard label="Total Companies" value={db.companies.length} hint="Across all tenants" icon={<Building2 className="h-5 w-5" />} />
        <KPIStatCard label="Total Users" value={db.users.filter((user) => user.role !== "platform_owner").length} hint="Active company seats" icon={<Users className="h-5 w-5" />} />
        <KPIStatCard label="Total Customers" value={db.customers.length} hint="All company pipelines" icon={<Users className="h-5 w-5" />} />
        <KPIStatCard label="Activity Count" value={db.activityLogs.length} hint="System-wide events" icon={<Activity className="h-5 w-5" />} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CompanyListTable companies={db.companies} users={db.users} />
        <ActivityFeed title="Global activity" description="Live system actions across every company workspace." items={scoped.activityLogs.slice(0, 12)} />
      </section>
    </div>
  );
}
