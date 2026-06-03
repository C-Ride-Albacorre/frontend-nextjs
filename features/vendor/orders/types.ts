export type VendorOrderActionPayload = {
  orderId: string;
  payload: {
    action: 'ACCEPT' | 'REJECT';
    reason?: string;
  };
};
