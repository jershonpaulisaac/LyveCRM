"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--text-primary)] text-white hover:-translate-y-0.5 hover:shadow-lg",
  secondary: "bg-[var(--accent)]/30 text-[var(--text-primary)] hover:-translate-y-0.5 hover:bg-[var(--accent)]/45",
  ghost: "bg-white text-[var(--text-primary)] hover:-translate-y-0.5 hover:bg-[var(--surface)]",
  danger: "bg-[#ef6f7c] text-white hover:-translate-y-0.5 hover:shadow-lg",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-transparent px-4 text-sm font-medium transition duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});
