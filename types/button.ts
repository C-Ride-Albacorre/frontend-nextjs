type ButtonVariant =
  | 'default'
  | 'primary'
  | 'outline'
  |'primary-outline'
  | 'white-outline'
  | 'secondary'
  | 'ghost'
  | 'green'
  | 'white-nav-link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type IconButtonProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md';
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  priority?: boolean;
  className?: string;
};
