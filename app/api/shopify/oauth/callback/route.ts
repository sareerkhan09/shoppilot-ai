import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = request.cookies.get("shopify_oauth_state")?.value;

  if (!shop || !code) {
    return NextResponse.json(
      { error: "Missing shop or code" },
      { status: 400 }
    );
  }

  if (!state || state !== storedState) {
    return NextResponse.json(
      { error: "Invalid state — possible CSRF" },
      { status: 403 }
    );
  }

  const tokenResponse = await fetch(
    `https://${shop}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }),
    }
  );

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: "Failed to exchange token" },
      { status: 500 }
    );
  }

  const tokenData = await tokenResponse.json();
  const { access_token, scope } = tokenData;

  const supabase = await createClient();

  const { error } = await supabase
    .from("stores")
    .upsert(
      {
        shop_domain: shop,
        access_token,
        scope,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "shop_domain",
      }
    );

  if (error) {
    console.error("Supabase Error:", error);

    return NextResponse.json(
      { error: "Failed to save store" },
      { status: 500 }
    );
  }

  const redirectUrl = new URL(
    "/dashboard",
    process.env.NEXT_PUBLIC_APP_URL!
  );

  const response = NextResponse.redirect(redirectUrl);

  response.cookies.delete("shopify_oauth_state");

  return response;
}