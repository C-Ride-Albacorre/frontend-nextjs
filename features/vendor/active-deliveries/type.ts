export type OrderBase = {
  status: 'In Transit' | 'Delivered' | 'Pending';
  scheduleType?: 'Scheduled' | 'Instant';

  percent: number;
  visible: boolean;

  customer: string;
  address: string;
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


export type OrderProps = OrderBase & {
  orderId: string;
  distance: string;
};

export type DeliveryDetailsModalProps = OrderBase & {
  openModal: boolean;
  onClose: () => void;
  statusClass: string;
  scheduleClass?: string;
  barRef: React.RefObject<HTMLDivElement | null>;
};
