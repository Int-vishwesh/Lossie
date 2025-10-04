
"use client";

import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import ItemCard from "../components/itemcard";
import type { Item } from "../components/itemcard";

const feedItems: Item[] = [
  { id: '1', name: 'Blue Water Bottle', type: 'lost', date: 'Oct 03, 2025', imageUrl: '/lost.jpg' },
  { id: '2', name: 'Black Leather Wallet', type: 'found', date: 'Oct 02, 2025', imageUrl: '/found.jpg' },
  { id: '3', name: 'Reading Glasses', type: 'lost', date: 'Oct 02, 2025', imageUrl: '/lost.jpg' },
  { id: '4', name: 'Set of Keys', type: 'found', date: 'Oct 01, 2025', imageUrl: '/found.jpg' },
  { id: '5', name: 'iPhone 15 Pro', type: 'lost', date: 'Oct 01, 2025', imageUrl: '/lost.jpg' },
  { id: '6', name: 'University ID Card', type: 'found', date: 'Sep 30, 2025', imageUrl: '/found.jpg' },
  { id: '7', name: 'Gray Hoodie', type: 'lost', date: 'Sep 30, 2025', imageUrl: '/lost.jpg' },
  { id: '8', name: 'AirPods Pro Case', type: 'found', date: 'Sep 29, 2025', imageUrl: '/found.jpg' },
  { id: '9', name: 'Laptop Charger', type: 'lost', date: 'Sep 29, 2025', imageUrl: '/lost.jpg' },
  { id: '10', name: 'Red Backpack', type: 'found', date: 'Sep 28, 2025', imageUrl: '/found.jpg' },
  { id: '11', name: 'Textbook "Calculus"', type: 'lost', date: 'Sep 28, 2025', imageUrl: '/lost.jpg' },
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>("lost");
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = useMemo(() => {
    return feedItems.filter(item => 
      item.type === activeTab &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, searchTerm]);

  return (
    <div className="min-h-screen p-6">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center w-full max-w-lg bg-white rounded-full shadow-sm px-5 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="ml-3 w-full bg-transparent text-gray-700 max-sm:text-[11px] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/report-item" className="flex-shrink-0 max-sm:text-[12px] flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-lg shadow-sm hover:bg-orange-600 transition">
          <Plus size={18} /> Add Item
        </Link>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("lost")}
          className={`px-10 py-2 rounded-4xl font-semibold text-sm transition-all duration-200 ${
            activeTab === "lost"
              ? "bg-blue-500 text-white shadow"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          Lost Feed
        </button>
        <button
          onClick={() => setActiveTab("found")}
          className={`px-8 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
            activeTab === "found"
              ? "bg-blue-500 text-white shadow"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          Found Feed
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {filteredItems.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-16">
            No items found in the {activeTab} feed that match &quot;{searchTerm}&quot;
          </p>
        ) : (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}