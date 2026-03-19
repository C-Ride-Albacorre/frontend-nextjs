'use client';

import { useState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';
import {
  getCategoriesAction,
  deleteCategoryAction,
  toggleCategoryStatusAction,
  deleteSubcategoryAction,
  toggleSubcategoryStatusAction,
} from '@/features/admin/category/action';
import { Category, Subcategory } from '@/features/admin/category/types';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import {
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';
import CreateCategoryModal from './create-category-modal';
import EditCategoryModal from './edit-category-modal';
import CreateSubcategoryModal from './create-subcategory-modal';
import EditSubcategoryModal from './edit-subcategory-modal';

export default function CategoryPageSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPending, startTransition] = useTransition();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Modal states
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showCreateSubcategory, setShowCreateSubcategory] = useState(false);
  const [showEditSubcategory, setShowEditSubcategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<Subcategory | null>(null);
  const [preselectedCategoryId, setPreselectedCategoryId] = useState<
    string | undefined
  >();

  const fetchCategories = () => {
    startTransition(async () => {
      console.log('[CategoryPage] Fetching categories...');
      const data = await getCategoriesAction();
      console.log('[CategoryPage] Categories received:', data);
      setCategories(data);
    });
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    startTransition(async () => {
      console.log('[CategoryPage] Deleting category:', categoryId);
      const result = await deleteCategoryAction(categoryId);
      console.log('[CategoryPage] Delete result:', result);

      if (result.success) {
        toast.success(`"${categoryName}" deactivated successfully`);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleToggleCategoryStatus = (
    categoryId: string,
    categoryName: string,
  ) => {
    startTransition(async () => {
      console.log('[CategoryPage] Toggling category status:', categoryId);
      const result = await toggleCategoryStatusAction(categoryId);
      console.log('[CategoryPage] Toggle result:', result);

      if (result.success) {
        toast.success(`"${categoryName}" status toggled`);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDeleteSubcategory = (
    subcategoryId: string,
    subcategoryName: string,
  ) => {
    startTransition(async () => {
      console.log('[CategoryPage] Deleting subcategory:', subcategoryId);
      const result = await deleteSubcategoryAction(subcategoryId);
      console.log('[CategoryPage] Delete subcategory result:', result);

      if (result.success) {
        toast.success(`"${subcategoryName}" deactivated successfully`);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleToggleSubcategoryStatus = (
    subcategoryId: string,
    subcategoryName: string,
  ) => {
    startTransition(async () => {
      console.log('[CategoryPage] Toggling subcategory status:', subcategoryId);
      const result = await toggleSubcategoryStatusAction(subcategoryId);
      console.log('[CategoryPage] Toggle subcategory result:', result);

      if (result.success) {
        toast.success(`"${subcategoryName}" status toggled`);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setShowEditCategory(true);
  };

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowEditSubcategory(true);
  };

  const handleAddSubcategory = (categoryId: string) => {
    setPreselectedCategoryId(categoryId);
    setShowCreateSubcategory(true);
  };

  return (
    <>
      <Card>
        {/* Header actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Categories
            </h2>
            <p className="text-sm text-neutral-500">
              {categories.length} total categories
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              leftIcon={<Plus size={18} />}
              variant="outline"
              size="icon"
              spacing="sm"
              className="text-xs"
              onClick={() => {
                setPreselectedCategoryId(undefined);
                setShowCreateSubcategory(true);
              }}
            >
              Add Subcategory
            </Button>
            <Button
              leftIcon={<Plus size={18} />}
              variant="primary"
              size="icon"
              spacing="sm"
              className="text-xs"
              onClick={() => setShowCreateCategory(true)}
            >
              Add Category
            </Button>
          </div>
        </div>

        {/* Categories list */}
        {isPending && categories.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-neutral-500">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Layers size={48} className="text-neutral-300" />
            <p className="text-sm text-neutral-500">No categories found</p>
            <Button
              variant="primary"
              size="icon"
              onClick={() => setShowCreateCategory(true)}
            >
              Create your category
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border border-border rounded-xl overflow-hidden"
              >
                {/* Category row */}
                <div className="flex items-center justify-between p-4 bg-white hover:bg-neutral-50 transition-colors">
                  <div
                    className="flex items-center gap-4 flex-1 cursor-pointer"
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.id ? null : category.id,
                      )
                    }
                  >
                    {/* Category icon/image */}
                    {category.icon || category.image ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center shrink-0">
                        <img
                          src={category.icon || category.image || ''}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Layers size={20} className="text-primary" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-neutral-900 truncate">
                          {category.name}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            category.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {category.description && (
                        <p className="text-xs text-neutral-500 truncate mt-0.5">
                          {category.description}
                        </p>
                      )}
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Order: {category.displayOrder}
                        {category.subcategories &&
                          ` · ${category.subcategories.length} subcategories`}
                        {category.storeCount !== undefined &&
                          ` · ${category.storeCount} stores`}
                      </p>
                    </div>

                    {expandedCategory === category.id ? (
                      <ChevronUp size={18} className="text-neutral-400" />
                    ) : (
                      <ChevronDown size={18} className="text-neutral-400" />
                    )}
                  </div>

                  {/* Category actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleAddSubcategory(category.id)}
                      className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors"
                      title="Add subcategory"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors"
                      title="Edit category"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() =>
                        handleToggleCategoryStatus(category.id, category.name)
                      }
                      className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors"
                      title="Toggle status"
                      disabled={isPending}
                    >
                      {category.isActive ? (
                        <ToggleRight size={16} className="text-green-600" />
                      ) : (
                        <ToggleLeft size={16} />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteCategory(category.id, category.name)
                      }
                      className="p-2 rounded-lg hover:bg-red-50 text-neutral-500 hover:text-red-500 transition-colors"
                      title="Delete category"
                      disabled={isPending}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Expanded subcategories */}
                {expandedCategory === category.id &&
                  category.subcategories &&
                  category.subcategories.length > 0 && (
                    <div className="border-t border-border bg-neutral-50">
                      {category.subcategories.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between px-4 py-3 pl-14 border-b border-border last:border-b-0 hover:bg-neutral-100 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-neutral-800 truncate">
                                {sub.name}
                              </p>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                  sub.isActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-neutral-100 text-neutral-500'
                                }`}
                              >
                                {sub.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            {sub.description && (
                              <p className="text-xs text-neutral-500 truncate mt-0.5">
                                {sub.description}
                              </p>
                            )}
                            <p className="text-xs text-neutral-400 mt-0.5">
                              Order: {sub.displayOrder}
                              {sub.storeCount !== undefined &&
                                ` · ${sub.storeCount} stores`}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleEditSubcategory(sub)}
                              className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-500 hover:text-primary transition-colors"
                              title="Edit subcategory"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() =>
                                handleToggleSubcategoryStatus(sub.id, sub.name)
                              }
                              className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-500 hover:text-primary transition-colors"
                              title="Toggle status"
                              disabled={isPending}
                            >
                              {sub.isActive ? (
                                <ToggleRight
                                  size={14}
                                  className="text-green-600"
                                />
                              ) : (
                                <ToggleLeft size={14} />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteSubcategory(sub.id, sub.name)
                              }
                              className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-500 hover:text-red-500 transition-colors"
                              title="Delete subcategory"
                              disabled={isPending}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Empty subcategories */}
                {expandedCategory === category.id &&
                  (!category.subcategories ||
                    category.subcategories.length === 0) && (
                    <div className="border-t border-border bg-neutral-50 px-4 py-6 text-center">
                      <p className="text-sm text-neutral-500">
                        No subcategories yet
                      </p>
                      <button
                        onClick={() => handleAddSubcategory(category.id)}
                        className="text-sm text-primary hover:underline mt-1"
                      >
                        Add a subcategory
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Modals */}
      <CreateCategoryModal
        isOpen={showCreateCategory}
        onClose={() => setShowCreateCategory(false)}
        onSuccess={fetchCategories}
      />

      <EditCategoryModal
        isOpen={showEditCategory}
        onClose={() => {
          setShowEditCategory(false);
          setSelectedCategory(null);
        }}
        onSuccess={fetchCategories}
        category={selectedCategory}
      />

      <CreateSubcategoryModal
        isOpen={showCreateSubcategory}
        onClose={() => {
          setShowCreateSubcategory(false);
          setPreselectedCategoryId(undefined);
        }}
        onSuccess={fetchCategories}
        categories={categories}
        preselectedCategoryId={preselectedCategoryId}
      />

      <EditSubcategoryModal
        isOpen={showEditSubcategory}
        onClose={() => {
          setShowEditSubcategory(false);
          setSelectedSubcategory(null);
        }}
        onSuccess={fetchCategories}
        subcategory={selectedSubcategory}
        categories={categories}
      />
    </>
  );
}
