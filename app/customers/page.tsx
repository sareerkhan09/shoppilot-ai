"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

type CustomerStatus = "VIP" | "Repeat Customer" | "New Customer" | "Churn Risk" | "Inactive";
type FilterKey = "All" | "VIP" | "Repeat" | "New" | "High Value" | "Inactive" | "Churn Risk";

interface Customer {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  ordersCount: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrderDate: string;
  ltv: number;
  aiScore: number;
  status: CustomerStatus;
  isHighValue: boolean;
  isNew: boolean;
}

interface AIInsight {
  id: string;
  customerName: string;
  headline: string;
  detail: string;
  tone: "positive" | "warning" | "opportunity";
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Amara Whitfield",
    email: "amara.w@gmail.com",
    avatarColor: "from-amber-600 to-amber-900",
    ordersCount: 14,
    totalSpent: 2840.5,
    avgOrderValue: 202.89,
    lastOrderDate: "2026-07-19T14:32:00Z",
    ltv: 3620.0,
    aiScore: 96,
    status: "VIP",
    isHighValue: true,
    isNew: false,
  },
  {
    id: "2",
    name: "Julian Cross",
    email: "julian.cross@outlook.com",
    avatarColor: "from-zinc-600 to-zinc-900",
    ordersCount: 2,
    totalSpent: 118.99,
    avgOrderValue: 59.5,
    lastOrderDate: "2026-07-19T11:05:00Z",
    ltv: 210.0,
    aiScore: 72,
    status: "New Customer",
    isHighValue: false,
    isNew: true,
  },
  {
    id: "3",
    name: "Naomi Vasquez",
    email: "naomi.v@icloud.com",
    avatarColor: "from-rose-700 to-rose-950",
    ordersCount: 9,
    totalSpent: 1612.0,
    avgOrderValue: 179.11,
    lastOrderDate: "2026-07-18T20:47:00Z",
    ltv: 1980.0,
    aiScore: 88,
    status: "Repeat Customer",
    isHighValue: true,
    isNew: false,
  },
  {
    id: "4",
    name: "Theo Marchetti",
    email: "theo.m@proton.me",
    avatarColor: "from-blue-700 to-blue-950",
    ordersCount: 6,
    totalSpent: 428.75,
    avgOrderValue: 71.46,
    lastOrderDate: "2026-05-02T09:14:00Z",
    ltv: 460.0,
    aiScore: 41,
    status: "Churn Risk",
    isHighValue: false,
    isNew: false,
  },
  {
    id: "5",
    name: "Priya Nandakumar",
    email: "priya.n@yahoo.com",
    avatarColor: "from-emerald-700 to-emerald-950",
    ordersCount: 11,
    totalSpent: 1949.2,
    avgOrderValue: 177.2,
    lastOrderDate: "2026-07-17T16:58:00Z",
    ltv: 2340.0,
    aiScore: 91,
    status: "VIP",
    isHighValue: true,
    isNew: false,
  },
  {
    id: "6",
    name: "Elias Brennan",
    email: "elias.brennan@gmail.com",
    avatarColor: "from-stone-600 to-stone-900",
    ordersCount: 1,
    totalSpent: 42.0,
    avgOrderValue: 42.0,
    lastOrderDate: "2026-07-17T08:21:00Z",
    ltv: 60.0,
    aiScore: 58,
    status: "New Customer",
    isHighValue: false,
    isNew: true,
  },
  {
    id: "7",
    name: "Sofia Lindqvist",
    email: "sofia.l@hotmail.com",
    avatarColor: "from-orange-700 to-orange-950",
    ordersCount: 8,
    totalSpent: 1391.4,
    avgOrderValue: 173.93,
    lastOrderDate: "2026-07-16T19:03:00Z",
    ltv: 1620.0,
    aiScore: 84,
    status: "Repeat Customer",
    isHighValue: true,
    isNew: false,
  },
  {
    id: "8",
    name: "Marcus Delaney",
    email: "marcus.d@icloud.com",
    avatarColor: "from-red-800 to-neutral-950",
    ordersCount: 3,
    totalSpent: 210.0,
    avgOrderValue: 70.0,
    lastOrderDate: "2026-03-11T12:00:00Z",
    ltv: 210.0,
    aiScore: 19,
    status: "Inactive",
    isHighValue: false,
    isNew: false,
  },
];

