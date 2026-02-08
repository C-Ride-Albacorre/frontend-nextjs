import { Button } from '@/components/ui/buttons/button';

export default function AnalyticsPeriodTabs({
  setPeriod,
}: {
  setPeriod: (period: string) => void;
}) {
  return (
    <div className="space-x-4">
      <Button
        onClick={() => setPeriod('week')}
        variant="outline"
        size="sm"
        className="hover:bg-primary bg-white"
      >
        This week
      </Button>

      <Button
        onClick={() => setPeriod('month')}
        variant="outline"
        size="sm"
        className="hover:bg-primary bg-white"
      >
        This Month
      </Button>

      <Button
        onClick={() => setPeriod('year')}
        variant="outline"
        size="sm"
        className="hover:bg-primary bg-white"
      >
        This Year
      </Button>
    </div>
  );
}
