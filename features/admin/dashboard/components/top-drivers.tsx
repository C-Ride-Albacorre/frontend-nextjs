export default function TopDrivers() {
  const drivers = [
    { name: 'Tunde Adeyemi', orders: 145, rating: 4.9, revenue: '₦425.0k' },
    { name: 'Ngozi Eze', orders: 132, rating: 4.8, revenue: '₦385.0k' },
    { name: 'Ibrahim Yusuf', orders: 128, rating: 4.9, revenue: '₦375.0k' },
  ];

  return (
    <div className="bg-white rounded-2xl border p-6 space-y-6">
      <div>
        <h2 className="font-semibold text-lg">Top Drivers</h2>
        <p className="text-sm text-neutral-500">This month's performers</p>
      </div>

      <div className="space-y-4">
        {drivers.map((driver, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-sm font-semibold">
                #{index + 1}
              </div>

              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-sm text-neutral-500">
                  {driver.orders} orders • ⭐ {driver.rating}
                </p>
              </div>
            </div>

            <span className="text-green-600 font-medium">{driver.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
