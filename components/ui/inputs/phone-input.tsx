export default function PhoneInput({
  id,
  name,
  countryCode = '+234',
  placeholder = 'Enter phone number',
  value,
  errorMessage,
  inputInfo,
  onChange,
}: {
  id?: string;
  name?: string;
  countryCode?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string | undefined;
  inputInfo?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-medium">Phone Number</label>

      <div className="mt-2 flex gap-2 w-full">
        <span className="flex items-center shrink-0 px-4 rounded-xl border border-border text-sm">
          {countryCode}
        </span>

        <input
          type="tel"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`min-w-0 w-full rounded-xl border px-4 py-3 text-base md:text-sm outline-none placeholder:text-sm
            focus:ring-2 focus:ring-primary
            ${errorMessage ? 'border-red-500' : 'border-border'}
          `}
        />
      </div>

      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}

      {inputInfo && <p className="text-xs text-neutral-500">{inputInfo}</p>}
    </div>
  );
}
