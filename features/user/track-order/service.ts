import { BASE_URL } from '@/config/api';
import { authRequest } from '@/libs/api/auth-request';

export type TrackingLeg = 'to-vendor' | 'to-customer' | null;

interface TrackingDetails {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    order: {
      id: string;
      number: string;
      code: string;
      status: string;
      statusHistory: Array<{ status: string; timestamp: string }>;
      totalAmount: number;
      orderType: string;
      createdAt: string;
      pickupLocation: {
        address: string;
        storeId: string;
        latitude: number;
        longitude: number;
        storeName: string;
      };
      dropoffLocation: {
        address: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        latitude: number;
        longitude: number;
      };
    };
    store: {
      id: string;
      name: string;
      logo: string;
      address: string;
      lat: number;
      lng: number;
    };
    driver: {
      id: string;
      fullName: string;
      photo: string | null;
      phone: string;
      rating: number;
      totalTrips: number;
      status: string;
    };
    assignment: {
      status: string;
      assignedAt: string;
      etaSeconds: number | null;
    };
    tracking: {
      leg: TrackingLeg;
      etaSeconds: number | null;
      polyline: string | null;
      driverLocation: {
        lat: number;
        lng: number;
        heading: number;
        timestamp: number;
      } | null;
      destination: {
        lat: number;
        lng: number;
      };
    };
  };
}
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