const AI_INSIGHTS: AIInsight[] = [
  {
    id: "1",
    customerName: "Amara Whitfield",
    headline: "Customer likely to purchase again",
    detail: "Recommend WhatsApp campaign within 3 days.",
    tone: "positive",
  },
  {
    id: "2",
    customerName: "Priya Nandakumar",
    headline: "High LTV customer",
    detail: "Recommend email campaign with early access offer.",
    tone: "opportunity",
  },
  {
    id: "3",
    customerName: "Theo Marchetti",
    headline: "Customer inactive for 60 days",
    detail: "Churn risk rising. Consider a win-back discount.",
    tone: "warning",
  },
  {
    id: "4",
    customerName: "Naomi Vasquez",
    headline: "Upsell opportunity detected",
    detail: "Frequently buys wallets. Suggest matching belt bundle.",
    tone: "opportunity",
  },
  {
    id: "5",
    customerName: "Sofia Lindqvist",
    headline: "Bundle recommendation",
    detail: "Pairs well with a travel accessories bundle offer.",
    tone: "positive",
  },
  {
    id: "6",
    customerName: "Marcus Delaney",
    headline: "VIP retention opportunity",
    detail: "Once high-value, now inactive. Reach out personally.",
    tone: "warning",
  },
];

const FILTERS: FilterKey[] = ["All", "VIP", "Repeat", "New", "High Value", "Inactive", "Churn Risk"];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isWithinDays(iso: string, days: number) {
  const diff = Date.now() - new Date(iso).getTime();
  return diff / (1000 * 60 * 60 * 24) <= days;
}

