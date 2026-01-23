import { LOCATIONS } from '@/features/delivery/data';

export default function LocationChips() {
  return (
    <div>
      <h3 className=" text-xl font-semibold mb-6">
        All <span className="text-primary">Stores</span>
      </h3>

      <div className="flex justify-between items-center flex-wrap gap-2">
        {LOCATIONS.map((loc) => (
          <button
            key={loc}
            className="px-6 md:px-8 py-4 bg-black hover:bg-primary-text-100 text-white rounded-full text-sm cursor-pointer"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
