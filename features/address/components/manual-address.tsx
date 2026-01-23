export default function ManualAddressForm() {
  return (
    <>
      <form action="/" className="space-y-5">
        <div>
          <label className="text-sm font-medium">Location Name</label>
          <input
            type="text"
            placeholder="e.g. Home, Office, Gym"
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Street Address</label>
          <input
            type="text"
            placeholder="Home/Building number and street"
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">City</label>
            <input
              type="text"
              placeholder="Select your city"
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">State</label>
            <input
              type="text"
              placeholder="Lagos"
              className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Nearby Landmark</label>
          <input
            type="text"
            placeholder="eg. Near Shoprite"
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Delivery Instructions (Optional)
          </label>
          <textarea
            placeholder="Add any specific delivery instructions..."
            className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="text-center">
          <button className=" px-16 py-4 bg-primary hover:bg-primary-hover rounded-xl font-medium text-sm  cursor-pointer">
            Save & Use Location
          </button>
        </div>
      </form>
    </>
  );
}
