"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

type ProductStatus = "Active" | "Draft";
type InventoryStatus = "Healthy" | "Low Stock" | "Out of Stock";
type FilterKey =
  | "All"
  | "Active"
  | "Draft"
  | "Best Sellers"
  | "Low Stock"
  | "Out of Stock"
  | "Dead Products";

interface Product {
  id: string;
  name: string;
  sku: string;
  vendor: string;
  imageColor: string;
  inventoryCount: number;
  inventoryStatus: InventoryStatus;
  price: number;
  sales30d: number;
  revenue30d: number;
  status: ProductStatus;
  aiScore: number;
  isBestSeller: boolean;
  isDead: boolean;
}

interface AIInsight {
  id: string;
  productName: string;
  headline: string;
  detail: string;
  tone: "positive" | "warning" | "opportunity";
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Heritage Fold Wallet",
    sku: "SP-WAL-001",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-amber-700 to-amber-900",
    inventoryCount: 142,
    inventoryStatus: "Healthy",
    price: 89.0,
    sales30d: 218,
    revenue30d: 19402.0,
    status: "Active",
    aiScore: 97,
    isBestSeller: true,
    isDead: false,
  },
  {
    id: "2",
    name: "Onyx Crossbody Bag",
    sku: "SP-BAG-014",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-zinc-700 to-zinc-900",
    inventoryCount: 34,
    inventoryStatus: "Low Stock",
    price: 168.0,
    sales30d: 41,
    revenue30d: 6888.0,
    status: "Active",
    aiScore: 63,
    isBestSeller: false,
    isDead: false,
  },
  {
    id: "3",
    name: "Signature Card Holder",
    sku: "SP-CRD-007",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-amber-600 to-yellow-800",
    inventoryCount: 289,
    inventoryStatus: "Healthy",
    price: 42.0,
    sales30d: 176,
    revenue30d: 7392.0,
    status: "Active",
    aiScore: 91,
    isBestSeller: true,
    isDead: false,
  },
  {
    id: "4",
    name: "Nomad Travel Pouch",
    sku: "SP-PCH-022",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-neutral-700 to-neutral-900",
    inventoryCount: 0,
    inventoryStatus: "Out of Stock",
    price: 56.0,
    sales30d: 12,
    revenue30d: 672.0,
    status: "Active",
    aiScore: 58,
    isBestSeller: false,
    isDead: false,
  },
  {
    id: "5",
    name: "Classic Belt — Black",
    sku: "SP-BLT-005",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-stone-700 to-stone-900",
    inventoryCount: 198,
    inventoryStatus: "Healthy",
    price: 64.0,
    sales30d: 3,
    revenue30d: 192.0,
    status: "Draft",
    aiScore: 21,
    isBestSeller: false,
    isDead: true,
  },
  {
    id: "6",
    name: "Weekender Duffel",
    sku: "SP-DUF-009",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-amber-800 to-orange-950",
    inventoryCount: 18,
    inventoryStatus: "Low Stock",
    price: 245.0,
    sales30d: 29,
    revenue30d: 7105.0,
    status: "Active",
    aiScore: 84,
    isBestSeller: false,
    isDead: false,
  },
  {
    id: "7",
    name: "Slim Keychain Wallet",
    sku: "SP-KEY-018",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-yellow-700 to-amber-900",
    inventoryCount: 76,
    inventoryStatus: "Healthy",
    price: 29.0,
    sales30d: 94,
    revenue30d: 2726.0,
    status: "Active",
    aiScore: 88,
    isBestSeller: false,
    isDead: false,
  },
  {
    id: "8",
    name: "Vintage Passport Case",
    sku: "SP-PAS-011",
    vendor: "ShopPilot Leather Co.",
    imageColor: "from-red-900 to-stone-900",
    inventoryCount: 5,
    inventoryStatus: "Low Stock",
    price: 38.0,
    sales30d: 1,
    revenue30d: 38.0,
    status: "Draft",
    aiScore: 14,
    isBestSeller: false,
    isDead: true,
  },
];

const AI_INSIGHTS: AIInsight[] = [
  {
    id: "1",
    productName: "Heritage Fold Wallet",
    headline: "Sales increased 28%",
    detail: "Restock within 5 days to avoid a stockout.",
    tone: "positive",
  },
  {
    id: "2",
    productName: "Onyx Crossbody Bag",
    headline: "Sales slowing down",
    detail: "Consider running a limited-time discount.",
    tone: "warning",
  },
  {
    id: "3",
    productName: "Heritage Fold Wallet",
    headline: "High margin product",
    detail: "Increase ad budget to scale winning SKU.",
    tone: "opportunity",
  },
  {
    id: "4",
    productName: "Classic Belt — Black",
    headline: "Dead stock detected",
    detail: "No meaningful sales in 30 days. Consider bundling or discontinuing.",
    tone: "warning",
  },
  {
    id: "5",
    productName: "Weekender Duffel",
    headline: "Strong AI score of 84",
    detail: "Low inventory relative to demand. Reorder recommended.",
    tone: "positive",
  },
];

