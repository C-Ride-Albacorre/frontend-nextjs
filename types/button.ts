type ButtonVariant =
  | 'default'
  | 'primary'
  | 'primary-inverted'
  | 'primary-black-outline'
  | 'primary-inverted-outline'
  | 'outline'
  | 'fill'
  | 'primary-outline'
  | 'white'
  | 'white-outline'
  | 'white-nav-link'
  | 'secondary'
  | 'ghost'
  | 'gray'
  | 'green'
  | 'green-outline'
  | 'black'
  | 'red'
  | 'red-outline';

type ButtonSize =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | 'full'
  | 'icon';

type JustifyOptions =
  | 'center'
  | 'start'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  justify?: JustifyOptions;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type IconButtonProps = {
  children: React.ReactNode;
  size?: 'none' | 'sm' | 'md';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
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
