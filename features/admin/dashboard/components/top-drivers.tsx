import Card from '@/components/layout/card';
import { Star, Truck } from 'lucide-react';

export default function TopDrivers() {
  const drivers = [
    { name: 'Tunde Adeyemi', orders: 145, rating: 4.9, revenue: '₦425.0k' },
    { name: 'Ngozi Eze', orders: 132, rating: 4.8, revenue: '₦385.0k' },
    { name: 'Ibrahim Yusuf', orders: 128, rating: 4.9, revenue: '₦375.0k' },
  ];

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Top Drivers</h2>
          <p className="text-xs text-neutral-500">This month's performers</p>
        </div>

        <div className="bg-neutral-200 w-10 h-10 flex items-center justify-center rounded-full aspect-square shrink-0">
          <Truck size={20} className="text-neutral-500" />
        </div>
      </div>

      <div className="space-y-6 md:space-y-4 max-h-96 overflow-y-auto">
        {drivers.map((driver, index) => (
          <Card key={index} className="flex justify-between items-center  p-4">
            <div className="flex items-center gap-4 mb-0">
              <div className="w-8 h-8 rounded-full bg-linear-to-b from-primary to-[#B8941F] text-white flex items-center justify-center text-sm">
                #{index + 1}
              </div>

              <div className="space-y-2">
                <p className="font-medium">{driver.name}</p>
                <p className="text-xs text-neutral-500 flex items-center gap-1 ">
                  {driver.orders} orders •{' '}
                  <Star stroke="0" fill="#D4AF37" size={18} /> {driver.rating}
                </p>
              </div>
            </div>

            <span className="text-green-600 font-medium">{driver.revenue}</span>
          </Card>
        ))}
      </div>
    </Card>
  );
}
