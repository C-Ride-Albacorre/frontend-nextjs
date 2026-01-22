

import { MapPin } from 'lucide-react';

export default function Location() {
  return (
    <section className="bg-primary-text-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-white/80 ">
          <MapPin className="h-6 w-6 text-primary" />
          <h6 className="font-heading text-xl">Now Delivering To:</h6>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 md:justify-between md:items-center ">
          {[
            'Lekki Phase 1',
            'Ikoyi',
            'Victoria Island',
            'Banana Island',
            'Oniru',
            'Ajah',
            'Yaba',
            'Surulere',
          ].map((loc) => (
            <span
              key={loc}
              className="rounded-full border border-white/30 px-6 py-3  md:px-10 md:py-4 text-sm text-white"
            >
              {loc}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
