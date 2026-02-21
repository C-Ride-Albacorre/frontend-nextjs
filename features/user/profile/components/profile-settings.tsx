'use client';

import { useState } from 'react';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Edit } from 'lucide-react';

export default function ProfileSettings() {
  const [emailNotifications, setEmailNotifications] = useState(false);

  const [smsNotifications, setSmsNotifications] = useState(false);

  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <Card gap="lg">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Account Settings</p>

        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          leftIcon={<Edit size={16} />}
        >
          Edit Settings
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="bg-foreground-200 flex items-center justify-between gap-4">
          <div className="space-y-4 text-sm mb-0">
            <p>Email Notifications</p>

            <p className="text-neutral-500 flex-wrap">
              Receive updates about your orders
            </p>
          </div>

          <div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                emailNotifications ? 'bg-[#10B981]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  emailNotifications ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </Card>

        <Card className="bg-foreground-200 flex items-center justify-between gap-4">
          <div className="space-y-4 text-sm mb-0">
            <p>SMS Notifications</p>

            <p className="text-neutral-500 flex-wrap">
              Get SMS alerts for deliveries
            </p>
          </div>

          <div>
            <button
              onClick={() => setSmsNotifications(!smsNotifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                smsNotifications ? 'bg-[#10B981]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  smsNotifications ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </Card>

        <Card className="bg-foreground-200 flex items-center justify-between gap-4">
          <div className="space-y-4 text-sm mb-0">
            <p>Promotional Updates</p>

            <p className="text-neutral-500 flex-wrap">
              Receive special offers and deals
            </p>
          </div>

          <div>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                pushNotifications ? 'bg-[#10B981]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  pushNotifications ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </Card>
      </div>
    </Card>
  );
}
