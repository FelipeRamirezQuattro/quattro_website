"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide more details"),
  consent: z.boolean().refine((v) => v, "You must agree before submitting"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  "AI Solutions & Automation",
  "Custom Application Development",
  "Modern Website Design",
  "QuickBooks Integration Apps",
  "Microsoft Power Apps",
  "Staffing Solutions",
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      consent: false,
      service: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          service: values.service,
          message: values.message,
          source: "contact-page",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Failed to submit form");
      }

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-quattro-border-light shadow-lg p-5 sm:p-8">
      <h2 className="font-display font-bold text-xl sm:text-2xl text-quattro-text-dark mb-2">
        Send Us a Message
      </h2>
      <p className="font-body text-sm sm:text-base text-slate-500 mb-5 sm:mb-6">
        Tell us what you are building and we will get back within one business
        day.
      </p>

      {submitted ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-start gap-3">
          <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-body font-semibold text-green-900">
              Message Sent
            </p>
            <p className="font-body text-sm text-green-700">
              Thank you. Our team will contact you shortly.
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3.5 sm:space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" error={errors.name?.message}>
              <input
                {...register("name")}
                className="w-full h-11 px-3 rounded-lg border border-quattro-border-light focus:outline-none focus:ring-2 focus:ring-quattro-primary/30"
              />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                className="w-full h-11 px-3 rounded-lg border border-quattro-border-light focus:outline-none focus:ring-2 focus:ring-quattro-primary/30"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone" error={errors.phone?.message}>
              <input
                {...register("phone")}
                className="w-full h-11 px-3 rounded-lg border border-quattro-border-light focus:outline-none focus:ring-2 focus:ring-quattro-primary/30"
              />
            </Field>

            <Field label="Company" error={errors.company?.message}>
              <input
                {...register("company")}
                className="w-full h-11 px-3 rounded-lg border border-quattro-border-light focus:outline-none focus:ring-2 focus:ring-quattro-primary/30"
              />
            </Field>
          </div>

          <Field label="Service" error={errors.service?.message}>
            <select
              {...register("service")}
              className="w-full h-11 px-3 rounded-lg border border-quattro-border-light bg-white focus:outline-none focus:ring-2 focus:ring-quattro-primary/30"
            >
              <option value="">Select a service</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Message" error={errors.message?.message}>
            <textarea
              rows={5}
              {...register("message")}
              className="w-full px-3 py-2 rounded-lg border border-quattro-border-light focus:outline-none focus:ring-2 focus:ring-quattro-primary/30"
            />
          </Field>

          <div>
            <label className="inline-flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1"
              />
              <span className="font-body text-sm text-slate-600">
                I consent to Quattro Software storing my submitted information
                so they can respond to my inquiry.
              </span>
            </label>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-1">
                {errors.consent.message}
              </p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </Button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block font-body text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
