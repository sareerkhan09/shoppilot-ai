import { NextResponse } from "next/server";
import { getShopifyClient } from "@/lib/shopify/client";
import { ShopifyApiError } from "@/lib/shopify/types";
import type { DashboardStats } from "@/types/insight";

const TEMP_SHOP_DOMAIN = "shoppilot-dev-qz8rxe0f.myshopify.com";

function isSameUTCDate(isoDate: string, reference: Date): boolean {
  const d = new Date(isoDate);
  return (
    d.getUTCFullYear() === reference.getUTCFullYear() &&
    d.getUTCMonth() === reference.getUTCMonth() &&
    d.getUTCDate() === reference.getUTCDate()
  );
}

export async function GET() {
  try {
    const client = await getShopifyClient(TEMP_SHOP_DOMAIN);

    const [shopInfo, orders, products] = await Promise.all([
      client.getShopInfo(),
      client.getOrders(50),
      client.getProducts(50),
    ]);

    const today = new Date();

    const todaysOrders = orders.filter((order) =>
      isSameUTCDate(order.createdAt, today)
    );

    const revenueTodayNumber = todaysOrders.reduce(
      (sum, order) => sum + parseFloat(order.totalPrice || "0"),
      0
    );

    const currencyCode = shopInfo.currencyCode || "USD";

    const revenueFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    });

    const stats: DashboardStats = {
      revenueToday: revenueFormatter.format(revenueTodayNumber),
      revenueChange: "—",
      revenueTrend: "up",

      orders: todaysOrders.length,
      ordersChange: "—",
      ordersTrend: "up",

      // Customer API temporarily disabled
      newCustomers: 0,
      newCustomersChange: "—",
      newCustomersTrend: "up",
    };

    return NextResponse.json({
      stats,
      meta: {
        shop: shopInfo.name,
        currencyCode,
        productsTracked: products.length,
        ordersFetched: orders.length,
        customersFetched: 0,
      },
    });
  } catch (error) {
    if (error instanceof ShopifyApiError) {
      console.error(
        "[dashboard/stats] Shopify API error:",
        error.message,
        error.context
      );

      return NextResponse.json(
        {
          error: "Failed to fetch data from Shopify",
          details: error.message,
        },
        { status: 502 }
      );
    }

    console.error("[dashboard/stats] Unexpected error:", error);

    return NextResponse.json(
      {
        error: "Unexpected server error while loading dashboard stats",
      },
      { status: 500 }
    );
  }
}