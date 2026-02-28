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
    <div className="bg-white rounded-2xl border p-6 space-y-6">
      <div>
        <h2 className="font-semibold text-lg">Top Vendors</h2>
        <p className="text-sm text-neutral-500">This month's performers</p>
      </div>

      <div className="space-y-4">
        {vendors.map((vendor, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                #{index + 1}
              </div>

              <div>
                <p className="font-medium">{vendor.name}</p>
                <p className="text-sm text-neutral-500">
                  {vendor.orders} orders • ⭐ {vendor.rating}
                </p>
              </div>
            </div>

            <span className="text-green-600 font-medium">{vendor.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
