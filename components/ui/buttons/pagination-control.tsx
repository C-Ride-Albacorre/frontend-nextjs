'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';
import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';
import { useTransition } from 'react';

export default function PaginationControls({
  currentPage,
  totalPages,
  isLoading,
}: {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(newPage));
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const isLoadingState = isLoading || isPending;

  return (
    <div className="flex justify-center md:justify-end items-center gap-6">
      <Button
        disabled={currentPage <= 1 || isLoadingState}
        onClick={() => updatePage(currentPage - 1)}
        leftIcon={<ChevronLeft size={16} />}
        variant="white"
        size="icon"
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {isLoadingState && (
          <LoaderCircle size={16} className="animate-spin text-primary" />
        )}

        <div className=" text-neutral-600 text-xs flex items-center gap-1">
          <span className='hidden md:flex'> Showing Page</span>
          <h5 className="font-semibold">{currentPage}</h5> <span> of </span>
          <h5 className="font-semibold">{totalPages}</h5>
        </div>
      </div>

      <Button
        disabled={currentPage >= totalPages || isLoadingState}
        onClick={() => updatePage(currentPage + 1)}
        rightIcon={<ChevronRight size={16} />}
        variant="white"
        size="icon"
      >
        Next
      </Button>
    </div>
  );
}
