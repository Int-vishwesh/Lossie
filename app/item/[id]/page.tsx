"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, Search, CheckCircle2, Info, MapPin } from "lucide-react";

type ItemDetail = {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  status: string;
  created_at?: string;
};

export default function ItemDetailsPage() {
  const params = useParams();
  const id = params.id as string; 
  const router = useRouter();

  const [item, setItem] = useState<ItemDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://int-vishwesh-lossie-backend.hf.space/item/${id}`);
        if (!response.ok) throw new Error("Item not found");
        
        const result = await response.json();
        setItem(result.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#dd7230] animate-spin mb-4" />
        <p className="text-[#2d132e] font-bold animate-pulse text-lg">Fetching details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#2d132e] mb-4">Item Not Found</h1>
        <button onClick={() => router.back()} className="text-[#dd7230] hover:underline font-medium">
          &larr; Go Back
        </button>
      </div>
    );
  }

  const isMatched = item.status === "matched";
  const isLost = item.category === "lost";

  return (
    <div className="min-h-screen bg-orange-100 p-6 md:p-12 font-sans pb-20">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#dd7230] transition-colors font-semibold mb-8">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
          
          <div className="md:w-1/2 relative bg-slate-100 min-h-[300px] md:min-h-[500px] flex items-center justify-center">
            {item.image_url ? (
              <Image 
                src={item.image_url} 
                alt={item.title}
                fill
                className="object-cover"
              />
            ) : (
              <Search className="w-20 h-20 text-slate-300" />
            )}
            
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest text-[#2d132e] shadow-lg">
              {isLost ? "🔴 Lost Item" : "🟢 Found Item"}
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
            
            {/* Status Banner */}
            {isMatched ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 font-bold mb-6 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                AI Match Confirmed!
              </div>
            ) : (
              <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-xl flex items-center gap-3 font-bold mb-6 shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                Actively scanning network...
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-black text-[#2d132e] mb-4 leading-tight">
              {item.title}
            </h1>
            
            <div className="space-y-6 flex-grow">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Info size={16} /> Description
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Area
                </h3>
                <p className="text-slate-700 font-medium">Campus Grounds</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-8 border-t border-slate-100 space-y-3">
              <button className="w-full bg-[#2d132e] text-white font-bold py-4 rounded-xl hover:bg-[#1a0a1a] transition-all shadow-md">
                {isMatched ? "View Match Details" : "Edit Report"}
              </button>
              <button className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all">
                Mark as Resolved
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
