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

// ─── Subcategory ─────────────────────────────────────────────────────────────

export interface Subcategory {
  id: string;
  name: string;
  description: string | null;
  categoryId: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  storeCount?: number;
}

export interface CreateSubcategoryPayload {
  name: string;
  description?: string;
  categoryId: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateSubcategoryPayload {
  name?: string;
  description?: string;
  categoryId?: string;
  isActive?: boolean;
  displayOrder?: number;
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
