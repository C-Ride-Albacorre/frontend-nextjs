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

export type TextareaProps = {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type OtpInputProps = {
  ref?: React.Ref<HTMLInputElement>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  inputMode?: string;
  className?: string;
};


export type FileInputProps = {
  title: string;
  description: string;
  verified?: boolean;
  mode?: 'upload' | 'dashboard';
};