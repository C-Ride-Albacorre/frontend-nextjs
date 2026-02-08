import Card from '@/components/layout/card';
import { Period } from '../type';
import { MOCK_DATA } from '../data';

export default function AnalyticsCommission({
  data,
}: {
  data: (typeof MOCK_DATA)[Period];
}) {
  return (
    <Card gap="sm" spacing="sm" className="p-4 space-y-8 ">
      <div>
        <p className="text-sm font-medium mb-2">Commission Breakdown</p>
      </div>

      <ul className="space-y-4 max-h-90 overflow-y-auto">
        {data.commissions.map((item: any, index: number) => (
          <li key={index}>
            <Card gap="sm" spacing="sm" className="p-4 flex justify-between">
              <div className="space-y-6 mb-0">
                <p>{item.range}</p>

                <p className="text-neutral-500 text-sm">{item.orders} orders</p>
              </div>

              <div className="space-y-6 mb-0">
                <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {item.rate}
                </p>

                <p className="text-neutral-500 text-sm">₦{item.value}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Card>
  );
}
