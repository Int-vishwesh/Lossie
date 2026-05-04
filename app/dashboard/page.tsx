"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/next-backend/supabase/client";
import { Loader2, Plus, Search, CheckCircle2, AlertCircle, PackageOpen, Edit2, Save, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  // --- Profile States ---
  const [profile, setProfile] = useState({
    name: "Loading...",
    department: "Student",
    rollNo: "N/A",
    residence: "Campus User"
  });

  // --- Edit Mode States ---
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    department: "",
    rollNo: "",
    residence: "day_scholar" // "hosteller" or "day_scholar"
  });

  const supabase = createClient();

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not found");

        const meta = user.user_metadata || {};
        const emailName = user.email ? user.email.split('@')[0] : "Student";
        
        // Use full name from GitHub if available, else fallback to email prefix
        const displayName = meta.full_name || emailName;

        const currentProfile = {
          name: displayName,
          department: meta.department || "Not Set",
          rollNo: meta.roll_no || "Not Set",
          residence: meta.residence_type === "hosteller" ? "Hosteller" : "Day Scholar"
        };

        setProfile(currentProfile);

        // Pre-fill the edit form with current data
        setEditForm({
          department: meta.department || "",
          rollNo: meta.roll_no || "",
          residence: meta.residence_type || "day_scholar"
        });

        const response = await fetch(`http://127.0.0.1:8000/my-items/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch items from server");

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

  // 2. SAVE PROFILE FUNCTION
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Supabase securely updates the logged-in user's metadata!
      const { data, error } = await supabase.auth.updateUser({
        data: {
          department: editForm.department,
          roll_no: editForm.rollNo,
          residence_type: editForm.residence,
        }
      });

      if (error) throw error;

      // Update the local UI instantly so they don't have to refresh
      setProfile(prev => ({
        ...prev,
        department: editForm.department || "Not Set",
        rollNo: editForm.rollNo || "Not Set",
        residence: editForm.residence === "hosteller" ? "Hosteller" : "Day Scholar"
      }));

      setIsEditing(false); // Close edit mode
    } catch (error: any) {
      alert("Failed to save profile: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#dd7230] animate-spin mb-4" />
        <p className="text-[#2d132e] font-semibold animate-pulse">Loading your dashboard...</p>
      </div>
    );
  }

  const lostCount = items.filter(item => item.category === 'lost').length;
  const foundCount = items.filter(item => item.category === 'found').length;
  const matchCount = items.filter(item => item.status === 'matched').length;

  return (
    <div className="min-h-screen bg-orange-100 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-10 relative">
          

          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full md:w-auto">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-slate-100 overflow-hidden flex-shrink-0 bg-slate-50 shadow-inner relative mx-auto md:mx-0">
              <Image src="/yapp.png" alt="Profile" fill className="object-cover" />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h2 className="text-2xl font-black text-[#2d132e] capitalize">{profile.name}</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="hover:text-[#2d132e] text-[#dd7230] transition-colors p-1.5 rounded-full hover:bg-orange-100"
                    title="Edit Profile"
                  >
                    <Edit2 size={16} />
                  </button>
                )}
              </div>
              
              {/* --- VIEW MODE --- */}
              {!isEditing ? (
                <>
                  <p className="text-slate-600 font-medium text-sm ml-2 md:text-base mb-2">
                    {profile.department === "Not Set" ? <span className="text-orange-500 italic text-sm">Please update your department</span> : profile.department}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${profile.rollNo === 'Not Set' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                      Roll: {profile.rollNo}
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                      {profile.residence}
                    </span>
                  </div>
                </>
              ) : (
                /* --- EDIT MODE --- */
                <div className="mt-3 space-y-3 animate-in fade-in duration-200 w-full max-w-sm">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Roll No</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 2230896"
                        value={editForm.rollNo}
                        onChange={(e) => setEditForm({...editForm, rollNo: e.target.value})}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#dd7230] outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Residence</label>
                      <select 
                        value={editForm.residence}
                        onChange={(e) => setEditForm({...editForm, residence: e.target.value})}
                        className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#dd7230] outline-none bg-white"
                      >
                        <option value="day_scholar">Day Scholar</option>
                        <option value="hosteller">Hosteller</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Department</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B.Tech CSE"
                      value={editForm.department}
                      onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#dd7230] outline-none"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="flex-1 bg-[#dd7230] text-white text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#c56024]"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save size={16} /> Save</>}
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                      className="px-4 bg-slate-100 text-slate-600 text-sm font-bold py-2 rounded-lg hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Stats Boxes (Hidden while editing on mobile for space) */}
          <div className={`grid grid-cols-3 gap-3 w-full md:w-auto mt-4 md:mt-0 ${isEditing ? 'hidden md:grid' : ''}`}>
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

        {/* ... Rest of your EXACT same page code (Items Grid, Empty States) remains unchanged below this ... */}
        
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

        {/* ITEMS GRID */}
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
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#2d132e] shadow-sm">
                      {isLost ? "🔴 Lost" : "🟢 Found"}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[#2d132e] mb-2 line-clamp-1 group-hover:text-[#dd7230] transition-colors">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">{item.description}</p>
                    
                    <div className={`flex items-center justify-center gap-2 p-3 rounded-xl font-bold text-sm mt-auto ${
                      isMatched ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-500"
                    }`}>
                      {isMatched ? (
                        <><CheckCircle2 className="w-5 h-5 text-green-500" /> AI MATCH FOUND!</>
                      ) : (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Scanning campus network...</>
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