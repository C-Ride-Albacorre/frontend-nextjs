import {
  CartItem,
  PickupLocation,
  StatusHistory,
  DropoffLocation,
} from '../delivery/types';

// export interface Order {
//   id: string;
//   orderNumber: string;
//   orderCode: string;
//   orderStatus: string;
//   paymentStatus: string;

//   subtotal: number;
//   deliveryFee: number;
//   totalAmount: number;

//   recipientName: string;
//   recipientPhone: string;

//   dropoffLocation: {
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     postalCode: string;
//   };

//   createdAt: string;

//   items: {
//     id: string;

//     quantity: number;
//     unitPrice: number;
//     totalPrice: number;
//     product: {
//       productName: string;
//     };
//   }[];
// }

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  orderType: 'VENDOR';
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  taxAmount: number;
  totalAmount: number;
  deliveryOptionId: string | null;
   dropoffLocation: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  recipientName: string;
  recipientPhone: string;
  deliveryInstructions: string | null;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentMethod: string | null;
  paymentReference: string | null;
  monnifyReference: string | null;
  orderStatus: string;
  statusHistory: StatusHistory[];
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  pickupLocation: PickupLocation[];
  orderCode: string;
  respondedAt: string | null;
  reason: string | null;
  canceledAt: string | null;
  deliveredAt: string | null;
  driverAssignedAt: string | null;
  pickedUpAt: string | null;
  vendorAcceptedAt: string | null;
  vendorDeclinedAt: string | null;
  storeId: string | null;
  items: {
    id: string;

    quantity: number;
    unitPrice: number;
    totalPrice: number;
    product: {
      productName: string;
    };
  }[];
  deliveryOption: null;
}
