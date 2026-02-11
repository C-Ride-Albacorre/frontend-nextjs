import clsx from 'clsx';

export default function Card({
  gap = 'lg',
  spacing = 'sm',
  border = 'default',
  children,
  className,
}: {
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'default' | 'none';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        'rounded-2xl',
        {
          'space-y-0': gap === 'none',
          'space-y-2': gap === 'xs',
          'space-y-4': gap === 'sm',
          'space-y-6': gap === 'md',
          'space-y-8 lg:space-y-12': gap === 'lg',

          'p-0': spacing === 'none',
          'p-4 md:p-6': spacing === 'sm',
          'p-6': spacing === 'md',
          'p-8 lg:p-12': spacing === 'lg',

          'border border-border': border === 'default',
          'border-0': border === 'none',
        },
        className,
      )}
    >
      {children}
    </section>
  );
}
