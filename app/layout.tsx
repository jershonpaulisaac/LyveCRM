import type { Metadata } from "next";
import "./globals.css";
import { CRMProvider } from "@/components/providers/crm-provider";

export const metadata: Metadata = {
  title: "LyveCRM",
  description: "Multi-tenant CRM SaaS platform with platform, company, and user workspaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-[var(--bg)] text-[var(--text-primary)]" suppressHydrationWarning>
        <CRMProvider>{children}</CRMProvider>
      </body>
    </html>
  );
}
