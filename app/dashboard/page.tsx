"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; 
import { Loader2, Sparkles } from "lucide-react";

import defaultItemImage from '../../public/lost.jpg'; 

export default function Dashboard() {
  const [dbItems, setDbItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch items straight from the DB
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/items");
        const json = await res.json();
        
        if (json.data) {
          const mappedItems = json.data.map((item: any) => ({
            id: item.id,
            type: item.category === 'lost' ? 'Lost' : 'Found',
            status: item.status || 'pending', // Pulls the REAL status from Supabase
            name: item.title,
            description: item.description,
            imageUrl: item.image_url || defaultItemImage.src,
          }));
          setDbItems(mappedItems);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 2. Filter exactly how you designed it!
  const lostItems = dbItems.filter(item => item.type === 'Lost' && item.status !== 'matched');
  const foundItems = dbItems.filter(item => item.type === 'Found' && item.status !== 'matched');
  const matchedItems = dbItems.filter(item => item.status === 'matched');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#dd7230]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-20 max-sm:px-10 p-6 bg-slate-50">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden flex-shrink-0 bg-gray-100 shadow-inner">
            <Image src="/yapp.png" alt="Profile" width={200} height={100} className="object-cover w-full h-full" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2d132e]">Jerry Aryan</h2>
            <p className="text-gray-600">B.Tech CSE Department</p>
            <p className="text-gray-500 text-sm">Roll: 2230896 • Day Scholar</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5 md:mt-0">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-blue-600">{lostItems.length}</p>
            <p className="text-xs font-bold uppercase text-blue-800 tracking-wider">Lost</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-green-600">{foundItems.length}</p>
            <p className="text-xs font-bold uppercase text-green-800 tracking-wider">Found</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-orange-600">{matchedItems.length}</p>
            <p className="text-xs font-bold uppercase text-orange-800 tracking-wider">Matches</p>
          </div>
        </div>
      </div>

      <div className="my-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
        <p className="text-sm text-slate-600">
          Can't find your item? <Link href={'/feed'} className="text-[#dd7230] hover:underline font-bold"> Browse manually 👀</Link> in our community feed.
        </p>
      </div>

      <div className="mt-8 space-y-10">
        
        {/* 1. MATCHED SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><Sparkles size={18} /></div>
            <h3 className="text-xl font-bold text-[#2d132e]">AI Matched Items</h3>
          </div>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 space-x-2">
              {matchedItems.length === 0 ? (
                <p className="w-full text-center text-gray-500 bg-white py-8 rounded-xl border border-dashed border-gray-300">
                  No AI matches confirmed yet. We continuously scan new reports!
                </p>
              ) : (
                matchedItems.map((item) => (
                  <Link href={`/dashboard/items/${item.id}`} key={item.id} className="block w-[200px] flex-shrink-0 group">
                    <div className="w-full aspect-square bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all p-3 border-2 border-orange-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-[#dd7230]"></div>
                      <Image src={item.imageUrl} alt={item.name} width={150} height={150} className="object-cover rounded-xl mb-3 h-28 w-full bg-slate-100" />
                      <p className="text-sm font-bold text-[#2d132e] text-center line-clamp-1">{item.name}</p>
                      <span className="text-xs text-orange-600 mt-1 font-extrabold uppercase tracking-widest">Matched!</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* 2. FOUND SECTION */}
        <section>
          <h3 className="text-xl font-bold text-[#2d132e] mb-4">Items You Found</h3>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 space-x-2">
              {foundItems.length === 0 ? (
                <p className="w-full text-center text-gray-500">No pending found items.</p>
              ) : (
                foundItems.map((item) => (
                  <Link href={`/dashboard/items/${item.id}`} key={item.id} className="block w-[180px] flex-shrink-0">
                    <div className="w-full aspect-square bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all p-3 border border-green-100">
                      <Image src={item.imageUrl} alt={item.name} width={150} height={150} className="object-cover rounded-xl mb-3 h-24 w-full bg-slate-100" />
                      <p className="text-sm font-bold text-[#2d132e] text-center line-clamp-1">{item.name}</p>
                      <span className="text-xs text-green-600 mt-1 font-bold uppercase tracking-wider">Found</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* 3. LOST SECTION */}
        <section>
          <h3 className="text-xl font-bold text-[#2d132e] mb-4">Items You Lost</h3>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 space-x-2">
              {lostItems.length === 0 ? (
                <p className="w-full text-center text-gray-500">No pending lost items.</p>
              ) : (
                lostItems.map((item) => (
                  <Link href={`/dashboard/items/${item.id}`} key={item.id} className="block w-[180px] flex-shrink-0">
                    <div className="w-full aspect-square bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all p-3 border border-blue-100">
                      <Image src={item.imageUrl} alt={item.name} width={150} height={150} className="object-cover rounded-xl mb-3 h-24 w-full bg-slate-100" />
                      <p className="text-sm font-bold text-[#2d132e] text-center line-clamp-1">{item.name}</p>
                      <span className="text-xs text-blue-600 mt-1 font-bold uppercase tracking-wider">Lost</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

