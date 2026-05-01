"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Shield, Building2, Users, Lock } from "lucide-react";
import { useCRM } from "@/components/providers/crm-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRouteForRole } from "@/lib/auth";
import { motion } from "framer-motion";

type SelectedRole = "platform_owner" | "company_admin" | "user" | "";

export default function LoginPage() {
  const router = useRouter();
  const { login, session, ready, db } = useCRM();

  const [selectedRole, setSelectedRole] = useState<SelectedRole>("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const companies = useMemo(() => db.companies, [db.companies]);

  const filteredUsers = useMemo(() => {
    if (!selectedRole) return [];
    if (selectedRole === "platform_owner") {
      return db.users.filter((u) => u.role === "platform_owner");
    }
    if (selectedCompanyId) {
      return db.users.filter(
        (u) => u.companyId === selectedCompanyId && u.role === selectedRole
      );
    }
    return [];
  }, [db.users, selectedRole, selectedCompanyId]);

  useEffect(() => {
    setSelectedCompanyId("");
    setEmail("");
  }, [selectedRole]);

  useEffect(() => {
    setEmail("");
  }, [selectedCompanyId]);

  useEffect(() => {
    if (ready && session) {
      router.replace(getRouteForRole(session.role));
    }
  }, [ready, router, session]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;
    setError("");

    if (password !== "12345") {
      setError("Invalid password. Use 12345 for demo access.");
      return;
    }

    setLoading(true);
    try {
      login(email, rememberMe);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to sign in.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9] px-4 py-6">
      <div className="relative z-10 w-full max-w-lg">
        <Card className="rounded-[2rem] border border-slate-200 bg-white shadow-2xl overflow-hidden">
          <CardContent className="p-8">
          <div className="mx-auto mb-6 flex flex-col items-center gap-2">
          {/* Handshake Logo - Maintaining 2:1 ratio at a larger size for the login page */}
          <img src="/logo2.png" alt="LyveCRM" className="h-20 w-auto object-contain" />
  
          <p className="text-[#475569] mt-2 font-medium">
            Sign in to your isolated workspace
          </p>
        </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* --- STEP 1: ROLE (Always Enabled) --- */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Identity</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 transition-all"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as SelectedRole)}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="platform_owner">Platform Owner</option>
                    <option value="company_admin">Company Admin</option>
                    <option value="user">Regular User</option>
                  </select>
                </div>
              </div>

              {/* --- STEP 2: COMPANY (Disabled if no Role) --- */}
              <div className={selectedRole === "platform_owner" ? "hidden" : "space-y-2"}>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Organization</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    disabled={!selectedRole}
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    value={selectedCompanyId}
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    required={selectedRole !== "platform_owner"}
                  >
                    <option value="">Select Company</option>
                    {companies.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* --- STEP 3: ACCOUNT (Disabled if no Role/Company) --- */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Account</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    disabled={!selectedRole || (selectedRole !== "platform_owner" && !selectedCompanyId)}
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  >
                    <option value="">Select User ID</option>
                    {filteredUsers.map((u) => (
                      <option key={u.id} value={u.email}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* --- STEP 4: PASSWORD (Disabled if no Email) --- */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Security</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    disabled={!email}
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={email ? "Enter demo password" : "Select account first"}
                    required
                  />
                  <button
                    disabled={!email}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 disabled:hidden"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-500 font-semibold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

              <Button
                type="submit"
                disabled={!email || !password || loading}
                className="w-full h-14 bg-[#22223B] text-white rounded-2xl hover:bg-[#1a1a2e] text-lg font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                {loading ? "Authenticating..." : "Sign In to Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -4 }}
      onClick={() => router.push("/")}
      className="absolute left-8 top-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:bg-slate-50">
        <ArrowLeft className="h-4 w-4" />
      </div>
      <span className="antialiased tracking-tight">Back to home</span>
    </motion.button>
    </main>
    
  );
}