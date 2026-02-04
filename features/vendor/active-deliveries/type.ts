export type Order = {
  orderId: string;
  status: 'In Transit' | 'Delivered' | 'Pending';
  scheduleType?: 'Scheduled' | 'Instant';
  percent?: number;

  customer: string;

  address: string;
  distance: string;
  fee: string;

  driver: {
    name: string;
    rating: number;
  };

  items: {
    name: string;
    quantity: number;
  }[];

  timeline: {
    label: string;
    time: string;
  }[];
};
