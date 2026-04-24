

import { Button } from '@/components/ui/buttons/button';
import { RotateCcw } from 'lucide-react';

export default function NearbyStoresError({
  resetErrorBoundary,
  errorIcon,
  errorTitle,
  errorMessage,
}: {
  resetErrorBoundary: () => void;
  errorIcon?: React.ReactNode;
  errorTitle?: string;
  errorMessage?: string;
}) {
  return (
    <section className="py-14 space-y-4 flex flex-col items-center justify-center">
      {errorIcon}

      <div className="space-y-2">
        {errorTitle && (
          <h2 className="text-2xl font-semibold mt-4">{errorTitle}</h2>
        )}
        {errorMessage && (
          <p className="text-center text-gray-400 text-sm">{errorMessage}</p>
        )}
      </div>

      <Button
        size="icon"
        onClick={resetErrorBoundary}
        variant="outline"
        leftIcon={<RotateCcw size={16} />}
      >
        Try again
      </Button>
    </section>
  );
}
