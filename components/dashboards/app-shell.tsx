"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, LogOut, RefreshCcw, Shield, UserRoundCheck } from "lucide-react";
import { useCRM } from "@/components/providers/crm-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      <div className="mx-auto flex h-screen w-full max-w-[1600px]">
        <aside className="hidden h-screen w-72 shrink-0 border-r border-[var(--border)] bg-white/85 p-6 backdrop-blur lg:flex lg:flex-col">
          <div className="mb-10">
            <div className="relative flex w-full flex-col items-center justify-center pt-10 pb-6">
              {/* Modern Glow Effect */}
              <div className="absolute top-8 h-20 w-20 rounded-full bg-cyan-100/30 blur-2xl" />

              {/* Handshake Logo with subtle interaction */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="relative z-10"
              >
                <img 
                  src="/logo2.png" 
                  alt="LyveCRM" 
                  className="h-14 w-auto object-contain" 
                />
              </motion.div>

              {/* Active Status Badge */}
              <div className="mt-4 flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-3 py-0.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600 antialiased">
                  System Active
                </span>
              </div>

              {/* Supporting Text */}
              <p className="mt-6 px-6 text-center text-xs leading-relaxed text-slate-400">
                Multi-tenant CRM operations with <br /> role-isolated workspaces.
              </p>
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

          {/* User Section - Refined Fonts & Glassmorphism */}
          <div className="mt-auto px-1">
            <div className="rounded-3xl border border-slate-200/60 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
              <div className="mb-5 px-1">
                <div className="text-sm font-semibold tracking-tight text-slate-900 antialiased">
                  {session?.name}
                </div>
                <div className="truncate text-[11px] font-medium text-slate-500 antialiased">
                  {session?.email}
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="secondary" 
                  className="h-11 w-full justify-center gap-2 rounded-xl bg-cyan-50/80 text-cyan-700 border-none hover:bg-cyan-100 transition-colors" 
                  onClick={resetDemo}
                >
                  <RefreshCcw className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold tracking-tight">Reset demo</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className="h-11 w-full justify-center gap-2 rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-red-600 hover:border-red-100"
                  onClick={() => {
                    logout();
                    router.replace("/login");
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold tracking-tight">Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#999cab]">
          {children}
        </main>
      </div>
    </div>
  );
}