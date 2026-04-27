"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Building2, LogOut, RefreshCcw, Shield, UserRoundCheck } from "lucide-react";
import { useCRM } from "@/components/providers/crm-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/platform", label: "Platform", icon: Shield, role: "platform_owner" },
  { href: "/company", label: "Company", icon: Building2, role: "company_admin" },
  { href: "/user", label: "My work", icon: UserRoundCheck, role: "user" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, logout, resetDemo } = useCRM();

  return (
    <div className="surface-grid min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 border-r border-[var(--border)] bg-white/85 p-6 backdrop-blur lg:flex lg:flex-col">
          <div className="mb-10 space-y-2">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--text-primary)] text-white">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">LyveCRM</h1>
              <p className="text-sm text-[var(--text-secondary)]">Multi-tenant CRM operations with role-isolated workspaces.</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const active = pathname.startsWith(item.href);
              const enabled = session?.role === item.role;
              if (!enabled) return null;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                    active
                      ? "border-[var(--accent-strong)] bg-[var(--accent)]/20 text-[var(--text-primary)]"
                      : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--surface)]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <div>
              <div className="text-sm font-semibold">{session?.name}</div>
              <div className="text-xs text-[var(--text-secondary)]">{session?.email}</div>
            </div>
            <Button variant="secondary" className="w-full justify-center" onClick={resetDemo}>
              <RefreshCcw className="h-4 w-4" />
              Reset demo
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-center border border-[var(--border)]"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
