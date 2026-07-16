/**
 * Row shape of the "stores" table in Supabase.
 */
export interface ShopifyStore {
  id: string;
  shop_domain: string;
  access_token: string;
  scope: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShopInfo {
  id: string;
  name: string;
  email: string | null;
  myshopifyDomain: string;
  currencyCode: string;
  primaryDomainUrl: string;
}

export interface ShopifyOrder {
  id: string;
  name: string;
  createdAt: string;
  totalPrice: string;
  currencyCode: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  customerName: string | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  status: string;
  totalInventory: number;
  priceMin: string;
  priceMax: string;
  currencyCode: string;
}

export interface ShopifyCustomer {
  id: string;
  displayName: string;
  email: string | null;
  numberOfOrders: number;
  amountSpent: string;
  currencyCode: string;
}

/**
 * Thrown for any failure talking to the Shopify Admin API —
 * network failure, non-200 response, or GraphQL-level errors.
 */
export class ShopifyApiError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ShopifyApiError";
  }
}