"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/next-backend/supabase/client"; 
import { Loader2, Mail, Lock, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard"); 
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMessage("Account created! Please check your email inbox to verify your account.");
        setIsLogin(true); 
        setPassword(""); 
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      
      {/* ========================== */}
      {/* LEFT SIDE: THE AUTH FORM   */}
      {/* ========================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl lg:shadow-none lg:bg-transparent lg:border-none border border-slate-100 p-8 lg:p-0">
          
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl lg:text-4xl font-black text-[#2d132e] mb-2">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h1>
            <p className="text-slate-500 text-sm lg:text-base">
              {isLogin 
                ? "Enter your details to access your dashboard." 
                : "Join the community to report and find lost items."}
            </p>
          </div>

          {/* ERROR MESSAGE BOX */}
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-6 border border-red-100 font-medium">
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE BOX */}
          {successMessage && (
            <div className="bg-green-50 text-green-700 text-sm p-4 rounded-xl mb-6 border border-green-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
              <p className="font-medium">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#2d132e] mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 lg:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dd7230] focus:border-transparent transition-all"
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#2d132e] mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 lg:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#dd7230] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#dd7230] text-white font-bold py-4 rounded-xl hover:bg-[#c56024] transition-colors flex items-center justify-center shadow-lg shadow-orange-500/20 disabled:bg-slate-400 mt-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? "Sign In" : "Sign Up")}
            </button>
          </form>

          <div className="mt-8 text-center lg:text-left text-sm text-slate-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setSuccessMessage(null);
              }} 
              className="text-[#dd7230] font-bold hover:underline"
            >
              {isLogin ? "Sign up here" : "Log in here"}
            </button>
          </div>
          
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative bg-white items-center justify-center p-12 border-l border-slate-100">
        
        <div className="relative -mt-6 w-full max-w-lg aspect-square">
          <Image 
            src="/loginimg.png" 
            alt="Lossie AI Tracker"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute mb-10 bottom-12 text-center w-full px-12">
          <h2 className="text-3xl font-black text-[#2d132e] mb-2">
            Smart Campus <span className="text-[#dd7230]">Tracker</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Powered by AI visual matching.
          </p>
        </div>
      </div>

    </div>
  );
}