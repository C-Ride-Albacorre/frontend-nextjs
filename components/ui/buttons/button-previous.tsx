import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

export default function ButtonPrevious({
  buttonText,
  href,
}: {
  buttonText: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-3  lg:px-12 lg:py-4 bg-foreground-100 hover:bg-foreground-200 rounded-xl font-medium text-sm  cursor-pointer flex gap-1 md:gap-4 items-center justify-center border border-border"
    >
      <ChevronLeft size={16} />
      {buttonText}
    </Link>
  );
}
