"use client";

import { useState } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { createClient } from "@/next-backend/supabase/client";

export default function ReportItemPage() {
  const [itemType, setItemType] = useState<'lost' | 'found'>('lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in!");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", itemType);
      formData.append("user_id", user.id);

      if (imageFile) {
        formData.append("file", imageFile);
      }

      const response = await fetch("http://127.0.0.1:8000/add-item", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          const errorField = data.detail[0]?.loc[1] || "unknown field";
          const errorMsg = data.detail[0]?.msg || "Invalid data";
          throw new Error(`FastAPI Error: '${errorField}' is ${errorMsg}`);
        }

        if (typeof data.detail === "string") {
          throw new Error(data.detail);
        }

        throw new Error("Something went wrong on the server!");
      }

      // Success!
      setMessage({ text: "Item successfully saved to the database!", type: 'success' });

      // Optional: Clear the form after success
      setTitle('');
      setDescription('');
      setImageFile(null);

    } catch (error: any) {
      console.error("Submission Error:", error);
      setMessage({ text: error.message || "An unexpected error occurred.", type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-2xl max-sm:text-xl font-bold text-[#2d132e] text-center mb-4">
            Report an Item
          </h1>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-center text-slate-600 mb-4 max-sm:text-[12px]">
              Fill out the details below to add an item to the feed.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setItemType('lost')}
                  className={`py-2 max-sm:text-sm rounded-md cursor-pointer font-semibold transition-all ${itemType === 'lost' ? 'bg-[#2d132e] text-orange-100 shadow-md' : 'bg-gray-200 text-[#2d132e] '
                    }`}
                >
                  I Lost Something
                </button>
                <button
                  type="button"
                  onClick={() => setItemType('found')}
                  className={`py-2 max-sm:text-sm rounded-md cursor-pointer font-semibold transition-all ${itemType === 'found' ? 'bg-[#2d132e] text-orange-100  shadow-md' : 'bg-gray-200 text-[#2d132e] '
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full max-sm:text-sm px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-[#2d132e] focus:border-[#2d132e] outline-none"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-[12px] font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Provide details like color, brand, location, and any unique features, details as much as possible..."
                  className="w-full max-sm:text-sm px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-[#2d132e] focus:border-[#2d132e] outline-none"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-700 mb-1">
                  Upload the item&apos;s photo (Optional)
                </label>
                <div className={`flex justify-center px-5 pt-3 pb-4 border-2 ${imageFile ? 'border-[#dd7230] bg-orange-50' : 'border-gray-300'} border-dashed rounded-md transition-colors`}>
                  <div className="space-y-1 text-center">

                    {imageFile ? (
                      <CheckCircle className="mx-auto h-10 w-10 text-[#dd7230]" />
                    ) : (
                      <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                    )}

                    <div className="flex text-sm text-gray-500 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-[#dd7230] hover:text-[#2d132e] focus-within:outline-none"
                      >
                        <span>{imageFile ? "Change file" : "Upload a file"}</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="sr-only"
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      {!imageFile && <p className="pl-1 text-slate-800">or drag and drop</p>}
                    </div>

                    {/* Show the selected filename */}
                    {imageFile ? (
                      <p className="text-xs text-slate-700 font-medium">{imageFile.name}</p>
                    ) : (
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Bouncer / Success Messages */}
              {message.text && (
                <div className={`p-3 rounded-md text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'
                  }`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full max-sm:text-sm h-11 px-8 py-2 text-white font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d132e] ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2d132e] hover:bg-[#2d132e]/80'
                  }`}
              >
                {isLoading ? "Analyzing & Saving..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}