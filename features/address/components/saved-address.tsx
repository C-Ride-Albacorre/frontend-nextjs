import { Home, Search } from 'lucide-react';

export default function SavedAddresses() {
  return (
    <div className="space-y-4">
      <div className="w-full flex items-center gap-2 rounded-xl border border-border px-4 py-3">
        <Search className="h-6 w-6 text-neutral-500" />
        <input
          aria-label="Search address"
          placeholder="Search saved locations..."
          className="w-full bg-transparent text-base md:text-sm outline-none"
        />
      </div>

      <div className="border border-border rounded-xl p-4 flex items-start">
        <div className="flex-1 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Home size={18} />
          </div>
          <div className="space-y-1.5">
            <p className="font-medium text-sm">Home</p>
            <p className="text-xs text-neutral-500">
              12 Admiralty Way, Lekki Phase 1, Lagos
            </p>
          </div>
        </div>

        <span className="text-xs bg-green-100/10 text-green-100 px-3 py-1 rounded-full">
          Default
        </span>
      </div>
    </div>
  );
}