const FILTERS: FilterKey[] = [
  "All",
  "Active",
  "Draft",
  "Best Sellers",
  "Low Stock",
  "Out of Stock",
  "Dead Products",
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
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

function InventoryBadge({ status }: { status: InventoryStatus }) {
  const styles: Record<InventoryStatus, string> = {
    Healthy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Low Stock": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Out of Stock": "bg-rose-500/10 text-rose-400 border-rose-500/20",
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

function StatusBadge({ status }: { status: ProductStatus }) {
  const styles: Record<ProductStatus, string> = {
    Active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Draft: "bg-white/5 text-zinc-400 border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </div>
  );
}

export default function ProductsPage() {
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

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.vendor.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      switch (activeFilter) {
        case "All":
          return true;
        case "Active":
          return product.status === "Active";
        case "Draft":
          return product.status === "Draft";
        case "Best Sellers":
          return product.isBestSeller;
        case "Low Stock":
          return product.inventoryStatus === "Low Stock";
        case "Out of Stock":
          return product.inventoryStatus === "Out of Stock";
        case "Dead Products":
          return product.isDead;
        default:
          return true;
      }
    });
  }, [search, activeFilter]);

  const stats = useMemo(() => {
    const total = MOCK_PRODUCTS.length;
    const active = MOCK_PRODUCTS.filter((p) => p.status === "Active").length;
    const outOfStock = MOCK_PRODUCTS.filter((p) => p.inventoryStatus === "Out of Stock").length;
    const needRestock = MOCK_PRODUCTS.filter(
      (p) => p.inventoryStatus === "Low Stock" || p.inventoryStatus === "Out of Stock"
    ).length;

    return { total, active, outOfStock, needRestock };
  }, []);

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardHeader email={email} onSignOut={handleSignOut} />

        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
          <div className="mx-auto max-w-[1600px]">
            {/* Page heading */}
            <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Products
              </h1>
              <p className="mt-2 text-sm text-zinc-400 md:text-base">
                Manage products with AI-powered insights.
              </p>
            </div>

            {/* Top statistics */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total Products" value={stats.total.toString()} />
              <StatCard label="Active Products" value={stats.active.toString()} />
              <StatCard label="Out of Stock" value={stats.outOfStock.toString()} />
              <StatCard label="Need Restock" value={stats.needRestock.toString()} />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
              {/* Main column */}
              <div>
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
                      placeholder="Search by name, SKU, or vendor"
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

                {/* Products table */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  {filteredProducts.length === 0 ? (
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
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-white">No products found</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[1100px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-500">
                            <th className="px-5 py-4 font-medium">Image</th>
                            <th className="px-5 py-4 font-medium">Product Name</th>
                            <th className="px-5 py-4 font-medium">SKU</th>
                            <th className="px-5 py-4 font-medium">Inventory</th>
                            <th className="px-5 py-4 font-medium">Price</th>
                            <th className="px-5 py-4 font-medium">Sales (30d)</th>
                            <th className="px-5 py-4 font-medium">Revenue</th>
                            <th className="px-5 py-4 font-medium">Status</th>
                            <th className="px-5 py-4 font-medium">AI Score</th>
                            <th className="px-5 py-4 text-right font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((product, idx) => (
                            <tr
                              key={product.id}
                              className="border-b border-white/5 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.03]"
                              style={{
                                animation: `fadeIn 0.4s ease-out ${idx * 0.04}s both`,
                              }}
                            >
                              <td className="px-5 py-4">
                                <div
                                  className={`h-11 w-11 rounded-xl bg-gradient-to-br ${product.imageColor} shadow-inner`}
                                />
                              </td>
                              <td className="px-5 py-4">
                                <div className="font-medium text-white">{product.name}</div>
                                <div className="text-xs text-zinc-500">{product.vendor}</div>
                              </td>
                              <td className="px-5 py-4 text-zinc-400">{product.sku}</td>
                              <td className="px-5 py-4">
                                <div className="flex flex-col gap-1">
                                  <InventoryBadge status={product.inventoryStatus} />
                                  <span className="text-[10px] text-zinc-500">
                                    {product.inventoryCount} in stock
                                  </span>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-zinc-300">
                                {formatCurrency(product.price)}
                              </td>
                              <td className="px-5 py-4 text-zinc-300">{product.sales30d}</td>
                              <td className="px-5 py-4 font-medium text-white">
                                {formatCurrency(product.revenue30d)}
                              </td>
                              <td className="px-5 py-4">
                                <StatusBadge status={product.status} />
                              </td>
                              <td className="px-5 py-4">
                                <AIScoreBadge score={product.aiScore} />
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:text-white">
                                    View
                                  </button>
                                  <button className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-400 transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/20">
                                    AI Analyze
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Insight Panel */}
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
                    <h2 className="text-sm font-semibold text-white">AI Recommendation</h2>
                  </div>

                  <div className="flex flex-col divide-y divide-white/5">
                    {AI_INSIGHTS.map((insight) => (
                      <div key={insight.id} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                        <InsightIcon tone={insight.tone} />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-zinc-500">{insight.productName}</p>
                          <p className="mt-0.5 text-sm font-medium text-white">{insight.headline}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">
                            {insight.detail}
                          </p>
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