function getAIScoreTier(score: number): { label: string; classes: string } {
  if (score >= 95) {
    return { label: "Excellent", classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
  }
  if (score >= 80) {
    return { label: "Good", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
  }
  return { label: "Needs Attention", classes: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
}

function AIScoreBadge({ score }: { score: number }) {
  const tier = getAIScoreTier(score);
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${tier.classes}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {score}
      </span>
      <span className="text-[10px] text-zinc-500">{tier.label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: CustomerStatus }) {
  const styles: Record<CustomerStatus, string> = {
    VIP: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Repeat Customer": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "New Customer": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Churn Risk": "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Inactive: "bg-white/5 text-zinc-400 border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:border-amber-500/30 hover:from-white/[0.06]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl transition-all duration-500 group-hover:bg-amber-500/10" />
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Avatar({ name, colorClass, size = 10 }: { name: string; colorClass: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizeClass = size === 8 ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} font-semibold text-white shadow-inner ${sizeClass}`}
    >
      {initials}
    </div>
  );
}

function InsightIcon({ tone }: { tone: AIInsight["tone"] }) {
  const colors: Record<AIInsight["tone"], string> = {
    positive: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    opportunity: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  };
  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${colors[tone]}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  );
}

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    const loadEmail = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (isMounted) {
          setEmail(user?.email ?? undefined);
        }
      } catch (error) {
        console.error("Failed to load user email:", error);
      }
    };

    loadEmail();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out failed:", error);
      window.location.href = "/login";
    }
  };

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MOCK_CUSTOMERS.filter((customer) => {
      const matchesSearch =
        query.length === 0 ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      switch (activeFilter) {
        case "All":
          return true;
        case "VIP":
          return customer.status === "VIP";
        case "Repeat":
          return customer.status === "Repeat Customer";
        case "New":
          return customer.isNew;
        case "High Value":
          return customer.isHighValue;
        case "Inactive":
          return customer.status === "Inactive";
        case "Churn Risk":
          return customer.status === "Churn Risk";
        default:
          return true;
      }
    });
  }, [search, activeFilter]);

  const stats = useMemo(() => {
    const total = MOCK_CUSTOMERS.length;
    const repeat = MOCK_CUSTOMERS.filter((c) => c.status === "Repeat Customer" || c.status === "VIP").length;
    const newLast30 = MOCK_CUSTOMERS.filter((c) => c.isNew && isWithinDays(c.lastOrderDate, 30)).length;
    const avgLtv = MOCK_CUSTOMERS.reduce((sum, c) => sum + c.ltv, 0) / (MOCK_CUSTOMERS.length || 1);

    return { total, repeat, newLast30, avgLtv };
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader email={email} onSignOut={handleSignOut} />

        <main className="flex-1 overflow-x-hidden px-4 py-8 md:px-6 md:py-10 xl:px-8">
          <div className="mx-auto max-w-[1680px] min-w-0">
            <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Customers
              </h1>
              <p className="mt-2 text-sm text-zinc-400 md:text-base">
                Manage your customers with AI-powered insights.
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total Customers" value={stats.total.toString()} />
              <StatCard label="Repeat Customers" value={stats.repeat.toString()} />
              <StatCard label="New Customers (30 Days)" value={stats.newLast30.toString()} />
              <StatCard label="Average Lifetime Value" value={formatCurrency(stats.avgLtv)} />
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_272px]">
              <div className="min-w-0">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="relative w-full md:max-w-sm">
                    <svg
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search customer, email, phone, or order ID"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-amber-500/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-amber-500/10"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {FILTERS.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                          activeFilter === filter
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                            : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  {filteredCustomers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                        <svg
                          className="h-6 w-6 text-zinc-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-white">No customers found</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="divide-y divide-white/5 md:hidden">
                        {filteredCustomers.map((customer, idx) => (
                          <div
                            key={customer.id}
                            className="p-4 transition-colors duration-200 active:bg-white/[0.03]"
                            style={{ animation: `fadeIn 0.4s ease-out ${idx * 0.04}s both` }}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar name={customer.name} colorClass={customer.avatarColor} />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="truncate font-medium text-white">{customer.name}</p>
                                  <p className="shrink-0 font-medium text-white">
                                    {formatCurrency(customer.totalSpent)}
                                  </p>
                                </div>
                                <p className="truncate text-xs text-zinc-500">{customer.email}</p>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <StatusBadge status={customer.status} />
                              <AIScoreBadge score={customer.aiScore} />
                            </div>

                            <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center">
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500">Orders</p>
                                <p className="mt-0.5 text-sm font-medium text-white">{customer.ordersCount}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500">LTV</p>
                                <p className="mt-0.5 text-sm font-medium text-white">
                                  {formatCurrency(customer.ltv)}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase tracking-wider text-zinc-500">Last Order</p>
                                <p className="mt-0.5 text-sm font-medium text-white">
                                  {formatDate(customer.lastOrderDate)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              <button className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-xs font-medium text-zinc-300 transition-all duration-200 active:border-white/20 active:text-white">
                                View
                              </button>
                              <button className="flex-1 rounded-lg border border-amber-500/30 bg-amber-500/10 py-2 text-xs font-medium text-amber-400 transition-all duration-200 active:border-amber-500/50 active:bg-amber-500/20">
                                AI Analyze
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="hidden overflow-x-auto md:block">
                        <table className="w-full table-fixed text-left text-[13px]">
                          <colgroup>
                            <col className="w-[48px]" />
                            <col className="w-auto" />
                            <col className="w-[150px]" />
                            <col className="w-[56px]" />
                            <col className="w-[84px]" />
                            <col className="w-[84px]" />
                            <col className="w-[76px]" />
                            <col className="w-[84px]" />
                            <col className="w-[92px]" />
                            <col className="w-[128px]" />
                            <col className="w-[116px]" />
                          </colgroup>
                          <thead>
                            <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-zinc-500">
                              <th className="px-2.5 py-3 font-medium">Profile</th>
                              <th className="px-2.5 py-3 font-medium">Customer</th>
                              <th className="px-2.5 py-3 font-medium">Email</th>
                              <th className="px-2.5 py-3 font-medium">Orders</th>
                              <th className="px-2.5 py-3 font-medium">Spent</th>
                              <th className="px-2.5 py-3 font-medium">Avg Order</th>
                              <th className="px-2.5 py-3 font-medium">Last Order</th>
                              <th className="px-2.5 py-3 font-medium">LTV</th>
                              <th className="px-2.5 py-3 font-medium">AI Score</th>
                              <th className="px-2.5 py-3 font-medium">Status</th>
                              <th className="px-2.5 py-3 text-right font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCustomers.map((customer, idx) => (
                              <tr
                                key={customer.id}
                                className="border-b border-white/5 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.03]"
                                style={{ animation: `fadeIn 0.4s ease-out ${idx * 0.04}s both` }}
                              >
                                <td className="px-2.5 py-3">
                                  <Avatar name={customer.name} colorClass={customer.avatarColor} size={8} />
                                </td>
                                <td className="px-2.5 py-3">
                                  <div className="truncate font-medium text-white">{customer.name}</div>
                                </td>
                                <td className="px-2.5 py-3 text-zinc-400">
                                  <span className="block truncate">{customer.email}</span>
                                </td>
                                <td className="px-2.5 py-3 text-zinc-300">{customer.ordersCount}</td>
                                <td className="px-2.5 py-3 font-medium text-white">
                                  {formatCurrency(customer.totalSpent)}
                                </td>
                                <td className="px-2.5 py-3 text-zinc-300">
                                  {formatCurrency(customer.avgOrderValue)}
                                </td>
                                <td className="px-2.5 py-3 text-zinc-400">
                                  {formatDate(customer.lastOrderDate)}
                                </td>
                                <td className="px-2.5 py-3 font-medium text-white">
                                  {formatCurrency(customer.ltv)}
                                </td>
                                <td className="px-2.5 py-3">
                                  <AIScoreBadge score={customer.aiScore} />
                                </td>
                                <td className="px-2.5 py-3">
                                  <StatusBadge status={customer.status} />
                                </td>
                                <td className="px-2.5 py-3">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:text-white">
                                      View
                                    </button>
                                    <button className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[11px] font-medium text-amber-400 transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/20">
                                      AI
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <aside className="hidden xl:block">
                <div className="sticky top-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5">
                  <div className="mb-5 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-sm font-semibold text-white">AI Customer Insights</h2>
                  </div>

                  <div className="flex flex-col divide-y divide-white/5">
                    {AI_INSIGHTS.map((insight) => (
                      <div key={insight.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                        <InsightIcon tone={insight.tone} />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-zinc-500">{insight.customerName}</p>
                          <p className="mt-0.5 text-sm font-medium text-white">{insight.headline}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">{insight.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}