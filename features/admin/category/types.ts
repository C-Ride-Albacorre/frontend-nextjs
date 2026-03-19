// features/admin/category/types.ts

// ─── Category ────────────────────────────────────────────────────────────────

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

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateCategoryPayload {
  name?: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive?: boolean;
  displayOrder?: number;
}

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
