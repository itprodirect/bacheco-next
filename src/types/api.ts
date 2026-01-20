export interface SpotPriceResponse {
  spotPrice: number;
  currency: string;
  source: string;
  timestamp: string;
  isFallback: boolean;
}

export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
