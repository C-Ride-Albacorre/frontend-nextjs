import { AlertTriangle, Clock } from 'lucide-react';

export default function RecentAlerts() {
  const alerts = [
    {
      title: 'Suspicious Activity Detected',
      desc: 'Multiple failed payment attempts from user ID #8542',
      time: '15 mins ago',
      level: 'high',
    },
    {
      title: 'New Dispute Filed',
      desc: 'Order #CRD–2024–8851 – Customer claims non-delivery',
      time: '1 hour ago',
      level: 'medium',
    },
    {
      title: 'Payout Approval Needed',
      desc: '7 vendor payouts pending approval (₦2.4M total)',
      time: '2 hours ago',
      level: 'low',
    },
  ];

  const levelStyles = {
    high: 'bg-red-100 text-red-600',
    medium: 'bg-yellow-100 text-yellow-600',
    low: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white rounded-2xl border p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">Recent Alerts</h2>
          <p className="text-sm text-neutral-500">System notifications</p>
        </div>

        <button className="text-sm border px-4 py-2 rounded-lg">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="border rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-medium">
                <AlertTriangle size={16} />
                {alert.title}
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${levelStyles[alert.level as keyof typeof levelStyles]}`}
              >
                {alert.level}
              </span>
            </div>

            <p className="text-sm text-neutral-500">{alert.desc}</p>

            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock size={12} />
              {alert.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
