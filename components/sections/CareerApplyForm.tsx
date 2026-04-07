"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";

const careerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  position: z.string().min(2, "Position is required"),
  message: z.string().min(10, "Please include a short introduction"),
});

type CareerFormData = z.infer<typeof careerSchema>;

export default function CareerApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerFormData>({ resolver: zodResolver(careerSchema) });

  const onSubmit = async (values: CareerFormData) => {
    setIsSubmitting(true);
    setStatus("idle");
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          service: `Career: ${values.position}`,
          message: values.message,
          source: "careers",
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || "Failed to submit application");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-quattro-border-dark bg-quattro-surface-dark p-5 sm:p-6">
      <h3 className="font-display text-xl sm:text-2xl text-white font-bold mb-2">
        Apply Now
      </h3>
      <p className="font-body text-sm text-quattro-text-secondary mb-4 sm:mb-5">
        Send us your details and we will follow up with next steps.
      </p>

      {status === "success" ? (
        <p className="text-green-400 text-sm">
          Application submitted successfully. We will contact you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full h-11 px-3 rounded-lg bg-quattro-surface-mid border border-quattro-border-dark text-white placeholder-quattro-text-secondary/60 focus:outline-none focus:border-quattro-accent"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full h-11 px-3 rounded-lg bg-quattro-surface-mid border border-quattro-border-dark text-white placeholder-quattro-text-secondary/60 focus:outline-none focus:border-quattro-accent"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("position")}
              placeholder="Position of Interest"
              className="w-full h-11 px-3 rounded-lg bg-quattro-surface-mid border border-quattro-border-dark text-white placeholder-quattro-text-secondary/60 focus:outline-none focus:border-quattro-accent"
            />
            {errors.position && (
              <p className="text-red-400 text-xs mt-1">
                {errors.position.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              rows={4}
              {...register("message")}
              placeholder="Short intro and relevant experience"
              className="w-full px-3 py-2 rounded-lg bg-quattro-surface-mid border border-quattro-border-dark text-white placeholder-quattro-text-secondary/60 focus:outline-none focus:border-quattro-accent"
            />
            {errors.message && (
              <p className="text-red-400 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      )}
    </div>
  );
}
