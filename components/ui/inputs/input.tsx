import clsx from 'clsx';
import { InputProps } from '@/types/input';

export default function Input({
  id,
  label,
  type = 'text',
  ariaLabel,
  variant = 'default',
  spacing = 'sm',
  placeholder,
  errorMessage,
  inputInfo,
  className,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  const wrapperClasses = clsx(
    'flex w-full items-center gap-2 rounded-xl px-4 py-3 text-base md:text-sm outline-none',
    'focus-within:ring-2 focus-within:ring-primary',
    {
      'border border-border bg-white': variant === 'default',
      'bg-foreground-100': variant === 'fill',
      'border-red-500 focus-within:ring-red-500': errorMessage,

      //sizes
      'mt-0': spacing === 'none',
      'mt-2': spacing === 'sm',
      'mt-4': spacing === 'md',
      'mt-6': spacing === 'lg',
    },
    className,
  );

  return (
    <div className="space-y-2 w-full">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <div className={wrapperClasses}>
        {leftIcon}

        <input
          id={id}
          name={id}
          type={type}
          aria-label={ariaLabel}
          aria-invalid={!!errorMessage}
          placeholder={placeholder}
          className=" w-full bg-transparent 
    text-base md:text-sm 
    outline-none  placeholder:font-normal
    placeholder:text-sm placeholder:text-neutral-400"
          {...props}
        />

        {rightIcon}
      </div>

      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}

      {inputInfo && <p className="text-xs text-neutral-500">{inputInfo}</p>}
    </div>
  );
}
