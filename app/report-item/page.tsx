
"use client";

import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function ReportItemPage() {
  const [itemType, setItemType] = useState<'lost' | 'found'>('lost');

  return (
    <><h1 className="text-3xl max-sm:text-xl mt-5 font-bold text-[#2d132e] text-center -mb-10 max-sm:-mb-15">
          Report an Item </h1>
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-5">
        <p className="text-center text-slate-600 mb-5 max-sm:text-[12px]">
          Fill out the details below to add an item to the feed.
        </p>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => setItemType('lost')}
              className={`py-2 max-sm:text-sm rounded-md cursor-pointer font-semibold transition-all ${
                itemType === 'lost' ? 'bg-[#2d132e] text-orange-100 shadow-md' : 'bg-gray-200 text-[#2d132e] '
              }`}
            >
              I Lost Something
            </button>
            <button
              type="button"
              onClick={() => setItemType('found')}
              className={`py-2 max-sm:text-sm rounded-md cursor-pointer font-semibold transition-all ${
                itemType === 'found' ? 'bg-[#2d132e] text-orange-100  shadow-md' : 'bg-gray-200 text-[#2d132e] '
              }`}
            >
              I Found Something
            </button>
          </div>

          <div>
            <label htmlFor="item-name" className="block text-[12px] font-medium text-slate-700 mb-1">
              Item Name
            </label>
            <input
              id="item-name"
              type="text"
              placeholder="e.g., Blue Water Bottle"
              required
              className="w-full max-sm:text-sm px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-[#2d132e] focus:border-brand-primary"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-[12px] font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Provide details like color, brand, location, and any unique features, details as much as possible..."
              className="w-full max-sm:text-sm px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-700 mb-2">
              Upload the item&apos;s photo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-0 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-500">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary hover:text-brand-primary/80 focus-within:outline-none"
                  >
                    <span className='hover:text-black text-slate-800'>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full max-sm:text-sm h-11 px-8 py-2 bg-[#2d132e] text-white font-medium rounded-md hover:bg-[#2d132e]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
    </>
  );
}