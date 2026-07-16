export const SHOPIFY_API_VERSION = "2024-10";

export const SHOPIFY_SCOPES = [
  "read_orders",
  "read_products",
  "read_customers",
  "read_inventory",
].join(",");

export function getShopifyAuthUrl(shop: string, state: string) {
  const redirectUri = `${process.env.APP_URL}/api/shopify/oauth/callback`;

  const params = new URLSearchParams({
    client_id: process.env.SHOPIFY_API_KEY!,
    scope: SHOPIFY_SCOPES,
    redirect_uri: redirectUri,
    state,
  });

  return `https://${shop}/admin/oauth/authorize?${params.toString()}`;
}