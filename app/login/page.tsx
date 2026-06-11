"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-black">
          Login to SiteCtrl
        </h1>

        <p className="mt-2 text-slate-600">
          Continue monitoring your websites.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
        >
          <input
            className="input w-full"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            className="input w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            className="btn-primary w-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>
        </form>
          <div className="text-left">
  <Link
    href="/forgot-password"
    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
  >
    Forgot password?
  </Link>
</div>      
        <p className="mt-5 text-left text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link
            className="font-bold text-blue-600"
            href="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}   