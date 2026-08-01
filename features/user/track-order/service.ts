import { BASE_URL } from '@/config/api';
import { authRequest } from '@/libs/api/auth-request';
import { TrackingDetails } from './types';



export async function trackingDetailsService({ orderId }: { orderId: string }) {
  return await authRequest<TrackingDetails>(
    `${BASE_URL}/vendor/orders/${orderId}/tracking`,
    {
      nextTags: ['fetchTrackingDetails'],
    },
  );
}



export async function submitRatingService({
  orderId,
  rating,
  comment,
}: {
  orderId: string;
  rating: number;
  comment: string;
}) {

    console.log('submitRatingService called with:', { orderId, rating, comment });
  return await authRequest(`${BASE_URL}/ratings/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId,
      rating,
      comment,
    }),
  });
}


