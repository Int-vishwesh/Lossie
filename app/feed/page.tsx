"use client";

import { useState, useEffect } from "react";
import { Search, Plus, ImagePlus, X, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import ItemCard from "../components/itemcard";
import defaultItemImage from '../../public/lost.jpg'; 

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>("lost");
  
  const [dbItems, setDbItems] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchImage, setSearchImage] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // 1. Fetch the default feed
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/items");
        const json = await res.json();
        if (json.data) {
          const mappedItems = json.data.map((item: any) => ({
            id: item.id,
            name: item.title,
            type: item.category ? item.category.toLowerCase() : 'lost',
            date: 'Recently', 
            imageUrl: item.image_url || defaultItemImage.src,
            status: item.status || 'pending'
          }));
          setDbItems(mappedItems);
        }
      } catch (error) {
        console.error("Failed to fetch feed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeed();
  }, []);

  // 2. The Clean, Dedicated Feed Search
  const handleImageUpload = async (file: File | null) => {
    setSearchImage(file);
    
    if (!file) {
      setSearchResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const formData = new FormData();
      
      // Clean and honest: just the tab and the file!
      formData.append("category", activeTab); 
      formData.append("file", file);

      // Pointing to the brand new endpoint
      const response = await fetch("http://127.0.0.1:8000/search-feed", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      const mappedMatches = (data.results || [])
        .map((item: any) => {
          // Look up the database to ensure we have the exact name and image
          const realDbItem = dbItems.find(dbI => dbI.id === item.id);
          return {
            id: item.id,
            name: item.title || (realDbItem ? realDbItem.name : "Item"),
            type: activeTab, // Guaranteed to be the active tab
            date: 'Match Found',
            imageUrl: item.image_url || (realDbItem ? realDbItem.imageUrl : defaultItemImage.src),
            similarity: item.similarity
          };
        })
        .filter((item: any) => item.similarity >= 0.15); // The 15% smart threshold
      
      setSearchResults(mappedMatches);
    } catch (error) {
      console.error("Feed Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTabSwitch = (tab: 'lost' | 'found') => {
    setActiveTab(tab);
    setSearchResults(null);
    setSearchTerm('');
    setSearchImage(null);
  };

  // 3. UI Guardrails
  const itemsToDisplay = searchResults !== null 
    ? searchResults.filter(item => 
        item.type === activeTab && 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : dbItems.filter(item => 
        item.type === activeTab && 
        item.status !== 'matched' &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8">
        
        <div className="flex items-center w-full max-w-2xl bg-white rounded-full shadow-sm px-2 py-2 border border-slate-200 focus-within:border-[#2d132e] focus-within:ring-1 focus-within:ring-[#2d132e] transition-all">
          <Search className="w-5 h-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search instantly by name, or upload an image for AI match..."
            className="ml-3 w-full bg-transparent text-gray-700 max-sm:text-[13px] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex items-center gap-2 mr-2">
            {searchImage ? (
              <div className="flex items-center bg-orange-100 text-[#dd7230] text-xs font-bold px-3 py-1.5 rounded-full border border-orange-200">
                {isSearching && <Loader2 className="w-3 h-3 animate-spin mr-2" />}
                <span className="truncate max-w-[80px] mr-1">{searchImage.name}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleImageUpload(null)} />
              </div>
            ) : (
              <label className="cursor-pointer p-2 hover:bg-slate-100 rounded-full transition-colors group" title="Upload image for AI search">
                <ImagePlus className="w-5 h-5 text-slate-400 group-hover:text-[#dd7230]" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleImageUpload(e.target.files?.[0] || null)} 
                />
              </label>
            )}
          </div>
        </div>

        <Link href="/report-item" className="flex-shrink-0 max-sm:text-[12px] flex items-center gap-2 px-6 py-2.5 bg-[#dd7230] text-white rounded-full shadow-sm hover:bg-[#c56024] transition font-bold">
          <Plus size={18} /> Add Item
        </Link>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => handleTabSwitch("lost")}
          className={`px-12 md:px-24 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
            activeTab === "lost" ? "bg-red-500 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          Lost Feed
        </button>
        <button
          onClick={() => handleTabSwitch("found")}
          className={`px-12 md:px-24 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${
            activeTab === "found" ? "bg-green-500 text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          Found Feed
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 animate-spin text-[#dd7230] mb-4" />
            <p className="font-medium animate-pulse">Loading feed...</p>
          </div>
        ) : itemsToDisplay.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            {isSearching ? (
               <div className="flex flex-col items-center text-slate-400">
                 <Loader2 className="w-8 h-8 animate-spin text-[#dd7230] mb-3" />
                 <p>AI is scanning visual vectors...</p>
               </div>
            ) : (
              <>
                <p className="text-lg text-slate-500 font-medium">No items found in this category.</p>
                {searchResults !== null && <button onClick={() => handleImageUpload(null)} className="mt-4 text-[#dd7230] hover:underline font-bold">Clear AI Search</button>}
              </>
            )}
          </div>
        ) : (
          itemsToDisplay.map((item) => (
            <div key={item.id} className="relative group">
              <ItemCard item={item} />
              
              {item.similarity && (
                <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-md text-green-400 text-xs font-black px-2.5 py-1.5 rounded-lg border border-green-500/50 shadow-xl flex items-center gap-1">
                  <Sparkles size={12} /> {(item.similarity * 100).toFixed(0)}%
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}