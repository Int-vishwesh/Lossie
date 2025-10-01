// src/app/forgot-password/page.tsx
"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#2d132e]">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Enter your email address below to receive a password reset link.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-[#dd7230] focus:border-[#dd7230]"
            />
          </div>
          
          <button
            type="submit"
            className="w-full h-11 px-8 py-2 bg-[#dd7230] text-white font-medium rounded-md hover:bg-[#dd7230]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dd7230]"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link href="/sign-in" className="font-medium text-[#dd7230] hover:text-[#dd7230]/80">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}