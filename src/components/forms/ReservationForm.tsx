"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Coin } from "@/types/coin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface ReservationFormProps {
  coin: Coin;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  notes: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  agreedToTerms?: string;
  submit?: string;
}

export function ReservationForm({ coin }: ReservationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          product: `${coin.name} (SKU: ${coin.sku})`,
          quantity: 1,
          notes: formData.notes || undefined,
          agreedToTerms: formData.agreedToTerms,
          // Additional coin details for the order
          coinSku: coin.sku,
          coinPrice: coin.price,
          coinPriceType: coin.priceType,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to confirmation page
        router.push(`/order/${data.orderId}?coin=${coin.sku}`);
      } else {
        setErrors({
          submit: data.message || "Failed to submit reservation. Please try again.",
        });
      }
    } catch {
      setErrors({
        submit: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Calculate display price
  const displayPrice =
    coin.priceType === "call"
      ? "Call for Price"
      : coin.price > 0
        ? `$${coin.price.toLocaleString()}`
        : "Spot + Premium";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Order Summary */}
      <div className="bg-dark-elevated rounded-lg p-4 mb-4">
        <p className="text-sm text-[var(--color-muted)]">Reserving:</p>
        <p className="text-[var(--color-text)] font-medium">{coin.shortName}</p>
        <p className="text-gold-400 font-mono text-lg mt-1">{displayPrice}</p>
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-[var(--color-text)] mb-1"
        >
          Full Name *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Smith"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--color-text)] mb-1"
        >
          Email Address *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[var(--color-text)] mb-1"
        >
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-[var(--color-text)] mb-1"
        >
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any questions or special requests..."
          rows={3}
          className="
            w-full px-4 py-2 rounded-lg
            bg-dark-elevated border border-[var(--color-line)]
            text-[var(--color-text)] placeholder-[var(--color-muted)]
            focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400/50
            transition-colors
          "
        />
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="agreedToTerms"
          name="agreedToTerms"
          type="checkbox"
          checked={formData.agreedToTerms}
          onChange={handleChange}
          className="mt-1 w-4 h-4 rounded border-[var(--color-line)] bg-dark-elevated text-gold-400 focus:ring-gold-400"
        />
        <label
          htmlFor="agreedToTerms"
          className="text-sm text-[var(--color-muted)]"
        >
          I understand this is a reservation request. Payment instructions will
          be sent via email. Coins are held for 72 hours pending payment.
        </label>
      </div>
      {errors.agreedToTerms && (
        <p className="text-red-400 text-xs">{errors.agreedToTerms}</p>
      )}

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <p className="text-red-400 text-sm">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full py-3
          bg-gold-gradient text-dark-primary font-semibold
          hover:shadow-gold-lg
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        "
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting...
          </span>
        ) : (
          "Reserve This Coin"
        )}
      </Button>

      {/* Security Note */}
      <p className="text-xs text-center text-[var(--color-muted)]">
        Your information is secure and will only be used to process your order.
      </p>
    </form>
  );
}
