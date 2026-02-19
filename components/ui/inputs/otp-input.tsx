import { OtpInputProps } from '@/types/input';

export function OtpInput({
  ref,
  value,
  name,
  onChange,
  onKeyDown,
  maxLength,
  inputMode,
  className,
  ...props
}: OtpInputProps) {
  return (
    <input
      ref={ref}
      type={inputMode}
      value={value}
      name={name}
      onChange={onChange}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      className={`
        aspect-square
        w-10 sm:w-12 md:w-14
        rounded-lg sm:rounded-xl
        border border-border
        text-center
        text-base sm:text-lg
        outline-none
        focus:ring-2 focus:ring-primary ${className}
      `}
      {...props}
    />
  );
}
