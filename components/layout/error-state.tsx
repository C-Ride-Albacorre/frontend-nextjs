import { Boxes, Soup } from 'lucide-react';
import Card from './card';
import { Button } from '../ui/buttons/button';
import { b } from 'framer-motion/client';
import RetryButton from '../ui/buttons/retry-button';

export default function ErrorState({
  title,
  message,
  icon,
  urlPath,
  buttonText,
    retry,
}: {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  urlPath?: string;

  buttonText?: string;
    retry?: boolean;
}) {
  return (
    <Card
      gap="md"
      border="none"
      spacing="lg"
      className="flex flex-col items-center py-16"
    >
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
          {icon}
        </div>
      )}

      <div className="space-y-3 text-center">
        <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>

        {message && (
          <p className="max-w-md text-sm text-neutral-500">{message}</p>
        )}
      </div>

      {urlPath && (
        <Button variant="primary" size="icon" href={urlPath}>
          {buttonText || 'Go Back'}
        </Button>
      )}

      {retry && <RetryButton />}
    </Card>
  );
}
