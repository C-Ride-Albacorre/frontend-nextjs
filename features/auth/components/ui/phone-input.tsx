export default function PhoneInput() {
  return (
    <div>
      <label className="text-sm font-medium">Phone Number</label>
      <div className="mt-2 flex gap-2">
        <span className="flex items-center px-4 rounded-xl border border-border text-sm">
          +234
        </span>
        <input
          type="tel"
          placeholder="Enter phone number"
          className="flex-1 rounded-xl border border-border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
