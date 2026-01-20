import type { OrderRequest, OrderResponse } from "@/types/order";
import type { ContactRequest, ContactResponse, SpotPriceResponse } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/**
 * Submit an order reservation
 */
export async function submitOrder(data: OrderRequest): Promise<OrderResponse> {
  const response = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to submit order");
  }

  return response.json();
}

/**
 * Submit a contact form
 */
export async function submitContact(data: ContactRequest): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to submit contact form");
  }

  return response.json();
}

/**
 * Fetch current spot price
 */
export async function fetchSpotPrice(): Promise<SpotPriceResponse> {
  const response = await fetch(`${API_BASE}/api/spot-price`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Cache for 5 minutes
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch spot price");
  }

  return response.json();
}
