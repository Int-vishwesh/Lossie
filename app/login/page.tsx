"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/next-backend/supabase/client"; 
import { Loader2, Mail, Lock, CheckCircle2, Github, Hash, Building2, Home } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Base Auth State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // New Extra Profile State
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [residence, setResidence] = useState("day_scholar");

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const router = useRouter();
  
  const supabase = createClient();

  // --- EMAIL / PASSWORD HANDLER ---
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (isLogin) {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = "/dashboard";
      } else {
        // Sign Up WITH Extra Data
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              roll_no: rollNo,
              department: department,
              residence_type: residence,
            }
          }
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

  // --- GITHUB OAUTH HANDLER ---
  const handleGithubLogin = async () => {
    setIsGithubLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-orange-100">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 z-10 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl lg:shadow-none lg:bg-transparent lg:border-none border border-slate-100 p-6 lg:p-0 my-4">
          
          <div className="text-center lg:text-left mb-4">
            <h1 className="text-2xl lg:text-3xl font-black text-[#2d132e] mb-1">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h1>
            <p className="text-slate-500 text-xs lg:text-sm">
              {isLogin 
                ? "Enter your details to access your dashboard." 
                : "Join the community to report and find lost items."}
            </p>
          </div>

          {/* error msg */}
          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-2.5 rounded-lg mb-4 border border-red-100 font-medium">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 text-green-700 text-xs p-2.5 rounded-lg mb-4 border border-green-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-500" />
              <p className="font-medium">{successMessage}</p>
            </div>
          )}

          <button
            onClick={handleGithubLogin}
            disabled={isGithubLoading || isLoading}
            className="w-full bg-[#24292e] text-white font-bold py-2.5 rounded-xl hover:bg-[#2f363d] transition-colors flex items-center justify-center gap-2 shadow-md disabled:bg-slate-400 mb-4 text-sm"
          >
            {isGithubLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Github className="w-5 h-5" />}
            Continue with GitHub
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold">
              <span className="bg-white lg:bg-orange-100 px-3 text-slate-400">Or sign {isLogin ? "in" : "up"} with email</span>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-3">
            {!isLogin && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <div>
                  <label className="block text-xs font-bold text-[#2d132e] mb-1 ml-1">Roll Number</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required={!isLogin}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 lg:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd7230] focus:border-transparent transition-all"
                      placeholder="e.g. 2230896"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d132e] mb-1 ml-1">Department</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required={!isLogin}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 lg:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd7230] focus:border-transparent transition-all"
                      placeholder="e.g. B.Tech CSE"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d132e] mb-1 ml-1">Residence Status</label>
                  <div className="flex gap-2">
                    <label
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer font-semibold text-sm transition-all ${
                        residence === "day_scholar"
                          ? "border-[#dd7230] bg-orange-50 text-[#dd7230]"
                          : "border-slate-200 bg-slate-50 lg:bg-white text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="residence"
                        value="day_scholar"
                        checked={residence === "day_scholar"}
                        onChange={(e) => setResidence(e.target.value)}
                        className="sr-only"
                      />
                      <Home className="w-4 h-4" />
                      Day Scholar
                    </label>
                    <label
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer font-semibold text-sm transition-all ${
                        residence === "hosteller"
                          ? "border-[#dd7230] bg-orange-50 text-[#dd7230]"
                          : "border-slate-200 bg-slate-50 lg:bg-white text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="residence"
                        value="hosteller"
                        checked={residence === "hosteller"}
                        onChange={(e) => setResidence(e.target.value)}
                        className="sr-only"
                      />
                      <Building2 className="w-4 h-4" />
                      Hosteller
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* email & password */}
            <div>
              <label className="block text-xs font-bold text-[#2d132e] mb-1 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 lg:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd7230] focus:border-transparent transition-all"
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2d132e] mb-1 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 lg:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dd7230] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGithubLoading}
              className="w-full bg-[#dd7230] text-white font-bold py-3 rounded-xl hover:bg-[#c56024] transition-colors flex items-center justify-center shadow-lg shadow-orange-500/20 disabled:bg-slate-400 mt-3 text-sm"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-500">
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

      {/* banner */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-orange-100 items-center justify-center p-12 border-l border-orange-200">
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
