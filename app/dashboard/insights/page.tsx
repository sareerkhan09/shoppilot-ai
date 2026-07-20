"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  animate,
} from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  Package,
  Users,
  DollarSign,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ShieldCheck,
  Flame,
  Percent,
  Boxes,
  Heart,
  UserPlus,
  UserMinus,
  Crown,
  Repeat,
  Rocket,
  Megaphone,
  MessageCircle,
  Gift,
  Tag,
  Mail,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

/* ------------------------------------------------------------------ */
/* Theme tokens                                                        */
/* ------------------------------------------------------------------ */

const GOLD = "#D4AF37";
const GOLD_LIGHT = "#F3D87A";

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ------------------------------------------------------------------ */
/* Mock data (unchanged)                                               */
/* ------------------------------------------------------------------ */

const revenueForecast = [
  { day: "Jul 1", revenue: 4200 },
  { day: "Jul 5", revenue: 4600 },
  { day: "Jul 10", revenue: 4400 },
  { day: "Jul 15", revenue: 5100 },
  { day: "Jul 20", revenue: 5400 },
  { day: "Jul 25", revenue: 5950 },
  { day: "Aug 1", revenue: 6300 },
  { day: "Aug 8", revenue: 6800 },
  { day: "Aug 15", revenue: 7200 },
  { day: "Aug 20", revenue: 7650 },
];

const insightCards = [
  {
    id: "revenue-forecast",
    icon: TrendingUp,
    label: "Revenue Forecast",
    value: "$7,650",
    sub: "Next 30 days",
    trend: "+18%",
    trendUp: true,
  },
  {
    id: "best-seller",
    icon: Flame,
    label: "Best Selling Product",
    value: "Heritage Fold Wallet",
    sub: "218 sold this month",
    trend: "+28%",
    trendUp: true,
  },
  {
    id: "margin-product",
    icon: Percent,
    label: "Highest Margin Product",
    value: "Signature Card Holder",
    sub: "71% margin",
    trend: "+4%",
    trendUp: true,
  },
  {
    id: "inventory-risk",
    icon: AlertTriangle,
    label: "Inventory Risk",
    value: "4 Products",
    sub: "Need restock this week",
    trend: "Action needed",
    trendUp: false,
  },
  {
    id: "customer-growth",
    icon: Users,
    label: "Customer Growth",
    value: "+312",
    sub: "New customers (30d)",
    trend: "+12%",
    trendUp: true,
  },
  {
    id: "profit-margin",
    icon: DollarSign,
    label: "Profit Margin",
    value: "42.8%",
    sub: "Store-wide average",
    trend: "+2.1%",
    trendUp: true,
  },
];

const recommendations = [
  {
    id: "1",
    title: "Increase ad budget for Heritage Wallet",
    detail: "Sales are trending 28% above average. Scaling spend now maximizes momentum.",
    priority: "High" as const,
    confidence: 94,
    impact: "+$2,100 est. revenue",
    icon: Rocket,
  },
  {
    id: "2",
    title: "Low stock detected — Nomad Travel Pouch",
    detail: "Current stock will run out in an estimated 4 days at this sell-through rate.",
    priority: "Urgent" as const,
    confidence: 97,
    impact: "Prevents stockout",
    icon: Boxes,
  },
  {
    id: "3",
    title: "Bundle Belt + Wallet",
    detail: "Customers who buy the belt add a wallet 41% of the time. Bundle to lift AOV.",
    priority: "Medium" as const,
    confidence: 82,
    impact: "+$680 est. revenue",
    icon: Gift,
  },
  {
    id: "4",
    title: "Increase email marketing cadence",
    detail: "Open rates are up 15% this month. A second weekly send could drive more orders.",
    priority: "Medium" as const,
    confidence: 78,
    impact: "+140 est. orders",
    icon: Mail,
  },
  {
    id: "5",
    title: "VIP customers ready for upsell",
    detail: "12 VIP customers have browsed premium bundles without purchasing.",
    priority: "High" as const,
    confidence: 89,
    impact: "+$1,450 est. revenue",
    icon: Crown,
  },
];

