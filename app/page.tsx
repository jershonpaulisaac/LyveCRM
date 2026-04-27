"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { getStoredSession, getRouteForRole } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const session = getStoredSession();
    router.replace(session ? getRouteForRole(session.role) : "/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="animate-rise flex items-center gap-3 rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm text-[var(--text-secondary)] shadow-[var(--shadow-soft)]">
        <LoaderCircle className="h-4 w-4 animate-spin text-[var(--accent-strong)]" />
        Preparing LyveCRM
      </div>
    </main>
  );
}
