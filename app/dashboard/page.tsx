// app/dashboard/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link"; 

import defaultItemImage from '../../public/lost.jpg'; 

// --- DUMMY DATA ---
const allItems = [
  { id: 'lost-1', type: 'Lost', status: 'Pending Match', name: 'Blue Sigg Water Bottle', description: 'Dark blue, 1L capacity, with a black sports cap. Lost near the university library entrance.', dateReported: '2023-10-26', imageUrl: defaultItemImage.src, },
  { id: 'lost-2', type: 'Lost', status: 'Pending Match', name: 'Reading Glasses', description: 'Black framed reading glasses, prescription, left on a table in the cafeteria.', dateReported: '2023-10-24', imageUrl: defaultItemImage.src, },
  { id: 'lost-3', type: 'Lost', status: 'Pending Match', name: 'USB Drive (Kingston)', description: 'Silver Kingston USB drive, 64GB. Contains important project files. Lost in Computer Lab B.', dateReported: '2023-10-22', imageUrl: defaultItemImage.src, },
  { id: 'lost-4', type: 'Lost', status: 'Pending Match', name: 'Leather Gloves', description: 'Black leather gloves, size Medium. Lost near the main campus gates.', dateReported: '2023-10-20', imageUrl: defaultItemImage.src, },
  { id: 'lost-5', type: 'Lost', status: 'Pending Match', name: 'Small Notebook', description: 'A small Moleskine notebook, black cover, filled with notes. Lost in classroom 301.', dateReported: '2023-10-18', imageUrl: defaultItemImage.src, },
  { id: 'lost-6', type: 'Lost', status: 'Pending Match', name: 'Something', description: 'A small Moleskine notebook, black cover, filled with notes. Lost in classroom 301.', dateReported: '2023-10-18', imageUrl: defaultItemImage.src, },
  { id: 'found-1', type: 'Found', status: 'Waiting for Claim', name: 'Black Leather Wallet', description: 'Found a black leather wallet with no ID, only some cash. On the bench outside the main building.', dateReported: '2023-10-25', imageUrl: defaultItemImage.src, },
  { id: 'found-2', type: 'Found', status: 'Waiting for Claim', name: 'Single AirPod (Right)', description: 'Found a single Apple AirPod (right earbud) near the sports field.', dateReported: '2023-10-23', imageUrl: defaultItemImage.src, },
  { id: 'found-3', type: 'Found', status: 'Waiting for Claim', name: 'Keys on a Lanyard', description: 'Set of keys on a red university lanyard. Found near the student dorms.', dateReported: '2023-10-21', imageUrl: defaultItemImage.src, },
  { id: 'matched-1', type: 'Lost', status: 'Matched', name: 'My Keys', description: 'My lost house keys were matched with a found item. Contact info exchanged!', dateReported: '2023-10-15', imageUrl: defaultItemImage.src, matchedWith: 'found-item-id-xyz', },
  { id: 'matched-2', type: 'Found', status: 'Matched', name: 'Silver Bracelet', description: 'A silver chain bracelet I found was claimed by its owner.', dateReported: '2023-10-10', imageUrl: defaultItemImage.src, matchedWith: 'lost-item-id-abc', },
];
// --- END DUMMY DATA ---


export default function Dashboard() {
  const lostItems = allItems.filter(item => item.type === 'Lost' && item.status !== 'Matched');
  const foundItems = allItems.filter(item => item.type === 'Found' && item.status !== 'Matched');
  const matchedItems = allItems.filter(item => item.status === 'Matched');

  return (
    <div className="min-h-screen px-20 max-sm:px-10 p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-32 h-32 rounded-full border-4 border-gray-300 overflow-hidden flex-shrink-0">
            <Image
              src="/yapp.png" 
              alt="Profile"
              width={200}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">Jerry Aryan</h2>
            <p className="text-gray-600">B.Tech CSE Department</p>
            <p className="text-gray-600">Roll: 2230896</p>
            <p className="text-gray-600">Day Scholar</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-5 md:mt-0">
          <div className="bg-blue-100 rounded-xl p-4 text-center shadow">
            <p className="text-2xl font-bold text-blue-600">{lostItems.length}</p>
            <p className="text-sm max-sm:text-[13px] text-gray-600">Lost Items</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 text-center shadow">
            <p className="text-2xl font-bold text-green-600">{foundItems.length}</p>
            <p className="text-sm max-sm:text-[13px] text-gray-600">Found Items</p>
          </div>
          <div className="bg-orange-100 rounded-xl p-4 text-center shadow">
            <p className="text-2xl font-bold text-purple-600">{matchedItems.length}</p>
            <p className="text-sm max-sm:text-[13px] text-gray-600">Matches</p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">Matched List</h3>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-10 max-sm:gap-3 space-x-4">
              {matchedItems.length === 0 ? (
                <p className="w-full text-center text-gray-500">No matched items yet!</p>
              ) : (
                matchedItems.map((item) => (
                  <Link href={`/dashboard/items/${item.id}`} key={item.id} className="block w-[18vw] xl:w-[15vw] flex-shrink-0">
                    <div className="w-full aspect-square bg-white rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-lg transition-shadow p-2">
                      <Image src={item.imageUrl} alt={item.name} width={150} height={100} className="object-cover rounded-md mb-2" />
                      <p className="text-sm font-medium text-[#2d132e] text-center line-clamp-1">{item.name}</p>
                      <span className="text-xs text-purple-600 mt-1">Matched!</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Found List</h3>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-10 max-sm:gap-3 space-x-4">
              {foundItems.length === 0 ? (
                <p className="w-full text-center text-gray-500">No items you&apos;ve found yet!</p>
              ) : (
                foundItems.map((item) => (
                  <Link href={`/dashboard/items/${item.id}`} key={item.id} className="block w-[18vw] xl:w-[15vw] flex-shrink-0">
                    <div className="w-full aspect-square bg-white rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow p-2">
                      <Image src={item.imageUrl} alt={item.name} width={150} height={60} className="object-cover rounded-md mb-2" />
                      <p className="text-sm font-medium text-[#2d132e] text-center line-clamp-1">{item.name}</p>
                      <span className="text-xs text-green-600 mt-1">Found</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Lost List</h3>
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-10 max-sm:gap-3 space-x-4">
              {lostItems.length === 0 ? (
                <p className="w-full text-center text-gray-500">No items you&apos;ve lost yet!</p>
              ) : (
                lostItems.map((item) => (
                  <Link href={`/dashboard/items/${item.id}`} key={item.id} className="block w-[18vw] xl:w-[15vw] flex-shrink-0">
                    <div className="w-full aspect-square bg-white rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow p-2">
                      <Image src={item.imageUrl} alt={item.name} width={150} height={60} className="object-cover rounded-md mb-2" />
                      <p className="text-sm font-medium text-[#2d132e] text-center line-clamp-1">{item.name}</p>
                      <span className="text-xs text-blue-600 mt-1">Lost</span>
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