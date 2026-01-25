import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ButtonProceed({
  buttonText,
  href,
  className,
}: {
  buttonText: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-3  lg:px-8 lg:py-4 bg-primary hover:bg-primary-hover rounded-xl font-medium text-sm  cursor-pointer flex gap-1 md:gap-4 items-center justify-center ${className}`}
    >
      {buttonText}
      <ChevronRight size={16} />
    </Link>
  );
}
