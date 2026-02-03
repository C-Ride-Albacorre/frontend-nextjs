import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import clsx from 'clsx';
import { CheckCircle, Eye } from 'lucide-react';

export default function OrderCard({
  status,
  customer,
  price,
  action,
}: {
  status: string;
  customer: string;
  price: string;
  action?: string;
}) {
  return (
    <Card gap="sm" className="bg-white   flex  flex-col sm:flex-row gap-6 justify-between sm:items-center px-4">
      <div className="space-y-4 mb-0">
        <div className="flex items-center gap-5">
          <span className="text-sm font-medium">#CR-2847</span>

          <div className='flex items-center gap-1'>
            <span
              className={clsx('text-[10px] px-1.5 py-1 rounded-full', {
                'bg-primary/10 text-primary': status === 'pending',
                'bg-blue-50 text-blue-700': status === 'preparing',
                'bg-green-50 text-green-700': status === 'ready',
                'bg-purple-100 text-purple-700': status === 'in transit',
              })}
            >
              {status}
            </span>
            <span className="text-xs text-neutral-400">5 mins ago</span>
          </div>
        </div>

        <p className="font-medium">{customer}</p>
        <p className="text-sm text-neutral-500">
          Signature Jollof Rice, Asun Platter
        </p>
        <p className="text-sm text-primary flex items-center gap-2">
          <span>{price}</span>{' '}
          <span className="text-neutral-500">• Express – 30 mins</span>
        </p>
      </div>

      <div className="flex gap-2 md:gap-4">
        <Button
          variant="outline"
          leftIcon={<Eye size={18} />}
          className="px-4 py-2 border rounded-lg text-sm text-neutral-500"
          size="sm"
        >
          View
        </Button>

        {action && (
          <Button
            type="submit"
            variant={action === 'Accept' ? 'green' : 'primary'}
            className={`px-4 py-2 rounded-lg   text-sm `}
            leftIcon={action === 'Accept' && <CheckCircle size={18} />}
          >
            {action}
          </Button>
        )}
      </div>
    </Card>
  );
}
