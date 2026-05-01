"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import defaultItemImage from '../../../../public/lost.jpg'; 

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;

  const [item, setItem] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // 1. Fetch all items and find the specific one we clicked
    const fetchItemDetails = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/items");
        const json = await res.json();
        
        const foundItem = json.data?.find((i: any) => i.id === itemId);
        if (foundItem) {
          setItem(foundItem);
          // 2. Automatically trigger the AI Matcher using this item's description!
          findAIMatches(foundItem.category, foundItem.description);
        }
      } catch (error) {
        console.error("Failed to load item:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  // 3. The AI Scanner Function
  const findAIMatches = async (category: string, description: string) => {
    setIsScanning(true);
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("description", description);
      // For MVP, we use the text vector to find matches to avoid needing to re-upload the image

      const response = await fetch("http://127.0.0.1:8000/find-matches", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      // Filter out the item itself so it doesn't match with itself!
      const validMatches = (data.results || []).filter((m: any) => m.id !== itemId);
      setMatches(validMatches);
      
    } catch (error) {
      console.error("AI Scan failed:", error);
    } finally {
      setIsScanning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#dd7230]" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-600">
        <h2 className="text-2xl font-bold mb-4">Item not found!</h2>
        <button onClick={() => router.back()} className="text-[#dd7230] hover:underline">Go Back</button>
      </div>
    );
  }

  const isLost = item.category === 'lost';

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:px-20">
      <button 
        onClick={() => router.back()} 
        className="flex items-center gap-2 text-slate-600 hover:text-[#2d132e] transition-colors font-medium mb-8"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
        
        {/* LEFT SIDE: Original Item Details */}
        <div className="w-full lg:w-1/3 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-fit">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
            <Image 
              src={item.image_url || defaultItemImage.src} 
              alt={item.title} 
              fill 
              className="object-cover"
            />
            <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full ${isLost ? 'bg-blue-500' : 'bg-green-500'}`}>
              {isLost ? 'LOST' : 'FOUND'}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#2d132e] mb-2">{item.title}</h1>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">{item.description}</p>
          
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-1">Status</p>
            <p className="text-sm text-orange-900 font-medium">Pending Match</p>
          </div>
        </div>

        {/* RIGHT SIDE: AI Match Results */}
        <div className="w-full lg:w-2/3">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#2d132e] rounded-xl text-orange-400 shadow-md">
              <Sparkles className={isScanning ? "animate-pulse" : ""} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2d132e]">AI Match Results</h2>
              <p className="text-slate-500 text-sm">Scanning the database for high-probability connections...</p>
            </div>
          </div>

          {isScanning ? (
            <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center border border-dashed border-slate-300">
              <Loader2 className="w-12 h-12 animate-spin text-[#dd7230] mb-4" />
              <p className="text-slate-500 font-medium animate-pulse">Running 512-dimension vector analysis...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
              <p className="text-lg text-slate-600 font-medium mb-2">No Matches Found Yet</p>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Our AI couldn't find a strong match for this item right now. We'll keep scanning automatically as new items are reported!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((match) => (
                <div key={match.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  
                  {/* The Similarity Score Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm text-green-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-green-500/30 shadow-lg flex items-center gap-1">
                    <Sparkles size={12} /> {(match.similarity * 100).toFixed(1)}% Match
                  </div>

                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      <Image src={match.image_url || defaultItemImage.src} alt={match.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs font-bold text-[#dd7230] uppercase mb-1">
                        Potential {match.category === 'lost' ? 'Lost' : 'Found'} Item
                      </p>
                      <h3 className="font-bold text-[#2d132e] text-lg leading-tight mb-1 line-clamp-1">{match.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{match.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                    <button className="flex-1 bg-[#2d132e] text-white text-sm font-medium py-2 rounded-xl hover:bg-[#2d132e]/90 transition-colors">
                      Claim Item
                    </button>
                    <button className="flex-1 bg-slate-100 text-slate-700 text-sm font-medium py-2 rounded-xl hover:bg-slate-200 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}