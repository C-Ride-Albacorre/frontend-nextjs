import { TextareaProps } from '@/types/input';

export default function Textarea({
  id,
  name,
  label,
  placeholder,
  value,
  rows = 4,
  onChange,
  className,
  wrapperClassName,
  disabled,
  ...props
}: TextareaProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="font-medium text-sm">
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        rows={rows}
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary placeholder:text-sm placeholder:text-neutral-400 placeholder:font-normal disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50 ${className}`}
      />
    </div>
  );
}
