"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

type AuthSession = {
  email: string;
};

interface RevenuePoint {
  label: string;
  value: number;
}

interface ChannelRow {
  channel: string;
  revenue: string;
  share: number;
  trend: "up" | "down";
  trendValue: string;
}

interface TopProductRow {
  name: string;
  units: number;
  revenue: string;
}

const revenueTrend: RevenuePoint[] = [
  { label: "Mon", value: 1420 },
  { label: "Tue", value: 1180 },
  { label: "Wed", value: 1610 },
  { label: "Thu", value: 1840 },
  { label: "Fri", value: 2260 },
  { label: "Sat", value: 2040 },
  { label: "Sun", value: 2380 },
];

const channelBreakdown: ChannelRow[] = [
  { channel: "Online Store", revenue: "$8,940", share: 62, trend: "up", trendValue: "8.2%" },
  { channel: "Instagram Shop", revenue: "$2,410", share: 17, trend: "up", trendValue: "14.6%" },
  { channel: "Google Shopping", revenue: "$1,860", share: 13, trend: "down", trendValue: "3.1%" },
  { channel: "Direct / Other", revenue: "$1,190", share: 8, trend: "up", trendValue: "2.4%" },
];

const topProducts: TopProductRow[] = [
  { name: "Aria Tote", units: 142, revenue: "$4,260" },
  { name: "Linen Wrap", units: 98, revenue: "$2,940" },
  { name: "Ceramic Pour-Over Set", units: 71, revenue: "$2,485" },
  { name: "Studio Candle — Oak & Amber", units: 63, revenue: "$1,197" },
];

function buildAreaPath(points: RevenuePoint[], width: number, height: number) {
  const max = Math.max(...points.map((p) => p.value));
  const min = Math.min(...points.map((p) => p.value));
  const range = max - min || 1;
  const stepX = width / (points.length - 1);

  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p.value - min) / range) * height;
    return { x, y };
  });

  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return { linePath, areaPath, coords };
}

