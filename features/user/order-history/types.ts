export interface Order {
  id: string;
  orderNumber: string;
  orderCode: string;
  orderStatus: string;
  paymentStatus: string;

  subtotal: number;
  deliveryFee: number;
  totalAmount: number;

  recipientName: string;
  recipientPhone: string;

  dropoffLocation: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  createdAt: string;

  items: {
    id: string;

    quantity: number;
    unitPrice: number;
    totalPrice: number;
    product: {
      productName: string;
    };
  }[];
}
