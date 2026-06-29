'use client';

import { useCustomerSocket } from '@/hooks/use-customer-socket';

type Props = {
  orderId: string;
  accessToken?: string;
};

export default function TrackingSocket({
  orderId,
  accessToken,
}: Props) {
  useCustomerSocket(orderId, accessToken);

  return null;
}