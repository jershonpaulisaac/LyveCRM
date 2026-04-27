"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#22223b]/30 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="animate-scale-in relative z-10 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-white shadow-[var(--shadow-soft)]">
        <div className="flex items-start justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description ? <p className="text-sm text-[var(--text-secondary)]">{description}</p> : null}
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] transition hover:bg-[var(--surface)] active:scale-[0.97]",
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
