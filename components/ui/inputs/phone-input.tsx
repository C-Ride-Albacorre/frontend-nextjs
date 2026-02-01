export default function PhoneInput({
  countryCode = '+234',
  placeholder = 'Enter phone number',
}: {
  countryCode?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">Phone Number</label>
      <div className="mt-2 flex gap-2 w-full">
        <span className="flex items-center shrink-0 px-4 rounded-xl border border-border text-sm">
          {countryCode}
        </span>

        <input
          type="tel"
          placeholder={placeholder}
          // placeholder="Enter phone number"
          className="min-w-0 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm  outline-none focus:ring-2 focus:ring-primary placeholder:text-sm placeholder:font-normal placeholder:text-neutral-400"
        />
      </div>
    </div>
  );
}
