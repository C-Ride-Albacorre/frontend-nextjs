export default function PhoneInput() {
  return (
    <div>
      <label className="text-sm font-medium">Phone Number</label>
      <div className="mt-2 flex gap-2 w-full">
        <span className="flex items-center shrink-0 px-4 rounded-xl border border-border text-sm">
          +234
        </span>

        <input
          type="tel"
          placeholder="Enter phone number"
          className="min-w-0 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm  outline-none focus:ring-2 focus:ring-primary"
        />
        
      </div>
    </div>
  );
}
