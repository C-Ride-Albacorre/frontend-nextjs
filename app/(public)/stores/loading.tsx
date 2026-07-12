import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Loader size={32} className="animate-spin text-primary" />
    </div>
  );
}
