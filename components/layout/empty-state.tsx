import { Button } from '../ui/buttons/button';
import RetryButton from '../ui/buttons/retry-button';
import Card from './card';

export default function EmptyState({
  title,
  message,
  icon,
  urlPath,
  buttonText,
  retry,
  onClick,
}: {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  urlPath?: string;
  buttonText?: string;
  retry?: boolean;
  onClick?: () => void;

}) {
  return (
    <Card
      gap="md"
      border="none"
      spacing="lg"
      className="flex flex-col items-center py-16"
    >
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
          {icon}
        </div>
      )}

      <div className="space-y-3 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>

        {message && (
          <p className="max-w-md text-sm text-neutral-500">{message}</p>
        )}
      </div>

      {urlPath && (
        <Button variant="primary" size="icon" href={urlPath} onClick={onClick}>
          {buttonText || 'Go Back'}
        </Button>
      )}

      {retry && <RetryButton />}
    </Card>
  );
}
