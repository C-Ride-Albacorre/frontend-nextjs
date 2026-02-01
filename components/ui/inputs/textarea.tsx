import { TextareaProps } from '@/types/input';
import { p } from 'framer-motion/client';

export default function Textarea({
  id,
  label,
  placeholder = '',

  //   value,
  rows = 4,
  //   onChange,
  className,
  wrapperClassName,
  ...props
}: TextareaProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="font-medium text-sm">
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        rows={rows}
        {...props}
        // value={value}
        // onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary placeholder:text-sm placeholder:text-neutral-400 placeholder:font-normal ${className}`}
      />
    </div>
  );
}
