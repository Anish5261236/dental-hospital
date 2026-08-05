"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SmileArc from "@/components/ui/SmileArc";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-porcelain px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display text-2xl italic text-ink">Sri Vasavi</span>
          <SmileArc className="mx-auto mt-2" />
          <p className="mt-3 text-sm text-ink-soft">Admin Login</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/70 border border-ink/5 rounded-2xl p-8 space-y-5"
        >
          <label className="block">
            <span className="text-xs font-mono-tag uppercase tracking-wide text-ink-soft">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full bg-white border border-ink/12 rounded-xl px-4 py-2.5 text-sm text-ink"
              placeholder="admin@srivasavidental.in"
            />
          </label>

          <label className="block">
            <span className="text-xs font-mono-tag uppercase tracking-wide text-ink-soft">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full bg-white border border-ink/12 rounded-xl px-4 py-2.5 text-sm text-ink"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            />
          </label>

          {error && <p className="text-sm text-coral-dark">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral hover:bg-coral-dark disabled:opacity-60 transition-colors text-white font-medium py-3 rounded-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