export default function RevenuePage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [checked, setChecked] = useState(false);
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setSession({ email: session.user.email ?? "" });
      setChecked(true);
    }

    checkSession();
  }, [router]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  const chart = useMemo(() => buildAreaPath(revenueTrend, 640, 220), []);

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0B0F]">
        <div className="flex items-center gap-2.5 text-[13.5px] text-[#6E7280]">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/10 border-t-[#C9A227]" />
          Loading revenue...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0A0B0F] text-[#F3F1EA] antialiased">
      <Sidebar />

      <main className="flex-1">
        <DashboardHeader email={session?.email} onSignOut={handleSignOut} />

        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* Page header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11.5px] uppercase tracking-[0.14em] text-[#C9A227]">
                Revenue
              </p>
              <h1 className="mt-2 font-serif text-[30px] tracking-[-0.01em] text-[#F3F1EA] sm:text-[34px]">
                The full account of your earnings
              </h1>
              <p className="mt-1.5 text-[13.5px] text-[#8B857C]">
                Every entry here is drawn from your own store&apos;s order history.
              </p>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-[#F3F1EA]/[0.08] bg-[#101114] p-1">
              {(["7d", "30d", "90d"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors duration-300 ${
                    range === r
                      ? "bg-gradient-to-r from-[#E8C766] to-[#B8860B] text-[#0B0C0E]"
                      : "text-[#9C968C] hover:text-[#F3F1EA]"
                  }`}
                >
                  {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "90 days"}
                </button>
              ))}
            </div>
          </div>

          {/* Top stat row */}
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#F3F1EA]/[0.07] bg-[#101114] p-5">
              <p className="text-[11px] uppercase tracking-wider text-[#6E6A63]">
                Total revenue
              </p>
              <p className="mt-2 font-serif text-[24px] text-[#F3F1EA]">$14,410</p>
              <p className="mt-1.5 text-[11.5px] text-[#8FBF6B]">▲ 9.4% vs. last period</p>
            </div>

            <div className="rounded-2xl border border-[#F3F1EA]/[0.07] bg-[#101114] p-5">
              <p className="text-[11px] uppercase tracking-wider text-[#6E6A63]">
                Average order value
              </p>
              <p className="mt-2 font-serif text-[24px] text-[#F3F1EA]">$58.20</p>
              <p className="mt-1.5 text-[11.5px] text-[#8FBF6B]">▲ 3.1% vs. last period</p>
            </div>

            <div className="rounded-2xl border border-[#F3F1EA]/[0.07] bg-[#101114] p-5">
              <p className="text-[11px] uppercase tracking-wider text-[#6E6A63]">
                Refund rate
              </p>
              <p className="mt-2 font-serif text-[24px] text-[#F3F1EA]">1.8%</p>
              <p className="mt-1.5 text-[11.5px] text-[#E5786E]">▲ 0.4% vs. last period</p>
            </div>

            <div className="rounded-2xl border border-[#C9A227]/25 bg-gradient-to-b from-[#1A1710] to-[#101114] p-5">
              <p className="text-[11px] uppercase tracking-wider text-[#C9A227]">
                Net revenue
              </p>
              <p className="mt-2 font-serif text-[24px] text-[#F3F1EA]">$13,152</p>
              <p className="mt-1.5 text-[11.5px] text-[#8FBF6B]">▲ 8.7% vs. last period</p>
            </div>
          </div>

          {/* Revenue trend chart */}
          <div className="mt-6 rounded-[22px] border border-[#F3F1EA]/[0.07] bg-[#101114] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#6E6A63]">
                  Revenue trend
                </p>
                <p className="mt-1 font-serif text-[18px] text-[#F3F1EA]">
                  A steady climb through the week
                </p>
              </div>
              <span className="rounded-full border border-[#C9A227]/25 px-3 py-1 text-[11px] text-[#C9A227]">
                Peak: Sunday
              </span>
            </div>

            <div className="mt-6 overflow-x-auto">
              <svg
                viewBox="0 0 640 220"
                className="h-[220px] w-full min-w-[520px]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A227" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="revenueLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E8C766" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>

                {[0.25, 0.5, 0.75].map((f) => (
                  <line
                    key={f}
                    x1="0"
                    x2="640"
                    y1={220 * f}
                    y2={220 * f}
                    stroke="#F3F1EA"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                  />
                ))}

                <path d={chart.areaPath} fill="url(#revenueFill)" />
                <path
                  d={chart.linePath}
                  fill="none"
                  stroke="url(#revenueLine)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {chart.coords.map((c, i) => (
                  <circle
                    key={i}
                    cx={c.x}
                    cy={c.y}
                    r="3.5"
                    fill="#0A0B0F"
                    stroke="#E8C766"
                    strokeWidth="1.6"
                  />
                ))}
              </svg>

              <div className="mt-2 flex min-w-[520px] justify-between px-0.5">
                {revenueTrend.map((p) => (
                  <span key={p.label} className="text-[11px] text-[#6E6A63]">
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Channel breakdown + top products */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[22px] border border-[#F3F1EA]/[0.07] bg-[#101114] p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-wider text-[#6E6A63]">
                Revenue by channel
              </p>
              <p className="mt-1 font-serif text-[18px] text-[#F3F1EA]">
                Where your sales are coming from
              </p>

              <div className="mt-6 flex flex-col gap-5">
                {channelBreakdown.map((row) => (
                  <div key={row.channel}>
                    <div className="flex items-center justify-between">
                      <p className="text-[13.5px] text-[#F3F1EA]">{row.channel}</p>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[11.5px] ${
                            row.trend === "up" ? "text-[#8FBF6B]" : "text-[#E5786E]"
                          }`}
                        >
                          {row.trend === "up" ? "▲" : "▼"} {row.trendValue}
                        </span>
                        <span className="w-16 text-right text-[13.5px] font-medium text-[#F3F1EA]">
                          {row.revenue}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F3F1EA]/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E8C766] to-[#B8860B]"
                        style={{ width: `${row.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-[#F3F1EA]/[0.07] bg-[#101114] p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-wider text-[#6E6A63]">
                Top products
              </p>
              <p className="mt-1 font-serif text-[18px] text-[#F3F1EA]">
                What&apos;s driving this week&apos;s revenue
              </p>

              <div className="mt-6 flex flex-col divide-y divide-[#F3F1EA]/[0.06]">
                {topProducts.map((product, i) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/25 font-serif text-[12px] text-[#C9A227]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[13px] text-[#F3F1EA]">{product.name}</p>
                        <p className="mt-0.5 text-[11.5px] text-[#6E6A63]">
                          {product.units} units sold
                        </p>
                      </div>
                    </div>
                    <span className="text-[13px] font-medium text-[#F3F1EA]">
                      {product.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI callout */}
          <div className="mt-6 rounded-2xl border border-[#C9A227]/20 bg-[#C9A227]/[0.05] p-6">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#C9A227]">
              Worth noting
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#F3F1EA]">
              Instagram Shop revenue is climbing 14.6% faster than any other channel this
              period — a second consecutive week of growth there.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}