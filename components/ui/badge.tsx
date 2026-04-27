import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  const styles = {
    neutral: "bg-[var(--surface)] text-[var(--text-secondary)]",
    success: "bg-[var(--success)] text-[#285e37]",
    warning: "bg-[var(--warning)] text-[#8c6500]",
    danger: "bg-[var(--danger)] text-[#b42318]",
    info: "bg-[var(--accent)]/25 text-[var(--text-primary)]",
  };

  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", styles[variant])}>{children}</span>;
}
