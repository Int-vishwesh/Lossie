// src/components/feed/ItemCard.tsx
import Image from 'next/image';
import Link from 'next/link';

export type Item = {
  id: string;
  name: string;
  type: 'lost' | 'found';
  date: string;
  imageUrl: string;
};

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  const isLost = item.type === 'lost';

  return (
    <Link href={`/items/${item.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full group-hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div className="relative w-full aspect-square">
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={300}
            height={300}
            
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <span className={`inline-block self-start px-2 py-0.5 text-[12px] font-semibold rounded-full mb-2 ${
            isLost ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
          }`}>
            {isLost ? 'Lost Item' : 'Found Item'}
          </span>
          <h3 className="text-md max-sm:text-sm font-bold text-slate-800 flex-grow">{item.name}</h3>
          <p className="text-xs text-slate-500 mt-2">Reported on: {item.date}</p>
        </div>
      </div>
    </Link>
  );
}