const inventoryIntelligence = [
  {
    id: "low",
    label: "Low Stock",
    count: 4,
    icon: AlertTriangle,
    tone: "warning" as const,
    note: "Restock within 5 days",
  },
  {
    id: "out",
    label: "Out of Stock",
    count: 1,
    icon: Package,
    tone: "danger" as const,
    note: "Immediate restock recommended",
  },
  {
    id: "over",
    label: "Overstock",
    count: 2,
    icon: Boxes,
    tone: "neutral" as const,
    note: "Consider a promotion",
  },
  {
    id: "dead",
    label: "Dead Inventory",
    count: 2,
    icon: ShieldCheck,
    tone: "neutral" as const,
    note: "Bundle or discontinue",
  },
];

const customerIntelligence = [
  { id: "returning", label: "Returning Customers", value: "64%", icon: Repeat },
  { id: "vip", label: "VIP Customers", value: "18", icon: Crown },
  { id: "churn", label: "Churn Risk", value: "9", icon: UserMinus },
  { id: "ltv", label: "High LTV Customers", value: "22", icon: Heart },
  { id: "repeat", label: "Predicted Repeat Buyers", value: "47", icon: UserPlus },
];

const growthOpportunities = [
  {
    id: "1",
    title: "Launch Premium Bundle",
    revenue: "High",
    difficulty: "Low",
    roi: "4.2x",
    icon: Gift,
  },
  {
    id: "2",
    title: "Raise Price by 6%",
    revenue: "Medium",
    difficulty: "Low",
    roi: "3.1x",
    icon: Tag,
  },
  {
    id: "3",
    title: "Increase TikTok Ads",
    revenue: "High",
    difficulty: "Medium",
    roi: "2.8x",
    icon: Megaphone,
  },
  {
    id: "4",
    title: "Launch Email Campaign",
    revenue: "Medium",
    difficulty: "Low",
    roi: "5.6x",
    icon: Mail,
  },
  {
    id: "5",
    title: "WhatsApp Campaign",
    revenue: "Medium",
    difficulty: "Low",
    roi: "3.9x",
    icon: MessageCircle,
  },
  {
    id: "6",
    title: "Holiday Collection",
    revenue: "High",
    difficulty: "Medium",
    roi: "3.4x",
    icon: Sparkles,
  },
];

const timeline = [
  {
    id: "today",
    label: "Today",
    items: ["Restock Nomad Travel Pouch", "Send win-back email to 9 at-risk customers"],
  },
  {
    id: "tomorrow",
    label: "Tomorrow",
    items: ["Launch Heritage Wallet ad boost", "Review Belt + Wallet bundle pricing"],
  },
  {
    id: "next-week",
    label: "Next Week",
    items: ["Publish holiday collection teaser", "Analyze VIP upsell campaign results"],
  },
  {
    id: "next-month",
    label: "Next Month",
    items: ["Evaluate 6% price increase impact", "Plan Q4 inventory purchasing"],
  },
];

/* ------------------------------------------------------------------ */
/* Motion variants — calm, premium easing                               */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

/* ------------------------------------------------------------------ */
/* Ambient background — static, soft, non-interactive                  */
/* ------------------------------------------------------------------ */

function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-32 top-[-10%] h-[420px] w-[420px] rounded-full bg-[#D4AF37]/[0.012] blur-[120px]" />
      <div className="absolute right-[-10%] top-[15%] h-[360px] w-[360px] rounded-full bg-[#D4AF37]/[0.01] blur-[110px]" />
      <div className="absolute bottom-[-15%] left-[25%] h-[460px] w-[460px] rounded-full bg-[#D4AF37]/[0.008] blur-[140px]" />
    </div>
  );
}

function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 45%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay"
      style={{ backgroundImage: NOISE_BG }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Reveal wrapper — calm scroll-triggered stagger                      */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, decimals = 0, duration = 1.2) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return { ref, display: value.toFixed(decimals) };
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="mb-5 md:mb-6">
      <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-[#9CA3AF]">{subtitle}</p>}
    </motion.div>
  );
}

