import clsx from 'clsx';

export default function Card({
  gap = 'lg',
  spacing = 'md',
  children,
  className,
}: {
  gap?: 'none' | 'sm' | 'md' | 'lg';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        'rounded-2xl border border-border',
        {
          'space-y-0': gap === 'none',
          'space-y-4': gap === 'sm',
          'space-y-6': gap === 'md',
          'space-y-8 lg:space-y-12': gap === 'lg',

          'py-0': spacing === 'none',
          'py-4': spacing === 'sm',
          'py-6': spacing === 'md',
          'py-8 lg:py-12': spacing === 'lg',
        },
        className,
      )}
    >
      {children}
    </section>
  );
}
