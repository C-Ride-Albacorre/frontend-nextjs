import { TextareaProps } from '@/types/input';

export default function Textarea({
  id,
  label,
  placeholder,
  //   value,
  rows = 4,
  //   onChange,
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="font-medium text-sm">
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        rows={rows}
        // value={value}
        // onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