/**
 * GlassCard — the core premium surface used everywhere on the page.
 * Calm, static presentation: no mouse-tracking tilt or glow, a tiny
 * 2px lift on hover, and a subtle static gold-tinted border on hover.
 */
function GlassCard({
  className = "",
  children,
  glow = false,
}: {
  className?: string;
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <motion.div variants={fadeUp} className={`group relative rounded-2xl ${className}`}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="relative z-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111111]/85 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 group-hover:border-[#D4AF37]/20 group-hover:shadow-[0_14px_36px_-14px_rgba(0,0,0,0.6)]"
      >
        {/* faint top sheen for a premium reflection feel */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        {glow && (
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4AF37]/[0.03] blur-3xl" />
        )}

        <div className="relative">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function CircularScore({ score }: { score: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const { ref: countRef, display } = useCountUp(score, 0, 1.4);

  return (
    <div
      ref={ref}
      className="relative flex h-48 w-48 shrink-0 items-center justify-center sm:h-56 sm:w-56"
    >
      <svg viewBox="0 0 168 168" className="h-full w-full -rotate-90">
        <circle
          cx="84"
          cy="84"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
        />
        <motion.circle
          cx="84"
          cy="84"
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            inView
              ? { strokeDashoffset: circumference - (circumference * score) / 100 }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GOLD_LIGHT} />
            <stop offset="100%" stopColor={GOLD} />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span ref={countRef} className="text-4xl font-semibold text-white sm:text-5xl">
          {display}
        </span>
        <span className="mt-1 text-xs uppercase tracking-wider text-[#9CA3AF]">
          / 100 AI Score
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 24px 0 rgba(212,175,55,0.06)" }}
      />
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-[#9CA3AF]">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white sm:text-2xl">{value}</p>
    </div>
  );
}

function Sparkline({ up = true }: { up?: boolean }) {
  const points = up
    ? "0,20 15,16 30,18 45,10 60,12 75,4 90,6 105,0"
    : "0,2 15,6 30,4 45,10 60,9 75,14 90,13 105,20";
  const color = up ? "#4ADE80" : "#F87171";

  return (
    <svg viewBox="0 0 105 22" className="h-6 w-20" preserveAspectRatio="none">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}

function PriorityBadge({ priority }: { priority: "Urgent" | "High" | "Medium" }) {
  const styles: Record<string, string> = {
    Urgent: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    High: "bg-[#D4AF37]/10 text-[#F3D87A] border-[#D4AF37]/25",
    Medium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function AnimatedBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3D87A]"
        initial={{ width: "0%" }}
        animate={inView ? { width: `${value}%` } : { width: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/**
 * PremiumButton — calm luxury CTA. Tiny lift on hover, soft static
 * shadow, no cursor tracking.
 */
function PremiumButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="relative inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37] to-[#F3D87A] px-6 py-3 text-sm font-semibold text-black shadow-[0_6px_20px_rgba(212,175,55,0.12)] transition-shadow duration-300 hover:shadow-[0_8px_26px_rgba(212,175,55,0.18)]"
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function InsightsPage() {
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

  const forecastMax = useMemo(() => Math.max(...revenueForecast.map((d) => d.revenue)), []);

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <AmbientBackground />
      <Vignette />
      <NoiseOverlay />

      <Sidebar />

      <div className="relative z-10 flex min-h-screen flex-1 flex-col">
        <DashboardHeader email={email} onSignOut={handleSignOut} />

        <main className="flex-1 overflow-x-hidden px-4 py-8 md:px-6 md:py-10 xl:px-8">
          <div className="mx-auto max-w-[1680px] min-w-0">
            {/* Page heading */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="mb-8 md:mb-10"
            >
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                AI Insights
              </h1>
              <p className="mt-2 text-sm text-[#9CA3AF] md:text-base">
                AI-powered business intelligence for your Shopify store.
              </p>
            </motion.div>

            {/* Executive AI Summary */}
            <motion.div initial="hidden" animate="show" variants={staggerContainer} className="mb-6 md:mb-8">
              <GlassCard glow>
                <div className="flex flex-col items-center gap-8 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:p-10">
                  <CircularScore score={96} />

                  <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8">
                    <StatBlock label="Confidence" value="94%" />
                    <StatBlock label="Predicted Revenue Growth" value="+18%" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#9CA3AF]">
                        Overall Business Health
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xl font-semibold text-[#F3D87A] sm:text-2xl">
                        <Sparkles className="h-5 w-5" />
                        Excellent
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Insight Cards */}
            <Reveal className="mb-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:mb-10 lg:grid-cols-3">
              {insightCards.map((card) => {
                const Icon = card.icon;
                return (
                  <GlassCard key={card.id} className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#F3D87A]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Sparkline up={card.trendUp} />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-wider text-[#9CA3AF]">
                      {card.label}
                    </p>
                    <p className="mt-1 truncate text-lg font-semibold text-white">{card.value}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-[#9CA3AF]">{card.sub}</span>
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          card.trendUp ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {card.trendUp ? (
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5" />
                        )}
                        {card.trend}
                      </span>
                    </div>
                  </GlassCard>
                );
              })}
            </Reveal>

            {/* Revenue Prediction Chart */}
            <Reveal className="mb-8 md:mb-10">
              <GlassCard glow className="p-5 sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                      Revenue Prediction
                    </h2>
                    <p className="mt-1 text-sm text-[#9CA3AF]">Next 30 days, AI forecasted</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#F3D87A]">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +18% projected
                  </span>
                </div>

                <div className="h-[220px] w-full min-w-0 sm:h-[280px] md:h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueForecast} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGold" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={GOLD_LIGHT} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis
                        dataKey="day"
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.3)"
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                        domain={[0, Math.ceil(forecastMax * 1.15)]}
                        width={48}
                      />
                      <Tooltip
                        cursor={{ stroke: "rgba(212,175,55,0.35)", strokeWidth: 1 }}
                        contentStyle={{
                          background: "#111111",
                          border: "1px solid rgba(212,175,55,0.25)",
                          borderRadius: 12,
                          color: "#fff",
                          fontSize: 12,
                          boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                        }}
                        labelStyle={{ color: "#9CA3AF" }}
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke={GOLD}
                        strokeWidth={2}
                        fill="url(#revenueGold)"
                        animationDuration={1200}
                        animationEasing="ease-out"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </Reveal>

            {/* Top AI Recommendations */}
            <section className="mb-8 md:mb-10">
              <Reveal>
                <SectionHeading
                  title="Top AI Recommendations"
                  subtitle="Prioritized actions based on your store's live performance."
                />
                <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
                  {recommendations.map((rec) => {
                    const Icon = rec.icon;
                    return (
                      <GlassCard key={rec.id} className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#F3D87A]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-medium text-white">{rec.title}</p>
                              <PriorityBadge priority={rec.priority} />
                            </div>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#9CA3AF]">
                              {rec.detail}
                            </p>

                            <div className="mt-3 flex items-center justify-between text-xs">
                              <span className="text-[#9CA3AF]">
                                AI confidence{" "}
                                <span className="font-medium text-white">{rec.confidence}%</span>
                              </span>
                              <span className="font-medium text-emerald-400">{rec.impact}</span>
                            </div>
                            <div className="mt-2">
                              <AnimatedBar value={rec.confidence} />
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </Reveal>
            </section>

            {/* Inventory Intelligence */}
            <section className="mb-8 md:mb-10">
              <Reveal>
                <SectionHeading
                  title="Inventory Intelligence"
                  subtitle="AI-monitored stock health across your catalog."
                />
                <div className="grid min-w-0 grid-cols-2 gap-4 lg:grid-cols-4">
                  {inventoryIntelligence.map((item) => {
                    const Icon = item.icon;
                    const toneClasses =
                      item.tone === "danger"
                        ? "text-rose-400 bg-rose-500/10 border-rose-500/20"
                        : item.tone === "warning"
                        ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        : "text-[#F3D87A] bg-[#D4AF37]/10 border-[#D4AF37]/20";
                    return (
                      <GlassCard key={item.id} className="p-5">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-lg border ${toneClasses}`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <p className="mt-3 text-2xl font-semibold text-white">{item.count}</p>
                        <p className="mt-0.5 text-xs uppercase tracking-wider text-[#9CA3AF]">
                          {item.label}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">{item.note}</p>
                      </GlassCard>
                    );
                  })}
                </div>
              </Reveal>
            </section>

            {/* Customer Intelligence */}
            <section className="mb-8 md:mb-10">
              <Reveal>
                <SectionHeading
                  title="Customer Intelligence"
                  subtitle="Understand who drives your revenue."
                />
                <div className="grid min-w-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {customerIntelligence.map((item) => {
                    const Icon = item.icon;
                    return (
                      <GlassCard key={item.id} className="p-5 text-center sm:text-left">
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#F3D87A] sm:mx-0">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
                        <p className="mt-0.5 text-xs uppercase tracking-wider text-[#9CA3AF]">
                          {item.label}
                        </p>
                      </GlassCard>
                    );
                  })}
                </div>
              </Reveal>
            </section>

            {/* Growth Opportunities */}
            <section className="mb-8 md:mb-10">
              <Reveal>
                <SectionHeading
                  title="Growth Opportunities"
                  subtitle="Ranked by projected return on investment."
                />
                <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {growthOpportunities.map((op) => {
                    const Icon = op.icon;
                    return (
                      <GlassCard key={op.id} className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#F3D87A]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-lg font-semibold text-[#F3D87A]">{op.roi}</span>
                        </div>
                        <p className="mt-4 font-medium text-white">{op.title}</p>
                        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-[#9CA3AF]">Revenue Potential</p>
                            <p className="mt-0.5 font-medium text-white">{op.revenue}</p>
                          </div>
                          <div>
                            <p className="text-[#9CA3AF]">Difficulty</p>
                            <p className="mt-0.5 font-medium text-white">{op.difficulty}</p>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </Reveal>
            </section>

            {/* AI Timeline */}
            <section className="mb-8 md:mb-10">
              <Reveal>
                <SectionHeading
                  title="AI Timeline"
                  subtitle="What ShopPilot AI recommends acting on, and when."
                />
                <GlassCard className="p-5 sm:p-6 lg:p-8">
                  <div className="relative">
                    <div className="absolute bottom-0 left-[15px] top-0 w-px overflow-hidden sm:left-[19px]">
                      <div className="absolute inset-0 bg-white/[0.06]" />
                      <motion.div
                        className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/30 to-transparent"
                        style={{ height: "100%" }}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <div className="flex flex-col gap-8">
                      {timeline.map((stage, i) => (
                        <motion.div
                          key={stage.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          className="relative flex gap-4 sm:gap-5"
                        >
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#111111] text-[#F3D87A] sm:h-10 sm:w-10">
                            <Clock className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1 pt-1">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#F3D87A]">
                              {stage.label}
                            </p>
                            <ul className="mt-2 space-y-1.5">
                              {stage.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#D4AF37]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            </section>

            {/* Bottom AI Score Card */}
            <Reveal className="mb-2">
              <GlassCard glow className="overflow-hidden">
                <div className="relative px-6 py-10 text-center sm:px-10 sm:py-14">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 40%, rgba(212,175,55,0.05), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <Sparkles className="mx-auto h-6 w-6 text-[#F3D87A]" />
                    <p className="mx-auto mt-4 max-w-xl text-xl font-semibold leading-snug text-white sm:text-2xl md:text-3xl">
                      Your store is healthier than{" "}
                      <span className="text-[#F3D87A]">89%</span> of Shopify stores.
                    </p>
                    <div className="mt-7 flex justify-center">
                      <PremiumButton>
                        Review Full AI Report
                        <ArrowUpRight className="h-4 w-4" />
                      </PremiumButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}