export type OrderStatus =
  | "pending_confirmation"
  | "pending_payment"
  | "payment_received"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  sku: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  premium: number;
  spotPriceAtOrder: number;
}

export interface OrderRequest {
  name: string;
  email: string;
  phone?: string;
  product: string; // SKU
  quantity: number;
  shippingAddress?: string;
  notes?: string;
  agreedToTerms: boolean;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
  wireInstructions?: WireInstructions;
  orderSummary?: OrderSummary;
}

export interface WireInstructions {
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountName: string;
  reference: string;
  paymentDeadline: string;
}

export interface OrderSummary {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
