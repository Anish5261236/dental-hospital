"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema, type AppointmentInput } from "@/lib/validations";

type Service = { id: number; title: string };

export default function AppointmentForm({ services }: { services: Service[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
  });

  async function onSubmit(data: AppointmentInput) {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-sage/10 border border-sage/30 rounded-2xl p-8 text-center">
        <h3 className="font-display text-2xl text-ink">Request received!</h3>
        <p className="mt-2 text-ink-soft">
          We&rsquo;ll call you shortly to confirm your appointment time.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-coral hover:text-coral-dark"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            className="input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            className="input"
            placeholder="10-digit mobile number"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email (optional)" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            className="input"
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Preferred Date (optional)" error={errors.preferredDate?.message}>
          <input {...register("preferredDate")} type="date" className="input" />
        </Field>
      </div>

      <Field label="Service" error={errors.serviceId?.message}>
        <select {...register("serviceId")} className="input" defaultValue="">
          <option value="">Select a treatment (optional)</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message (optional)" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={4}
          className="input resize-none"
          placeholder="Tell us anything that will help us prepare for your visit"
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-coral-dark">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto bg-coral hover:bg-coral-dark disabled:opacity-60 transition-colors text-white font-medium px-8 py-3.5 rounded-full"
      >
        {status === "submitting" ? "Sending..." : "Request Appointment"}
      </button>

      <style jsx global>{`
        .input {
          width: 100%;
          background: white;
          border: 1px solid rgba(18, 51, 46, 0.12);
          border-radius: 0.75rem;
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
          color: var(--ink);
        }
        .input::placeholder {
          color: rgba(18, 51, 46, 0.4);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-mono-tag uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-coral-dark mt-1 block">{error}</span>}
    </label>
  );
}
