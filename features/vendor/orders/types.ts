export type VendorOrderActionPayload = {
  orderId: string;
  payload: {
    action: 'ACCEPT' | 'DECLINE';
    reason?: string;
  };
};
