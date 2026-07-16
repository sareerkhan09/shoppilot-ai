export type InsightType = "sales" | "inventory" | "product" | "customer";
export type InsightStatus = "active" | "done" | "dismissed";

export interface Insight {
  id: string;
  type: InsightType;
  headline: string;
  detail: string;
  status: InsightStatus;
  isTopPriority?: boolean;
}

export interface HistoryItem {
  id: string;
  type: InsightType;
  headline: string;
  date: string;
}

export interface TypeStyle {
  label: string;
  color: string;
  bg: string;
}

export interface DashboardStats {
  revenueToday: string;
  revenueChange: string;
  revenueTrend: "up" | "down";
  orders: number;
  ordersChange: string;
  ordersTrend: "up" | "down";
  newCustomers: number;
  newCustomersChange: string;
  newCustomersTrend: "up" | "down";
}