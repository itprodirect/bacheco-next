"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { contactSchema, getZodErrors } from "@/lib/validation";
import { submitContact } from "@/lib/api";
import type { ContactResponse } from "@/types/api";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ContactResponse | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      setErrors(getZodErrors(result.error));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitContact(result.data);
      setSubmitResult(response);
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : "Failed to send message",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
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
          Message Sent!
        </h3>
        <p style={{ color: "var(--color-muted)" }}>
          {submitResult.message || "We'll get back to you as soon as possible."}
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

      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        <Input
          label="Email *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your@email.com"
        />
      </div>

      {/* Subject */}
      <Input
        label="Subject *"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="What is this regarding?"
      />

      {/* Message */}
      <div>
        <label
          className="block text-sm font-medium mb-1.5"
          style={{ color: "var(--color-text)" }}
        >
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 rounded-lg border transition-colors resize-none"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            borderColor: errors.message ? "rgb(239, 68, 68)" : "var(--color-line)",
          }}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
