export interface Store {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  title: string;
  imageSrc: string;
  status: boolean | null;
  category: string;
  count: string;
  // ...other fields
}

export interface NearbyStoresResponse {
  data: Store[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  isActive: boolean;
  _count?: {
    stores: number;
  };
}
