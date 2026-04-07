"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  service: z.string().optional(),
});

type Fields = z.infer<typeof schema>;

const services = [
  "AI Solutions & Automation",
  "Custom Application",
  "Website Design",
  "QuickBooks Integration",
  "Microsoft Power Apps",
  "Staffing",
  "Other",
];

interface Props {
  source?: string;
  dark?: boolean;
}

export default function LeadCaptureForm({
  source = "cta",
  dark = true,
}: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Fields) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          message: `Interested in: ${data.service || "General"}`,
          source,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrMsg(json.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  };

  const inputCls = `w-full px-4 py-3 text-sm rounded-xl bg-transparent border focus:outline-none focus:ring-2 transition-colors ${
    dark
      ? "border-quattro-border-dark text-white placeholder-quattro-text-secondary/50 focus:ring-quattro-primary focus:border-quattro-primary"
      : "border-gray-200 text-quattro-text-dark placeholder-gray-400 focus:ring-quattro-primary focus:border-quattro-primary"
  }`;

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">✅</div>
        <p
          className={`font-display font-semibold text-lg ${dark ? "text-white" : "text-quattro-text-dark"}`}
        >
          Message received!
        </p>
        <p
          className={`font-body text-sm mt-1 ${dark ? "text-quattro-text-secondary" : "text-gray-500"}`}
        >
          We&#39;ll be in touch within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <input
            {...register("name")}
            placeholder="Your Name"
            className={inputCls}
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-quattro-error text-xs mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className={inputCls}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-quattro-error text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <select
        {...register("service")}
        className={`${inputCls} cursor-pointer`}
        defaultValue=""
      >
        <option value="" disabled>
          Service interested in (optional)
        </option>
        {services.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {status === "error" && (
        <p className="text-quattro-error text-sm">{errMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-quattro-primary hover:bg-quattro-primary-light text-white font-display font-semibold rounded-xl transition-all duration-200 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <LoadingSpinner size={16} /> Sending…
          </>
        ) : (
          <>
            Send Message <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
