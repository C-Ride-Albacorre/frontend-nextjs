import { Clock, Truck } from 'lucide-react';

export default function PendingApprovals() {
  const approvals = [
    { name: 'Chinedu Okafor', time: '2 hours ago' },
    { name: 'Lagos Gourmet Kitchen', time: '4 hours ago' },
    { name: 'Amina Hassan', time: '5 hours ago' },
  ];

  return (
    <div className="bg-white rounded-2xl border p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">Pending Approvals</h2>
          <p className="text-sm text-neutral-500">
            Requires immediate attention
          </p>
        </div>

        <span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          3 Pending
        </span>
      </div>

      <div className="space-y-4">
        {approvals.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Truck size={18} className="text-blue-600" />
              </div>

              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-1 text-sm text-neutral-500">
                  <Clock size={14} />
                  {item.time}
                </div>
              </div>
            </div>

            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
              Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
