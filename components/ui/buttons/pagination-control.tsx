'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/buttons/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-end items-center gap-6">
      <Button
        disabled={currentPage <= 1}
        onClick={() => updatePage(currentPage - 1)}
        leftIcon={<ChevronLeft size={16} />}
        variant="white"
        size="icon"
      >
        Previous
      </Button>

      <p className="text-sm">
        {currentPage} / {totalPages}
      </p>

      <Button
        disabled={currentPage >= totalPages}
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
