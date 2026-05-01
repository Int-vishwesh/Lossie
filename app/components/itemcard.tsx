import Image from "next/image";
import defaultItemImage from '../../public/lost.jpg'; 

export type Item = {
  id: string;
  name: string;
  type: string;
  date: string;
  imageUrl: string;
  similarity?: number;
};

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow h-full">
      {/* PERFECTLY SQUARE IMAGE WRAPPER */}
      <div className="relative w-full aspect-square bg-slate-100 flex-shrink-0">
        <Image
          src={item.imageUrl || defaultItemImage.src}
          alt={item.name}
          fill
          className="object-cover"
        />
        <div className={`absolute top-2 left-2 px-2.5 py-1 text-[10px] font-bold text-white rounded-md uppercase tracking-wider ${item.type === 'lost' ? 'bg-blue-500' : 'bg-green-500'}`}>
          {item.type}
        </div>
      </div>
      
      {/* TEXT CONTENT WRAPPER */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-[#2d132e] text-base mb-1 line-clamp-1" title={item.name}>
          {item.name}
        </h3>
        {/* mt-auto pushes the date to the absolute bottom so all cards match! */}
        <p className="text-xs text-slate-500 mt-auto">{item.date}</p>
      </div>
    </div>
  );
}