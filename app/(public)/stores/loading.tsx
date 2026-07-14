import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <LoaderCircle size={32} className="animate-spin text-primary" />
    </div>
  );
}
