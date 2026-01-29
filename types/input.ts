export type InputProps = {
  id?: string;
  label?: string;
  variant?: 'default' | 'fill';
  ariaLabel?: string;
  type?: React.HTMLInputTypeAttribute;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  placeholder?: string;
  errorMessage?: string;
  inputInfo?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // value?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
