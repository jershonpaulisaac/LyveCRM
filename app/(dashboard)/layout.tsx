"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell } from "@/components/dashboards/app-shell";
import { useCRM } from "@/components/providers/crm-provider";
import { getRouteForRole } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, session } = useCRM();

  useEffect(() => {
    if (!ready) return;
    if (!session) {
      router.replace("/login");
      return;
    }

    const allowedPath = getRouteForRole(session.role);
    if (!pathname.startsWith(allowedPath)) {
      router.replace(allowedPath);
    }
  }, [pathname, ready, router, session]);

  if (!ready || !session) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="w-full max-w-md space-y-3 px-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
