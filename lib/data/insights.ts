import type {
  Insight,
  HistoryItem,
  TypeStyle,
  InsightType,
  DashboardStats,
} from "@/types/insight";

export const typeStyles: Record<InsightType, TypeStyle> = {
  sales: { label: "Sales", color: "#E8B65A", bg: "rgba(232,182,90,0.07)" },
  inventory: { label: "Inventory", color: "#8AB4F8", bg: "rgba(138,180,248,0.07)" },
  product: { label: "Product", color: "#4ADE80", bg: "rgba(74,222,128,0.07)" },
  customer: { label: "Customer", color: "#F0A8E0", bg: "rgba(240,168,224,0.07)" },
};

export const initialInsights: Insight[] = [
  {
    id: "1",
    type: "sales",
    headline: "Sales dropped 18% vs. your 7-day average",
    detail:
      "This is your lowest Tuesday in 6 weeks — worth checking if your top ad set paused overnight.",
    status: "active",
    isTopPriority: true,
  },
  {
    id: "2",
    type: "inventory",
    headline: '"Aria Tote" sells out in ~3 days at current pace',
    detail:
      "This is your #2 bestseller this month. Consider reordering before the weekend rush.",
    status: "active",
  },
  {
    id: "3",
    type: "product",
    headline: '"Linen Wrap" is up 63% week-over-week',
    detail:
      "This product is trending faster than any other item in your catalog right now.",
    status: "active",
  },
  {
    id: "4",
    type: "customer",
    headline: "12 repeat customers haven't ordered in 45+ days",
    detail:
      "These customers used to order every 3-4 weeks. A win-back offer could bring several back.",
    status: "active",
  },
  {
    id: "5",
    type: "sales",
    headline: "Weekend revenue pace is ahead of last month",
    detail:
      "Saturday and Sunday combined are running 11% above the same weekend last month.",
    status: "active",
  },
];

export const insightHistory: HistoryItem[] = [
  {
    id: "h1",
    type: "inventory",
    headline: 'Reordered "Aria Tote" before it sold out',
    date: "Yesterday",
  },
  {
    id: "h2",
    type: "customer",
    headline: "Sent a win-back offer to 8 lapsed customers",
    date: "2 days ago",
  },
  {
    id: "h3",
    type: "product",
    headline: '"Summer Linen Set" flagged as trending',
    date: "4 days ago",
  },
];

export const mockStats: DashboardStats = {
  revenueToday: "$1,842",
  revenueChange: "6%",
  revenueTrend: "up",
  orders: 27,
  ordersChange: "4%",
  ordersTrend: "down",
  newCustomers: 6,
  newCustomersChange: "2%",
  newCustomersTrend: "up",
};