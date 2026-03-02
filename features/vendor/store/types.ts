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

export interface StoreData {
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
  storeLogo?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
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
  storeLogo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: StoreData[];
}

export type StoreFormState =
  | undefined
  | { status: 'error'; errors?: Record<string, string[]>; message?: string }
  | { status: 'success'; message: string };

// Props for StoreCatalogue row component
export interface StoreCatalogueProps {
  storeData: StoreData;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

// Props for ViewStoreModal
export interface ViewStoreModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  store: StoreData | null;
  onEdit?: () => void;
}

// Props for DeleteStoreModal
export interface DeleteStoreModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  store: StoreData | null;
  onSuccess?: () => void;
}