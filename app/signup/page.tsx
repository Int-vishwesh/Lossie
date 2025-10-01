
"use client";

import Link from "next/link";
import Image from "next/image"; 


export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 rounded-lg bg-amber-100 shadow-xl p-8">
        
        <div className="w-full md:w-1/2 max-w-md space-y-8">

          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-[#2d132e]">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              Get started with Lossie today
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email Input */}
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

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-[#dd7230] focus:border-[#dd7230]"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-[#dd7230] focus:border-[#dd7230]"
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-11 px-8 py-2 bg-[#dd7230] text-white font-medium rounded-md hover:bg-[#dd7230]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dd7230]"
            >
              Create Account
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#dd7230] hover:text-[#dd7230]/80">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right Side: The Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <Image
            src={'/signupimg.png'} // Replace with your image path
            alt="Illustration of AI helping reconnect lost and found items"
            width={500} // Adjust width/height as needed for aspect ratio
            height={500}
            className="max-w-full h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
}