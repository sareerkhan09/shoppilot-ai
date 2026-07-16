"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, type AuthSession } from "@/lib/auth";
import { initialInsights, insightHistory } from "@/lib/data/insights";
import type { Insight, InsightStatus, DashboardStats } from "@/types/insight";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { InsightHistorySection } from "@/components/dashboard/InsightHistorySection";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [checked, setChecked] = useState(false);
  const [insights, setInsights] = useState<Insight[]>(initialInsights);

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const current = getSession();
    if (!current) {
      router.replace("/login");
      return;
    }
    setSession(current);
    setChecked(true);
  }, [router]);

  useEffect(() => {
    if (!checked) return;

    let cancelled = false;

    async function loadStats() {
      setStatsLoading(true);
      setStatsError(null);

      try {
        const res = await fetch("/api/dashboard/stats");
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error || "Failed to load dashboard stats");
        }

        if (!cancelled) {
          setStats(json.stats as DashboardStats);
        }
      } catch (err) {
        if (!cancelled) {
          setStatsError(
            err instanceof Error ? err.message : "Failed to load dashboard stats"
          );
        }
      } finally {
        if (!cancelled) {
          setStatsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, [checked]);

  function updateStatus(id: string, status: InsightStatus) {
    setInsights((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0B0F]">
        <div className="flex items-center gap-2.5 text-[13.5px] text-[#6E7280]">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/10 border-t-[#E8B65A]" />
          Loading your dashboard...
        </div>
      </div>
    );
  }

  const activeInsights = insights.filter((i) => i.status === "active");
  const topInsight = activeInsights.find((i) => i.isTopPriority) || activeInsights[0];
  const otherInsights = activeInsights.filter((i) => i.id !== topInsight?.id);
  const doneCount = insights.filter((i) => i.status === "done").length;
  const firstName = session?.email?.split("@")[0] ?? "there";

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-[#F2F1ED] antialiased">
      <DashboardHeader email={session?.email} onSignOut={handleSignOut} />

      <DashboardGreeting
        firstName={firstName}
        activeInsightCount={activeInsights.length}
      />

      {statsLoading && (
        <section className="px-6 pb-10">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
              >
                <div className="h-3 w-20 rounded bg-white/[0.06]" />
                <div className="mt-3 h-5 w-16 rounded bg-white/[0.08]" />
                <div className="mt-2 h-3 w-24 rounded bg-white/[0.05]" />
              </div>
            ))}
          </div>
        </section>
      )}

      {!statsLoading && statsError && (
        <section className="px-6 pb-10">
          <div className="mx-auto max-w-5xl rounded-2xl border border-[#E5484D]/25 bg-[#1A1113]/60 p-5">
            <p className="text-[13px] font-medium text-[#F2F1ED]">
              Couldn&apos;t load live store stats
            </p>
            <p className="mt-1 text-[12.5px] text-[#A9AEBB]">{statsError}</p>
          </div>
        </section>
      )}

      {!statsLoading && !statsError && stats && (
        <StatsGrid stats={stats} insightsCount={insights.length} doneCount={doneCount} />
      )}

      {topInsight && (
        <section className="px-6 pb-6">
          <div className="mx-auto max-w-5xl">
            <InsightCard
              insight={topInsight}
              variant="top"
              onMarkDone={(id) => updateStatus(id, "done")}
              onDismiss={(id) => updateStatus(id, "dismissed")}
            />
          </div>
        </section>
      )}

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-[13px] font-medium uppercase tracking-wider text-[#6E7280]">
            More from today
          </h2>

          <div className="flex flex-col gap-3">
            {otherInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                variant="regular"
                onMarkDone={(id) => updateStatus(id, "done")}
                onDismiss={(id) => updateStatus(id, "dismissed")}
              />
            ))}

            {activeInsights.length === 0 && (
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
                <p className="text-[14px] text-[#A9AEBB]">
                  All clear today — nothing needs your attention.
                </p>
                <p className="mt-1 text-[12.5px] text-[#6E7280]">
                  I&apos;ll keep watching.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <InsightHistorySection items={insightHistory} />

      <DashboardFooter />
    </div>
  );
}