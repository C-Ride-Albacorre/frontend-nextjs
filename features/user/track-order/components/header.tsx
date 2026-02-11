'use client';

import { useRouter } from 'next/navigation';

import { IconButton } from '@/components/ui/buttons/icon-button';
import { ChevronLeft } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  const backHandler = () => {
    router.back();
  };
  return (
    <>
      <header className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-6">
          <IconButton onClick={backHandler}>
            <ChevronLeft size={24} className="cursor-pointer" />
          </IconButton>

          <div className="space-y-2">
            <h1 className=" text-xl md:text-2xl font-medium">
              Tracking Delivery
            </h1>
            <p className="text-sm text-neutral-500">CRD-2024-1234</p>
          </div>
        </div>

        <span className="rounded-full bg-[#10B981] p-2 text-xs text-white">
          On Route
        </span>
      </header>
    </>
  );
}
