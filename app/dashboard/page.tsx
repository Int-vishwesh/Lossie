"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/next-backend/supabase/client";
import { Loader2, Plus, Search, CheckCircle2, AlertCircle, PackageOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Defining the shape of our data based on your Python backend
type Item = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  status: string;
};

export default function DashboardPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        // 1. Get the logged-in user securely
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("User not found");
        }

        // 2. Fetch their specific items from FastAPI
        const response = await fetch(`http://127.0.0.1:8000/my-items/${user.id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch items from server");
        }

        const result = await response.json();
        setItems(result.data || []);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyItems();
  }, []);

  // EXACT LOADER YOU REQUESTED
  if (isLoading) {
    return (
      <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#dd7230] animate-spin mb-4" />
        <p className="text-[#2d132e] font-semibold animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  // Calculate stats for the user profile
  const lostCount = items.filter(item => item.category === 'lost').length;
  const foundCount = items.filter(item => item.category === 'found').length;
  const matchCount = items.filter(item => item.status === 'matched').length;

  return (
    <div className="min-h-screen bg-orange-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* ========================================== */}
        {/* ADDED: USER PROFILE & STATS HEADER         */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-slate-100 overflow-hidden flex-shrink-0 bg-slate-50 shadow-inner relative">
              <Image src="/yapp.png" alt="Profile" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#2d132e] mb-1">Jerry Aryan</h2>
              <p className="text-slate-600 font-medium text-sm md:text-base">B.Tech CSE Department</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">Roll: 2230896</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">Day Scholar</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 md:p-4 text-center shadow-sm">
              <p className="text-2xl font-black text-blue-600">{lostCount}</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-blue-800 tracking-wider mt-1">Lost</p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 md:p-4 text-center shadow-sm">
              <p className="text-2xl font-black text-green-600">{foundCount}</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-green-800 tracking-wider mt-1">Found</p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 md:p-4 text-center shadow-sm">
              <p className="text-2xl font-black text-orange-600">{matchCount}</p>
              <p className="text-[10px] md:text-xs font-bold uppercase text-orange-800 tracking-wider mt-1">Matches</p>
            </div>
          </div>
        </div>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#2d132e]">My Uploads</h1>
            <p className="text-slate-500 mt-1 font-medium">Track your reported lost and found items.</p>
          </div>
          
          <Link 
            href="/report-item" 
            className="bg-[#dd7230] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#c56024] transition-all flex items-center gap-2 shadow-md hover:shadow-lg w-full md:w-auto justify-center"
          >
            <Plus size={20} />
            Report New Item
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-8 border border-red-100 flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* EMPTY STATE */}
        {items.length === 0 && !error && (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-16 text-center flex flex-col items-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4 text-slate-400">
              <PackageOpen size={48} />
            </div>
            <h3 className="text-xl font-bold text-[#2d132e] mb-2">No items reported yet</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              You haven't uploaded any lost or found items. When you do, they will appear here so you can track their AI match status!
            </p>
            <Link 
              href="/report-item" 
              className="text-[#dd7230] font-bold hover:underline flex items-center gap-1"
            >
              Report your first item <Plus size={16} />
            </Link>
          </div>
        )}

        {/* ITEMS GRID - NOW CLICKABLE WITH HOVER EFFECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const isMatched = item.status === "matched";
            const isLost = item.category === "lost";

            return (
              <Link 
                href={`/item/${item.id}`} 
                key={item.id} 
                className="block group"
              >
                <div 
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 flex flex-col h-full ${
                    isMatched ? "border-green-400 shadow-green-100 shadow-lg" : "border-slate-100 shadow-sm"
                  }`}
                >
                  {/* Image Section */}
                  <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image_url ? (
                      <Image 
                        src={item.image_url} 
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Search className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                    )}
                    
                    {/* Category Badge (Top Left) */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2d132e] shadow-sm">
                      {isLost ? "🔴 Lost" : "🟢 Found"}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#2d132e] mb-2 line-clamp-1 group-hover:text-[#dd7230] transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">{item.description}</p>
                    
                    {/* Status Indicator */}
                    <div className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-sm mt-auto ${
                      isMatched 
                        ? "bg-green-50 text-green-700" 
                        : "bg-slate-50 text-slate-500"
                    }`}>
                      {isMatched ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          AI MATCH FOUND!
                        </>
                      ) : (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Scanning campus network...
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}