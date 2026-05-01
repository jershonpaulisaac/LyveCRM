"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Customer Management",
    description: "Organize contacts, companies, and activity in one clear view.",
    icon: Users,
  },
  {
    title: "Task Tracking",
    description: "Build follow-ups and stay on top of every next step.",
    icon: ClipboardList,
  },
  {
    title: "Real-time Activity",
    description: "See actions and changes as they happen across your team.",
    icon: BarChart3,
  },
];

export default function HomePage() {
  const [isLoaded] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9] font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-[#e2e8f0]/50 bg-white/80 backdrop-blur-sm">
  <div className="mx-auto max-w-7xl px-2 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image 
          src="/logo1.png" 
          alt="LyveCRM" 
          width={140} 
          height={60}
          className="h-11 w-auto object-contain" 
          priority
        />
      </div>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-tight text-[#22223B] lg:text-6xl">
                  Manage Customers.
                  <br />
                  Track Everything.
                  <br />
                  <span className="text-[#92D5E6]">Effortlessly.</span>
                </h1>
                <p className="text-xl leading-relaxed text-[#4A4E69] max-w-lg">
                  LyveCRM helps teams manage customers, tasks, and follow-ups in one simple dashboard.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#22223B] px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-[#1a1a2e] hover:scale-105 hover:shadow-xl"
                >
                  Login to Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="relative">
                {/* Main Dashboard Card */}
                <div className="rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-3xl">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[#22223B]">Dashboard Overview</h3>
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#92D5E6]"></div>
                        <div className="h-3 w-3 rounded-full bg-[#D3F6DB]"></div>
                        <div className="h-3 w-3 rounded-full bg-[#4A4E69]"></div>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-2xl bg-gradient-to-br from-[#92D5E6]/10 to-[#92D5E6]/5 p-4 transition-all duration-200 hover:scale-105">
                        <div className="text-2xl font-bold text-[#22223B]">247</div>
                        <div className="text-sm text-[#4A4E69]">Customers</div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-[#D3F6DB]/10 to-[#D3F6DB]/5 p-4 transition-all duration-200 hover:scale-105">
                        <div className="text-2xl font-bold text-[#22223B]">89</div>
                        <div className="text-sm text-[#4A4E69]">Tasks</div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-[#4A4E69]/10 to-[#4A4E69]/5 p-4 transition-all duration-200 hover:scale-105">
                        <div className="text-2xl font-bold text-[#22223B]">12</div>
                        <div className="text-sm text-[#4A4E69]">Active</div>
                      </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-[#4A4E69]">Recent Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 rounded-lg bg-[#f8fafc] p-3 transition-all duration-200 hover:bg-[#f1f5f9]">
                          <div className="h-2 w-2 rounded-full bg-[#92D5E6]"></div>
                          <div className="flex-1 text-sm text-[#4A4E69]">New customer added</div>
                          <div className="text-xs text-[#4A4E69]">2m ago</div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-[#f8fafc] p-3 transition-all duration-200 hover:bg-[#f1f5f9]">
                          <div className="h-2 w-2 rounded-full bg-[#D3F6DB]"></div>
                          <div className="flex-1 text-sm text-[#4A4E69]">Task completed</div>
                          <div className="text-xs text-[#4A4E69]">5m ago</div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-[#f8fafc] p-3 transition-all duration-200 hover:bg-[#f1f5f9]">
                          <div className="h-2 w-2 rounded-full bg-[#4A4E69]"></div>
                          <div className="flex-1 text-sm text-[#4A4E69]">Follow-up scheduled</div>
                          <div className="text-xs text-[#4A4E69]">1h ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-[#92D5E6] opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-[#D3F6DB] opacity-30 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-[#22223B] lg:text-4xl">
              Everything you need to manage your business
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#92D5E6]/10 text-[#92D5E6] transition-all duration-200 group-hover:scale-110">
                  <feature.icon className="h-7 w-7" />
                </div>
                <div className="mb-4 flex-1">
                  <h3 className="mb-3 text-xl font-semibold text-[#22223B]">{feature.title}</h3>
                  <p className="text-[#4A4E69] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#f8fafc] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#22223B] lg:text-4xl">How LyveCRM works</h2>
            
          </div>

          <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[2rem] bg-white p-10 shadow-xl ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 text-left lg:w-1/3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92D5E6]/15 text-lg font-semibold text-[#0f4a65]">
                1
              </div>
              <div>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#92D5E6]/10 text-[#92D5E6]">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#22223B]">Add customers</h3>
                <p className="text-[#4A4E69]">Capture leads and company details in one place.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-left lg:w-1/3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92D5E6]/15 text-lg font-semibold text-[#0f4a65]">
                2
              </div>
              <div>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#92D5E6]/10 text-[#92D5E6]">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#22223B]">Assign tasks</h3>
                <p className="text-[#4A4E69]">Link customer work to the right people quickly.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-left lg:w-1/3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92D5E6]/15 text-lg font-semibold text-[#0f4a65]">
                3
              </div>
              <div>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#92D5E6]/10 text-[#92D5E6]">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#22223B]">Track progress</h3>
                <p className="text-[#4A4E69]">See updates and keep every deal moving forward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#22223B] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
            Start managing your business better
          </h2>
          <p className="mb-10 text-xl text-[#4A4E69]">
            Join thousands of teams already using LyveCRM to streamline their customer relationships.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-[#22223B] transition-all duration-200 hover:bg-[#f8fafc] hover:scale-105 hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0]/50 bg-white/50 px-6 py-12 backdrop-blur-sm lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image src="/logo.png" alt="LyveCRM" width={24} height={24} className="h-6 w-6 rounded-lg object-cover" />
            <span className="text-lg font-bold text-[#22223B]">LyveCRM</span>
          </div>
          <p className="text-[#4A4E69]">© 2024 LyveCRM. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
