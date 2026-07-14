'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';
import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function PaginationControls({
  currentPage,
  totalPages,
  isLoading,
}: {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    router.replace(`${pathname}?${params.toString()}`);

    setLoading(false);
  };

  return (
    <div className="flex justify-center md:justify-end items-center gap-6">
      <Button
        disabled={currentPage <= 1 || isLoading || loading}
        onClick={() => updatePage(currentPage - 1)}
        leftIcon={<ChevronLeft size={16} />}
        variant="white"
        size="icon"
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {(isLoading || loading) && (
          <LoaderCircle size={16} className="animate-spin text-primary" />
        )}

        <div className=" text-neutral-600 text-xs flex items-center gap-1">
          Showing Page <h5 className="font-semibold">{currentPage}</h5> of{' '}
          <h5 className="font-semibold">{totalPages}</h5>
        </div>
      </div>

      <Button
        disabled={currentPage >= totalPages || isLoading || loading}
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
