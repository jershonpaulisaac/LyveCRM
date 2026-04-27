"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function KPIStatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: number;
  hint: string;
  icon: React.ReactNode;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 420;
    const steps = 18;
    const timer = window.setInterval(() => {
      frame += 1;
      setDisplay(Math.round((value * frame) / steps));
      if (frame >= steps) {
        window.clearInterval(timer);
      }
    }, duration / steps);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <Card className="animate-rise overflow-hidden">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
          <div className="text-3xl font-semibold tracking-tight">{display}</div>
          <div className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/20 px-2.5 py-1 text-xs text-[var(--text-primary)]">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {hint}
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--surface)] p-3 text-[var(--text-primary)]">{icon}</div>
      </CardContent>
    </Card>
  );
}
