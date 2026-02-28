import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
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
    <Card>
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Recent Alerts</h2>
          <p className="text-xs text-neutral-500">System notifications</p>
        </div>

        <Button variant="white" size="icon">
          View All
        </Button>
      </div>

      <div className="space-y-6 md:space-y-4 max-h-96 overflow-y-auto">
        {alerts.map((alert, index) => (
          <Card gap='sm' key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-medium">
                <AlertTriangle size={16} className='text-red-600' />
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
          </Card>
        ))}
      </div>
    </Card>
  );
}
