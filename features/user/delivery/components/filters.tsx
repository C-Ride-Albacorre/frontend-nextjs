import { Soup, Star, Tag } from 'lucide-react';

export default function Filters() {
  return (
    <div className="flex flex-wrap md:justify-end justify-between items-center gap-4 mt-8">
      <button className="px-4 py-3 border border-border rounded-full text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-foreground-200">
        <Tag className="h-4 w-4 text-primary" /> Promotions
      </button>

      <button className="px-4 py-3 border border-border rounded-full text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-foreground-200">
        <Soup className="h-4 w-4 text-primary" /> Sort By
      </button>

      <button className="px-4 py-3 border border-border rounded-full text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-foreground-200">
        <Star className="h-4 w-4 text-primary" /> Top Rated
      </button>
    </div>
  );
}
