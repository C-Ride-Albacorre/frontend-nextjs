import Card from '@/components/layout/card';
import { Star, Store } from 'lucide-react';

export default function TopVendors() {
  const vendors = [
    {
      name: 'The Place Restaurant',
      orders: 856,
      rating: 4.9,
      revenue: '₦5.85M',
    },
    { name: 'Ikoyi Fusion', orders: 742, rating: 4.8, revenue: '₦4.92M' },
    { name: 'Lagos Grills', orders: 689, rating: 4.7, revenue: '₦4.25M' },
  ];

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Top Vendors</h2>
          <p className="text-xs text-neutral-500">This month's performers</p>
        </div>

        <div className="bg-green-50 w-10 h-10 flex items-center justify-center rounded-full aspect-square shrink-0">
          <Store size={20} className="text-green-600" />
        </div>
      </div>

      <div className="space-y-6 md:space-y-4 max-h-96 overflow-y-auto">
        {vendors.map((vendor, index) => (
          <Card key={index} className="flex justify-between items-center  p-4">
            <div className="flex items-center gap-4 mb-0">
              <div className="w-8 h-8 rounded-full bg-linear-to-b from-blue-400 to-blue-600 text-white flex items-center justify-center text-sm">
                #{index + 1}
              </div>

              <div className="space-y-2">
                <p className="font-medium">{vendor.name}</p>
                <p className="text-xs text-neutral-500 flex items-center gap-1 ">
                  {vendor.orders} orders • <Star stroke="0" fill="#D4AF37" size={18} />{' '}
                  {vendor.rating}
                </p>
              </div>
            </div>

            <span className="text-green-600 font-medium">{vendor.revenue}</span>
          </Card>
        ))}
      </div>
    </Card>
  );
}
