"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { orderSchema, getZodErrors } from "@/lib/validation";
import { submitOrder } from "@/lib/api";
import {
  calculateSalePrice,
  calculateOrderTotal,
  formatCurrency,
} from "@/lib/pricing";
import type { Product } from "@/types/product";
import type { OrderResponse } from "@/types/order";

interface OrderFormProps {
  products: Product[];
  spotPrice: number;
  initialProduct?: string;
  initialQuantity?: number;
}

export function OrderForm({
  products,
  spotPrice,
  initialProduct,
  initialQuantity = 1,
}: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: initialProduct || "",
    quantity: initialQuantity,
    shippingAddress: "",
    notes: "",
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<OrderResponse | null>(null);

  const selectedProduct = products.find((p) => p.sku === formData.product);
  const pricePerCoin = selectedProduct
    ? calculateSalePrice(spotPrice, selectedProduct, formData.quantity)
    : 0;
  const total = selectedProduct
    ? calculateOrderTotal(spotPrice, selectedProduct, formData.quantity)
    : 0;

  const productOptions = products.map((p) => ({
    value: p.sku,
    label: p.shortName,
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value, 10) || 1 : value,
    }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitOrder(result.data);
      setSubmitResult(response);
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "Failed to submit order",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show confirmation if order was submitted
  if (submitResult?.success) {
    return (
      <div
        className="rounded-lg border p-6 text-center"
        style={{
          backgroundColor: "var(--color-card)",
          borderColor: "var(--color-accent)",
        }}
      >
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="var(--color-bg)"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Reservation Submitted!
        </h3>
        <p className="mb-4" style={{ color: "var(--color-muted)" }}>
          {submitResult.message}
        </p>
        {submitResult.orderId && (
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
            Reference: <strong>{submitResult.orderId}</strong>
          </p>
        )}
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          We&apos;ll send wire/ACH payment instructions to your email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Error */}
      {errors.form && (
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderColor: "rgb(239, 68, 68)",
          }}
        >
          <p className="text-sm text-red-500">{errors.form}</p>
        </div>
      )}

      {/* Contact Information */}
      <div>
        <h3
          className="font-semibold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="John Doe"
          />
          <Input
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="john@example.com"
          />
        </div>
        <div className="mt-4">
          <Input
            label="Phone (Optional)"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Order Details */}
      <div>
        <h3
          className="font-semibold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Order Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Product *"
            name="product"
            value={formData.product}
            onChange={handleChange}
            options={productOptions}
            placeholder="Select a product"
            error={errors.product}
          />
          <Input
            label="Quantity *"
            name="quantity"
            type="number"
            min={1}
            max={100}
            value={formData.quantity}
            onChange={handleChange}
            error={errors.quantity}
          />
        </div>
      </div>

      {/* Price Summary */}
      {selectedProduct && (
        <div
          className="rounded-lg border p-4"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-line)",
          }}
        >
          <h4
            className="font-semibold mb-3"
            style={{ color: "var(--color-text)" }}
          >
            Order Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "var(--color-muted)" }}>
                {selectedProduct.shortName} × {formData.quantity}
              </span>
              <span style={{ color: "var(--color-text)" }}>
                {formatCurrency(pricePerCoin)} each
              </span>
            </div>
            <div
              className="flex justify-between pt-2 border-t"
              style={{ borderColor: "var(--color-line)" }}
            >
              <span className="font-semibold" style={{ color: "var(--color-text)" }}>
                Estimated Total
              </span>
              <span className="font-bold" style={{ color: "var(--color-accent)" }}>
                {formatCurrency(total)}
              </span>
            </div>
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--color-muted)" }}>
            Final price confirmed upon payment receipt. Spot price may change.
          </p>
        </div>
      )}

      {/* Shipping Address */}
      <div>
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--color-text)" }}
        >
          Shipping Address (Optional)
        </label>
        <textarea
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border transition-colors resize-none"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            borderColor: "var(--color-line)",
          }}
          placeholder="We'll confirm shipping details via email"
        />
      </div>

      {/* Notes */}
      <div>
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--color-text)" }}
        >
          Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-2 rounded-lg border transition-colors resize-none"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            borderColor: "var(--color-line)",
          }}
          placeholder="Any special requests or questions"
        />
        {errors.notes && (
          <p className="mt-1.5 text-sm text-red-500">{errors.notes}</p>
        )}
      </div>

      {/* Terms Agreement */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1"
          />
          <span className="text-sm" style={{ color: "var(--color-muted)" }}>
            I agree to the{" "}
            <Link
              href="/terms"
              className="underline"
              style={{ color: "var(--color-accent)" }}
              target="_blank"
            >
              Terms of Service
            </Link>{" "}
            and understand that payment is via wire/ACH transfer only. *
          </span>
        </label>
        {errors.agreedToTerms && (
          <p className="mt-1.5 text-sm text-red-500">{errors.agreedToTerms}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Submit Reservation
      </Button>

      <p className="text-xs text-center" style={{ color: "var(--color-muted)" }}>
        This is a reservation, not a purchase. We&apos;ll confirm availability and
        send payment instructions.
      </p>
    </form>
  );
}
