import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';

export default function AnalyticsInfoCard({
  icon,
  iconBackground,
  status,
  title,
  amount,
  buttonText,
  footNote,
}: {
  icon: React.ReactNode;
  iconBackground: string;
  status?: string;
  title: string;
  amount: string;
  buttonText?: string;
  footNote?: string;
}) {
  return (
    <Card
      gap="md"
      spacing="sm"
      className="group bg-white rounded-xl border p-4 hover:bg-primary"
    >
      <div className="flex justify-between items-center">
        <div
          className={` group-hover:bg-[#FBF7EB] group-hover:text-primary w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square transition-transform ${iconBackground}`}
        >
          {icon}
        </div>

        {status && (
          <span className="text-primary-text-100 bg-primary/10 py-1 px-2 text-xs rounded-full group-hover:bg-white-hover-100 ">
            {status}
          </span>
        )}
      </div>

      <p className="text-neutral-500 text-sm">{title}</p>

      <p className="text-xl font-medium">{amount}</p>

      {buttonText && (
        <Button
          variant="primary"
          size="sm"
          className="text-xs w-full group-hover:bg-white hover:bg-white transition-transform"
        >
          {buttonText}
        </Button>
      )}

      {footNote && (
        <p className="text-xs md:text-sm text-neutral-500">{footNote}</p>
      )}
    </Card>
  );
}
