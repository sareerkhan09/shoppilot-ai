import type { DashboardStats } from "@/types/insight";

interface StatsGridProps {
  stats: DashboardStats;
  insightsCount: number;
  doneCount: number;
}

export function StatsGrid({ stats, insightsCount, doneCount }: StatsGridProps) {
  return (
    <section className="px-6 pb-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-[11.5px] text-[#6E7280]">Revenue today</p>
          <p className="mt-1.5 text-[22px] font-semibold tracking-[-0.01em]">
            {stats.revenueToday}
          </p>
          <p
            className={`mt-1 text-[11.5px] ${
              stats.revenueTrend === "up" ? "text-[#4ADE80]" : "text-[#E5484D]"
            }`}
          >
            {stats.revenueTrend === "up" ? "▲" : "▼"} {stats.revenueChange} vs. avg
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-[11.5px] text-[#6E7280]">Orders</p>
          <p className="mt-1.5 text-[22px] font-semibold tracking-[-0.01em]">
            {stats.orders}
          </p>
          <p
            className={`mt-1 text-[11.5px] ${
              stats.ordersTrend === "up" ? "text-[#4ADE80]" : "text-[#E5484D]"
            }`}
          >
            {stats.ordersTrend === "up" ? "▲" : "▼"} {stats.ordersChange} vs. avg
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-[11.5px] text-[#6E7280]">New customers</p>
          <p className="mt-1.5 text-[22px] font-semibold tracking-[-0.01em]">
            {stats.newCustomers}
          </p>
          <p
            className={`mt-1 text-[11.5px] ${
              stats.newCustomersTrend === "up" ? "text-[#4ADE80]" : "text-[#E5484D]"
            }`}
          >
            {stats.newCustomersTrend === "up" ? "▲" : "▼"} {stats.newCustomersChange}{" "}
            vs. avg
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="text-[11.5px] text-[#6E7280]">Insights caught</p>
          <p className="mt-1.5 text-[22px] font-semibold tracking-[-0.01em]">
            {insightsCount}
          </p>
          <p className="mt-1 text-[11.5px] text-[#6E7280]">{doneCount} resolved</p>
        </div>
      </div>
    </section>
  );
}