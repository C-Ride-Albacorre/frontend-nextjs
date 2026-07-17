export interface CategoryApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: Array<{
    id: string;
    name: string;
    description: string | null;
    icon: string;
    image: string;
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
    subcategories: Array<any>;
    _count: Record<string, number>;
  }>;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  subcategories?: Subcategory[];
  storeCount?: number;
}
export type CreateCategoryPayload = {
  name: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  icon?: File;
  image?: File;
};

export interface CreateCategoriesApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  data: {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    image: string | null;
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
    subcategories: Array<any>;
  };
}

// ─── Update Category Payload ───────────────────────────────────────────────
export interface UpdateCategoryPayload {
  name?: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
  icon?: File;
  image?: File;
}

// ─── Update Category State ────────────────────────────────────────────────
export type UpdateCategoryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: {
    name?: string[];
    description?: string[];
    displayOrder?: string[];
  };
  data?: {
    name?: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
  };
};

export interface CategoryStatusApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    icon: string;
    image: string;
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
  };
}

// ─── Subcategory ─────────────────────────────────────────────────────────────

export interface Subcategory 
  {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    isActive: boolean;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
    icon: string | null;
    image: string | null;
    category: {
      id: string;
      name: string;
      description: string | null;
      icon: string | null;
      image: string | null;
      isActive: boolean;
      displayOrder: number;
      createdAt: string;
      updatedAt: string;
    };
    _count: { products: number };
  }


export interface SubcategoryApiResponse {
  status: string;
  statusCode: number;
  timestamp: string;
  message: string;
  data: Subcategory[];
}

export interface CreateSubcategoryPayload {
  name: string;
  description?: string;
  categoryId?: string;
  isActive?: boolean;
  displayOrder?: number;
  icon?: File;
  image?: File;
}

export interface UpdateSubcategoryPayload {
  name?: string;
  description?: string;
  categoryId?: string;
  isActive?: boolean;
  displayOrder?: number;
  icon?: File;
  image?: File;
}

export type CreateCategoryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: {
    name?: string[];
    description?: string[];
    displayOrder?: string[];
  };
  data?: {
    name?: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
  };
};

export type CreateSubcategoryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: {
    name?: string[];
    categoryId?: string[];
    description?: string[];
    displayOrder?: string[];
  };
  data?: {
    name?: string;
    categoryId?: string;
    description?: string;
    displayOrder?: number;
    isActive?: boolean;
  };
};
