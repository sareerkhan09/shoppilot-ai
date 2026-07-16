import { NextRequest, NextResponse } from "next/server";
import { getShopifyAuthUrl } from "@/lib/shopify/config";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const shop = request.nextUrl.searchParams.get("shop");

  if (!shop || !shop.endsWith(".myshopify.com")) {
    return NextResponse.json(
      { error: "Missing or invalid 'shop' parameter" },
      { status: 400 }
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const authUrl = getShopifyAuthUrl(shop, state);

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
  });

  return response;
}