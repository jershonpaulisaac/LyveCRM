"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
import { useCRM } from "@/components/providers/crm-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { getRouteForRole } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, session, ready, db } = useCRM();
  const accounts = useMemo(
    () =>
      db.users.map((user) => ({
        id: user.id,
        email: user.email,
        roleLabel: user.role.replaceAll("_", " "),
        name: user.name,
      })),
    [db.users],
  );
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const selectedEmail = accounts.some((account) => account.email === email) ? email : (accounts[0]?.email ?? "");

  useEffect(() => {
    if (ready && session) {
      router.replace(getRouteForRole(session.role));
    }
  }, [ready, router, session]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    try {
      const nextSession = login(selectedEmail);
      router.replace(getRouteForRole(nextSession.role));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to sign in.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(146,213,230,0.22),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f6fbfc_45%,#ffffff_100%)]" />
      <div className="surface-grid absolute inset-0 opacity-60" />

      <div className="pointer-events-none absolute left-1/2 top-18 h-24 w-24 -translate-x-[230px] rounded-[28px] border border-[var(--border)] bg-white/70 shadow-[var(--shadow-soft)] animate-[floatY_6s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute left-1/2 top-28 h-16 w-16 translate-x-[220px] rounded-[22px] border border-[var(--border)] bg-[var(--accent)]/20 animate-[floatY_5s_ease-in-out_infinite_0.6s]" />
      <div className="pointer-events-none absolute bottom-20 left-1/2 h-20 w-20 -translate-x-[280px] rounded-[26px] border border-[var(--border)] bg-white/75 animate-[floatY_7s_ease-in-out_infinite_0.3s]" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <div className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/88 px-4 py-2 text-sm text-[var(--text-secondary)] shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-[var(--accent-strong)]" />
          Multi-tenant CRM SaaS demo workspace
        </div>

        <Card className="animate-fade-in w-full rounded-[30px] border-white/80 bg-white/90 shadow-[0_24px_80px_rgba(34,34,59,0.14)] backdrop-blur">
          <CardContent className="p-8 md:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[var(--text-primary)] text-white shadow-lg transition duration-300 hover:-translate-y-0.5">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Sign in to LyveCRM</h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                Pick a demo account from the dropdown and jump into the platform owner, company admin, or employee workspace.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">Demo account</span>
                <Select value={selectedEmail} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-2xl">
                  {accounts.map((account) => (
                    <option key={account.id} value={account.email}>
                      {account.name} - {account.email}
                    </option>
                  ))}
                </Select>
              </label>

              {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}

              <Button type="submit" className="h-12 w-full justify-center rounded-2xl text-sm font-semibold">
                Continue to workspace
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </main>
  );
}
