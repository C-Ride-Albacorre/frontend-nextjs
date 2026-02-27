export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface OperatingHour {
  dayOfWeek: DayOfWeek;
  isOpen: boolean;
  openingTime: string | null;
  closingTime: string | null;
}

export interface CreateStoreData {
  storeName: string;
  storeCategory: string;
  storeDescription?: string;
  storeAddress: string;
  phoneNumber: string;
  email: string;
  minimumOrder?: number;
  deliveryFee?: number;
  preparationTime?: number;
  operatingHours: OperatingHour[];
  logo?: File;
}

export interface StoreResponse {
  id: string;
  storeName: string;
  storeCategory: string;
  storeDescription?: string;
  storeAddress: string;
  phoneNumber: string;
  email: string;
  minimumOrder?: number;
  deliveryFee?: number;
  preparationTime?: number;
  operatingHours: OperatingHour[];
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type StoreFormState =
  | undefined
  | { status: 'error'; errors?: Record<string, string[]>; message?: string }
  | { status: 'success'; message: string };

