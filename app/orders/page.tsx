"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

type PaymentStatus = "Paid" | "Pending" | "Refunded";
type FulfillmentStatus = "Fulfilled" | "Unfulfilled";
type FilterKey = "All" | "Paid" | "Pending" | "Refunded" | "Fulfilled" | "Unfulfilled";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  itemsCount: number;
  payment: PaymentStatus;
  fulfillment: FulfillmentStatus;
  total: number;
  currency: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "#SP-10482",
    customerName: "Amara Whitfield",
    customerEmail: "amara.w@gmail.com",
    date: "2026-07-19T14:32:00Z",
    itemsCount: 3,
    payment: "Paid",
    fulfillment: "Fulfilled",
    total: 284.5,
    currency: "USD",
  },
  {
    id: "2",
    orderNumber: "#SP-10481",
    customerName: "Julian Cross",
    customerEmail: "julian.cross@outlook.com",
    date: "2026-07-19T11:05:00Z",
    itemsCount: 1,
    payment: "Pending",
    fulfillment: "Unfulfilled",
    total: 59.99,
    currency: "USD",
  },
  {
    id: "3",
    orderNumber: "#SP-10480",
    customerName: "Naomi Vasquez",
    customerEmail: "naomi.v@icloud.com",
    date: "2026-07-18T20:47:00Z",
    itemsCount: 5,
    payment: "Paid",
    fulfillment: "Fulfilled",
    total: 612.0,
    currency: "USD",
  },
  {
    id: "4",
    orderNumber: "#SP-10479",
    customerName: "Theo Marchetti",
    customerEmail: "theo.m@proton.me",
    date: "2026-07-18T09:14:00Z",
    itemsCount: 2,
    payment: "Refunded",
    fulfillment: "Unfulfilled",
    total: 128.75,
    currency: "USD",
  },
  {
    id: "5",
    orderNumber: "#SP-10478",
    customerName: "Priya Nandakumar",
    customerEmail: "priya.n@yahoo.com",
    date: "2026-07-17T16:58:00Z",
    itemsCount: 4,
    payment: "Paid",
    fulfillment: "Fulfilled",
    total: 349.2,
    currency: "USD",
  },
  {
    id: "6",
    orderNumber: "#SP-10477",
    customerName: "Elias Brennan",
    customerEmail: "elias.brennan@gmail.com",
    date: "2026-07-17T08:21:00Z",
    itemsCount: 1,
    payment: "Pending",
    fulfillment: "Unfulfilled",
    total: 42.0,
    currency: "USD",
  },
  {
    id: "7",
    orderNumber: "#SP-10476",
    customerName: "Sofia Lindqvist",
    customerEmail: "sofia.l@hotmail.com",
    date: "2026-07-16T19:03:00Z",
    itemsCount: 6,
    payment: "Paid",
    fulfillment: "Fulfilled",
    total: 891.4,
    currency: "USD",
  },
];

const FILTERS: FilterKey[] = ["All", "Paid", "Pending", "Refunded", "Fulfilled", "Unfulfilled"];

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " · " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    Paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Refunded: "bg-rose-500/10 text-rose-400 border-rose-500/20",
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

function FulfillmentBadge({ status }: { status: FulfillmentStatus }) {
  const styles: Record<FulfillmentStatus, string> = {
    Fulfilled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Unfulfilled: "bg-white/5 text-zinc-400 border-white/10",
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

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:border-amber-500/30 hover:from-white/[0.06]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl transition-all duration-500 group-hover:bg-amber-500/10" />
      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export default function OrdersPage() {
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

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MOCK_ORDERS.filter((order) => {
      const matchesSearch =
        query.length === 0 ||
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      switch (activeFilter) {
        case "All":
          return true;
        case "Paid":
        case "Pending":
        case "Refunded":
          return order.payment === activeFilter;
        case "Fulfilled":
        case "Unfulfilled":
          return order.fulfillment === activeFilter;
        default:
          return true;
      }
    });
  }, [search, activeFilter]);

  const stats = useMemo(() => {
    const todaysOrders = MOCK_ORDERS.filter((o) => isToday(o.date)).length;
    const pendingOrders = MOCK_ORDERS.filter((o) => o.payment === "Pending").length;
    const refundRequests = MOCK_ORDERS.filter((o) => o.payment === "Refunded").length;
    const avgOrderValue =
      MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0) / (MOCK_ORDERS.length || 1);

    return {
      todaysOrders,
      pendingOrders,
      refundRequests,
      avgOrderValue,
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader email={email} onSignOut={handleSignOut} />

        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
          <div className="mx-auto max-w-7xl">
            {/* Page heading */}
            <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Orders
              </h1>
              <p className="mt-2 text-sm text-zinc-400 md:text-base">
                Manage every order from your Shopify store.
              </p>
            </div>

            {/* Top statistics */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Today's Orders" value={stats.todaysOrders.toString()} />
              <StatCard label="Pending Orders" value={stats.pendingOrders.toString()} />
              <StatCard
                label="Average Order Value"
                value={formatCurrency(stats.avgOrderValue, "USD")}
              />
              <StatCard label="Refund Requests" value={stats.refundRequests.toString()} />
            </div>

            {/* Search + Filters */}
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
                  placeholder="Search order number or customer"
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

            {/* Orders table */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              {filteredOrders.length === 0 ? (
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-white">No orders found</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-500">
                        <th className="px-5 py-4 font-medium">Order</th>
                        <th className="px-5 py-4 font-medium">Customer</th>
                        <th className="px-5 py-4 font-medium">Date</th>
                        <th className="px-5 py-4 font-medium">Items</th>
                        <th className="px-5 py-4 font-medium">Payment</th>
                        <th className="px-5 py-4 font-medium">Fulfillment</th>
                        <th className="px-5 py-4 font-medium">Total</th>
                        <th className="px-5 py-4 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order, idx) => (
                        <tr
                          key={order.id}
                          className="border-b border-white/5 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.03]"
                          style={{
                            animation: `fadeIn 0.4s ease-out ${idx * 0.04}s both`,
                          }}
                        >
                          <td className="px-5 py-4 font-medium text-white">
                            {order.orderNumber}
                          </td>
                          <td className="px-5 py-4">
                            <div className="text-zinc-200">{order.customerName}</div>
                            <div className="text-xs text-zinc-500">{order.customerEmail}</div>
                          </td>
                          <td className="px-5 py-4 text-zinc-400">{formatDate(order.date)}</td>
                          <td className="px-5 py-4 text-zinc-400">{order.itemsCount}</td>
                          <td className="px-5 py-4">
                            <PaymentBadge status={order.payment} />
                          </td>
                          <td className="px-5 py-4">
                            <FulfillmentBadge status={order.fulfillment} />
                          </td>
                          <td className="px-5 py-4 font-medium text-white">
                            {formatCurrency(order.total, order.currency)}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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