import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import { SHOPIFY_API_VERSION } from "@/lib/shopify/config";
import {
  ShopifyApiError,
  type ShopifyStore,
  type ShopInfo,
  type ShopifyOrder,
  type ShopifyProduct,
} from "@/lib/shopify/types";

export async function getStore(shopDomain: string): Promise<ShopifyStore | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("shop_domain", shopDomain)
    .maybeSingle();

  if (error) {
    throw new ShopifyApiError("Failed to look up store in Supabase", {
      shopDomain,
      supabaseError: error.message,
    });
  }

  return data as ShopifyStore | null;
}

async function shopifyGraphQLRequest<T>(
  shopDomain: string,
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(
      `https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
      }
    );
  } catch (networkError) {
    throw new ShopifyApiError("Network error calling Shopify Admin API", {
      shopDomain,
      cause:
        networkError instanceof Error
          ? networkError.message
          : String(networkError),
    });
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new ShopifyApiError(
      `Shopify Admin API returned ${response.status}`,
      { shopDomain, status: response.status, body }
    );
  }

  const json = await response.json();

  if (json.errors) {
    throw new ShopifyApiError("Shopify Admin API returned GraphQL errors", {
      shopDomain,
      errors: json.errors,
    });
  }

  return json.data as T;
}

export async function getShopifyClient(shopDomain: string) {
  const store = await getStore(shopDomain);

  if (!store) {
    throw new ShopifyApiError("No connected store found for this domain", {
      shopDomain,
    });
  }

  const accessToken = store.access_token;

  return {
    shopDomain,

    async getShopInfo(): Promise<ShopInfo> {
      const query = `
        query ShopInfo {
          shop {
            id
            name
            email
            myshopifyDomain
            currencyCode
            primaryDomain {
              url
            }
          }
        }
      `;

      const data = await shopifyGraphQLRequest<{
        shop: {
          id: string;
          name: string;
          email: string | null;
          myshopifyDomain: string;
          currencyCode: string;
          primaryDomain: { url: string };
        };
      }>(shopDomain, accessToken, query);

      return {
        id: data.shop.id,
        name: data.shop.name,
        email: data.shop.email,
        myshopifyDomain: data.shop.myshopifyDomain,
        currencyCode: data.shop.currencyCode,
        primaryDomainUrl: data.shop.primaryDomain.url,
      };
    },

    async getOrders(limit: number = 10): Promise<ShopifyOrder[]> {
      const query = `
        query Orders($first: Int!) {
          orders(first: $first, sortKey: CREATED_AT, reverse: true) {
            edges {
              node {
                id
                name
                createdAt
                displayFinancialStatus
                displayFulfillmentStatus
                totalPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
                customer {
                  displayName
                }
              }
            }
          }
        }
      `;

      const data = await shopifyGraphQLRequest<{
        orders: {
          edges: Array<{
            node: {
              id: string;
              name: string;
              createdAt: string;
              displayFinancialStatus: string | null;
              displayFulfillmentStatus: string | null;
              totalPriceSet: {
                shopMoney: { amount: string; currencyCode: string };
              };
              customer: { displayName: string } | null;
            };
          }>;
        };
      }>(shopDomain, accessToken, query, { first: limit });

      return data.orders.edges.map(({ node }) => ({
        id: node.id,
        name: node.name,
        createdAt: node.createdAt,
        totalPrice: node.totalPriceSet.shopMoney.amount,
        currencyCode: node.totalPriceSet.shopMoney.currencyCode,
        financialStatus: node.displayFinancialStatus,
        fulfillmentStatus: node.displayFulfillmentStatus,
        customerName: node.customer?.displayName ?? null,
      }));
    },

    async getProducts(limit: number = 10): Promise<ShopifyProduct[]> {
      const query = `
        query Products($first: Int!) {
          products(first: $first, sortKey: UPDATED_AT, reverse: true) {
            edges {
              node {
                id
                title
                status
                totalInventory
                priceRangeV2 {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                  }
                }
              }
            }
          }
        }
      `;

      const data = await shopifyGraphQLRequest<{
        products: {
          edges: Array<{
            node: {
              id: string;
              title: string;
              status: string;
              totalInventory: number;
              priceRangeV2: {
                minVariantPrice: { amount: string; currencyCode: string };
                maxVariantPrice: { amount: string };
              };
            };
          }>;
        };
      }>(shopDomain, accessToken, query, { first: limit });

      return data.products.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        status: node.status,
        totalInventory: node.totalInventory,
        priceMin: node.priceRangeV2.minVariantPrice.amount,
        priceMax: node.priceRangeV2.maxVariantPrice.amount,
        currencyCode: node.priceRangeV2.minVariantPrice.currencyCode,
      }));
    },
  };
}