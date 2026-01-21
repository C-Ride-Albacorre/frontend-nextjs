import {
  Building2,
  House,
  MapPin,
  Plus,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export default function DeliveryLocation() {
  return (
    <>
      <div className="my-12 p-8 bg-foreground-200 rounded-2xl space-y-12">
        <div className="space-y-2">
          <p
            className="font-medium
          "
          >
            Delivery Locations
          </p>
          <span className="text-neutral-500 text-sm">
            Where should we pick up and deliver?
          </span>
        </div>

        <div className="flex items-start gap-4">
          <MapPin size={16} className="text-red-600" />

          <div className="space-y-4">
            <p className="font-medium text-sm">Pickup Address</p>
            <span className="text-sm text-neutral-500">
              13 Alhaji Kosoko Street
            </span>

            <div className="flex items-center gap-4 mt-4">
              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <MapPin size={16} />
                Current Location
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <Plus size={16} />
                Add Address
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin size={16} className="text-red-600" />

          <div className="space-y-4">
            <p className="font-medium text-sm">Drop Address</p>
            <span className="text-sm text-neutral-500">
              45 Adeola Odeku, Victoria Island
            </span>

            <div className="flex items-center gap-4 mt-4">
              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <House size={16} />
                Home
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <Building2 size={16} />
                Office
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <MapPin size={16} />
                Current Location
              </span>

              <span className="border border-border px-4 py-3 text-neutral-500 flex items-center justify-center gap-2 text-xs rounded-xl cursor-pointer hover:bg-white">
                <Plus size={16} />
                Add Address
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-foreground-200 rounded-2xl ">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="text-sm font-medium">Recipient Name</label>
            <input
              type="text"
              placeholder="Joseph Adebayo"
              className="mt-2 w-full rounded-xl bg-white border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Recipient Phone</label>
            <input
              type="text"
              placeholder="+234 800 000 0000"
              className="mt-2 w-full rounded-xl bg-white border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="mt-12  flex items-center justify-center gap-8">
        <button className=" px-16 py-4 bg-foreground-100 hover:bg-foreground-200 rounded-xl font-medium text-sm  cursor-pointer flex gap-4 items-center justify-center border border-border">
          <ChevronLeft size={16} />
          Back
        </button>

        <button className=" px-16 py-4 bg-primary hover:bg-primary-hover rounded-xl font-medium text-sm  cursor-pointer flex gap-4 items-center justify-center">
          Continue
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  );
}
