import Input from '@/components/ui/inputs/input';
import { Home, Search } from 'lucide-react';

export default function SavedAddresses() {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        aria-label="Search address"
        placeholder="Search saved locations..."
        leftIcon={<Search className="h-6 w-6 text-neutral-500" />}
      />

      <div className="border border-border rounded-xl p-4 flex items-start">
        <div className="flex-1 flex items-center gap-4">
          <div
            className="
  w-8 h-8 
  sm:w-9 sm:h-9 
  md:w-10 md:h-10 
  rounded-full 
  bg-primary/10 
  text-primary 
  flex items-center justify-center 
  shrink-0
"
          >
            <Home size={16} className="md:w-4.5 md:h-4.5" />
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
