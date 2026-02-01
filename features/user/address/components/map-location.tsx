import { LocateIcon, MapIcon, MapPin, Navigation } from 'lucide-react';

const locations = [
  'Victoria Island',
  'Lekki Phase 1',
  'Ikoyi',
  'Banana Island',
  'Ikeja',
  'Surulere',
  'Eko Atlantic',
  'Yaba',
];

export default function MapLocations() {
  return (
    <div className=" space-y-6">
      <div className="bg-foreground-100 px-4 py-6 w-full rounded-2xl flex flex-col space-y-4">
        <span className="text-neutral-500 text-xs ">
          Select a popular location or use your current GPS location
        </span>
        <button className="px-4 py-3 bg-white rounded-xl flex items-center justify-center gap-3 w-fit text-xs">
          <Navigation size={20} /> Use My Current Location
        </button>
      </div>

      <div className="border border-border rounded-2xl p-4">
        <h5 className="font-semibold flex items-center gap-2 mb-6 text-primary-text-100">
          <MapIcon size={20} className="text-primary" /> Popular Lagos Locations
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locations.map((loc) => (
            <div
              key={loc}
              className="border border-border rounded-xl p-4 text-sm flex flex-col gap-3 text-gray-400 cursor-pointer hover:bg-foreground-200"
            >
              <MapPin size={18} />
              <p className="font-medium text-primary-text-100 text-sm">{loc}</p>
              <p className="text-xs text-gray-600">6.4281, 3.4219</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border bg-foreground-100 rounded-xl p-4 flex items-start gap-4 ">
        <MapPin size={20} className="text-primary" />

        <div className="flex-1">
          <p className="font-medium flex items-center gap-2 mb-2 text-sm">
            Selected Location
          </p>

          <p className="text-xs text-neutral-500">Lat: 6.5244, Lng: 3.3792</p>
        </div>
      </div>

      <div className="text-center">
        <button className=" px-16 py-4 bg-primary hover:bg-primary-hover rounded-xl font-medium text-sm  cursor-pointer">
          Continue with Selected Location
        </button>
      </div>
    </div>
  );
}
