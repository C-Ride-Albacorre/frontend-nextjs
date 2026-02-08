import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { ArrowDownLeft, Funnel } from 'lucide-react';
import { MOCK_DATA } from '../data';
import { Period } from '../type';

export default function AnalyticsTransactions({
  data,
}: {
  data: (typeof MOCK_DATA)[Period];
}) {
  return (
    <Card
      gap="sm"
      spacing="sm"
      className="p-4 xl:col-span-4 flex flex-col justify-between"
    >
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium ">Recent Transactions</p>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Funnel size={16} />}
            className="hover:bg-primary bg-white p-2 text-xs"
          >
            Filter
          </Button>
        </div>

        <ul className="space-y-8 max-h-105 overflow-y-auto">
          {data.transactions.map((item: any) => (
            <li className="flex justify-between" key={item.id}>
              <div className="flex-1 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 aspect-square  bg-[#10B981]/10">
                  <ArrowDownLeft size={20} className="text-[#10B981]" />
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">{item.title}</p>

                  <div className="flex gap-6 text-sm text-neutral-400">
                    <p>{item.date}</p>

                    <p>Commission: {item.commission}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-right">
                <p className="text-[#10B981] font-medium">{item.amount}</p>

                <span
                  className={`px-2 py-1 rounded-full ${item.status === 'completed' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-neutral-100 text-primary-text-100'} text-[10px]`}
                >
                  {item.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {data.transactions.length > 5 && (
        <Button variant="outline" size="sm" className="w-full hover:bg-primary">
          View All Transactions
        </Button>
      )}
    </Card>
  );
}
