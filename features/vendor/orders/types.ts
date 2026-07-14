export type VendorOrderActionPayload = {
  orderId: string;
  payload: {
    action: 'ACCEPT' | 'DECLINE';
    reason?: string;
  };
};

export type VendorOrderApiResponse = {
  success: boolean;
  message: string;
  data: {
    data: {
      id: string;
      orderNumber: string;
      orderCode: string;
      createdAt: string;
      orderStatus: string;
      paymentStatus: string;
      user: {
        id: string;
        email: string;
        phoneNumber: string | null;
        countryCode: string | null;
        password: string;
        firstName: string;
        lastName: string;
        role: string;
        isActive: boolean;
        refreshTokenHash: string | null;
        referralCode: string | null;
        referredBy: string | null;
        lastLoginAt: string;
        isVerified: boolean;
        verifiedAt: string;
        createdAt: string;
        updatedAt: string;
        emailVerifiedAt: string;
        isEmailVerified: boolean;
        isPhoneVerified: boolean;
        onboardingCompletedAt: string | null;
        phoneVerifiedAt: string | null;
        status: string;
        profilePicture: string | null;
        onboardingStatus: string;
        onboardingStep: string | null;
        approvedAt: string | null;
        approvedBy: string | null;
        rejectionReason: string | null;
        isNewUser: boolean;
        fcmToken: string | null;
        deviceType: string | null;
      };
      items: any[];
      vendorSummary: {
        itemCount: number;
        totalQuantity: number;
        subtotal: number;
      };
    };
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export interface GetVendorOrderIdServiceResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    id: string;
    orderNumber: string;
    orderCode: string;
    createdAt: string;
    orderStatus: string;
    paymentStatus: string;
    recipientName: string;
    recipientPhone: string;
    deliveryInstructions: string;
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
    user: {
      id: string;
      email: string;
      phoneNumber: string | null;
      password: string;
      firstName: string;
      lastName: string;
      role: string;
      isActive: boolean;
      refreshTokenHash: string | null;
      referralCode: string | null;
      referredBy: string | null;
      lastLoginAt: string;
      isVerified: boolean;
      verifiedAt: string;
      createdAt: string;
      updatedAt: string;
      emailVerifiedAt: string;
      isEmailVerified: boolean;
      isPhoneVerified: boolean;
      onboardingCompletedAt: string | null;
      phoneVerifiedAt: string | null;
      status: string;
      profilePicture: string | null;
      onboardingStatus: string;
      onboardingStep: string | null;
      approvedAt: string | null;
      approvedBy: string | null;
      rejectionReason: string | null;
      isNewUser: boolean;
      countryCode: string | null;
      fcmToken: string | null;
      deviceType: string | null;
    };
    items: {
      id: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      product: {
        id: string;
        productName: string;
        image: string;
      } | null;
      variant: {
        id: string;
        variantName: string;
        price: number;
        sku: string;
        stockQuantity: number;
        stockStatus: string;
        imageUrl: string | null;
        productId: string;
        attributes: any[];
        createdAt: string;
        updatedAt: string;
      } | null;
      store: {
        id: string;
        storeName: string;
        storeDescription: string;
        storeAddress: string;
        phoneNumber: string;
        email: string;
        preparationTime: number;
        deliveryFee: number | null;
        storeLogo: string;
        status: string;
        userId: string;
        metadata: any;
        createdAt: string;
        updatedAt: string;
        approvedAt: string;
        approvedBy: string;
        rejectionReason: string | null;
        categoryId: string;
        latitude: number;
        longitude: number;
        dailyOrderLimit: number;
      };
    }[];
    vendorSummary: { itemCount: 2; totalQuantity: 2; subtotal: 9000 };
  };
}

export interface VendorOrderActionServiceResponse {
  status: string;
  statusCode: number;
  error: string | null;

  message: string;
  data: any;
}
