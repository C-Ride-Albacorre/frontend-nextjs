import clsx from 'clsx';
import { InputProps } from '@/types/input';

export default function Input({
  id,
  label,
  name,
  type = 'text',
  ariaLabel,
  variant = 'default',
  spacing = 'sm',
  placeholder,
  value,
  onChange,
  errorMessage,
  inputInfo,
  className,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: InputProps) {
  const wrapperClasses = clsx(
    'flex w-full items-center gap-2 rounded-xl px-4 py-3 text-base md:text-sm outline-none',
    'focus-within:ring focus-within:ring-primary border border-border',
    {
      ' bg-white': variant === 'default',
      'bg-foreground-100': variant === 'fill',
      'border-red-500 focus-within:ring-red-500': errorMessage,
      'opacity-60 cursor-not-allowed bg-gray-50': disabled,

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
          name={name}
          type={type}
          aria-label={ariaLabel}
          value={value}
          onChange={onChange}
          aria-invalid={!!errorMessage}
          placeholder={placeholder}
          disabled={disabled}
          className=" w-full bg-transparent 
    text-base md:text-sm 
    outline-none  placeholder:font-normal
    placeholder:text-sm placeholder:text-neutral-400 disabled:cursor-not-allowed"
          {...props}
        />

        {rightIcon}
      </div>

      {errorMessage && (
        <div className="text-xs text-red-600">{errorMessage}</div>
      )}

      {inputInfo && <p className="text-xs text-neutral-500">{inputInfo}</p>}
    </div>
  );
}
