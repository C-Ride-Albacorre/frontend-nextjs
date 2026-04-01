import { TextareaProps } from '@/types/input';

export default function Textarea({
  id,
  name,
  label,
  placeholder,
  defaultValue,
  value,
  rows = 4,
  onChange,
  className,
  wrapperClassName,
  errorMessage,
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
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring placeholder:text-sm placeholder:text-neutral-400 placeholder:font-normal disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50 ${errorMessage ? 'border-red-500 focus-within:ring-red-500' : 'focus:ring-primary   '} ${className}`}
      />

      {errorMessage && (
        <div className="text-xs text-red-600">{errorMessage}</div>
      )}
    </div>
  );
}
