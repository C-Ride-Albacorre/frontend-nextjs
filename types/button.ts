type ButtonVariant =
  | 'default'
  | 'primary'
  | 'outline'
  | 'primary-outline'
  | 'white-outline'
  | 'secondary'
  | 'ghost'
  | 'green'
  | 'white-nav-link';
type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | 'full';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
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
  highlightOnRoutes?: string[];
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  priority?: boolean;
  className?: string;
};
