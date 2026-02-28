import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Clock, Truck } from 'lucide-react';

export default function PendingApprovals() {
  const approvals = [
    { name: 'Chinedu Okafor', time: '2 hours ago' },
    { name: 'Lagos Gourmet Kitchen', time: '4 hours ago' },
    { name: 'Amina Hassan', time: '5 hours ago' },
  ];

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Pending Approvals</h2>
          <p className="text-xs text-neutral-500">
            Requires immediate attention
          </p>
        </div>

        <span className="text-xs bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full">
          3 Pending
        </span>
      </div>

      <div className="space-y-6 md:space-y-4 max-h-105 overflow-y-auto">
        {approvals.map((item, index) => (
          <Card key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-4 mb-0 text-sm">
              <div className="p-2 rounded-full bg-blue-100">
                <Truck size={18} className="text-blue-600" />
              </div>

              <div className="space-y-2">
                <p className="font-medium text-sm">{item.name}</p>
                <div className="flex items-center gap-1 text-sm text-neutral-500">
                  <Clock size={14} />
                  {item.time}
                </div>
              </div>
            </div>

            <Button variant="green" size="sm">
              Review
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
}
