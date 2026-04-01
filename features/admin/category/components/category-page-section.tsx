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
  EditIcon,
  Edit2Icon,
  LayersPlus,
} from 'lucide-react';
import CreateCategoryModal from './create-category-modal';
import EditCategoryModal from './edit-category-modal';
import CreateSubcategoryModal from './create-subcategory-modal';
import EditSubcategoryModal from './edit-subcategory-modal';
import { IconButton } from '@/components/ui/buttons/icon-button';
import ToggleSwitch from '@/components/ui/buttons/toggle-switch';

export default function CategoryPageSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPending, startTransition] = useTransition();
  const [hasFetched, setHasFetched] = useState(false);
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

  const fetchCategories = async () => {
    console.log('[CategoryPage] Fetching categories...');
    const data = await getCategoriesAction();

    startTransition(() => {
      console.log('[CategoryPage] Categories received:', data);

      setCategories(data);
      setHasFetched(true);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (
    categoryId: string,
    categoryName: string,
  ) => {
    console.log('[CategoryPage] Deleting category:', categoryId);

    const prev = categories;

    // remove instantly
    setCategories((prevState) => prevState.filter((c) => c.id !== categoryId));

    const result = await deleteCategoryAction(categoryId);
    console.log('[CategoryPage] Delete result:', result);

    if (result.success) {
      toast.success(`"${categoryName}" deactivated successfully`);
    } else {
      setCategories(prev);
      toast.error(result.message);
    }
  };

  const handleToggleCategoryStatus = async (
    categoryId: string,
    categoryName: string,
  ) => {
    const prev = categories;

    setCategories((prevState) =>
      prevState.map((c) =>
        c.id === categoryId ? { ...c, isActive: !c.isActive } : c,
      ),
    );

    const result = await toggleCategoryStatusAction(categoryId);

    if (result.success) {
      toast.success(`"${categoryName}" updated`);
    } else {
      setCategories(prev); // rollback
      toast.error(result.message);
    }
  };
  const handleDeleteSubcategory = async (
    subcategoryId: string,
    subcategoryName: string,
  ) => {
    const prev = categories;

    setCategories((prevState) =>
      prevState.map((cat) => ({
        ...cat,
        subcategories: cat.subcategories?.filter(
          (sub) => sub.id !== subcategoryId,
        ),
      })),
    );

    const result = await deleteSubcategoryAction(subcategoryId);

    if (result.success) {
      toast.success(`"${subcategoryName}" deleted`);
    } else {
      setCategories(prev); 
      toast.error(result.message);
    }
  };
 const handleToggleSubcategoryStatus = async (
    subcategoryId: string,
    subcategoryName: string,
  ) => {
    const prev = categories;

    setCategories((prevState) =>
      prevState.map((cat) => ({
        ...cat,
        subcategories: cat.subcategories?.map((sub) =>
          sub.id === subcategoryId ? { ...sub, isActive: !sub.isActive } : sub,
        ),
      })),
    );

    const result = await toggleSubcategoryStatusAction(subcategoryId);

    if (result.success) {
      toast.success(`"${subcategoryName}" updated`);
    } else {
      setCategories(prev); // rollback
      toast.error(result.message);
    }
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
      <Card className="bg-white">
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
        {!hasFetched ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-neutral-500">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <LayersPlus size={48} className="text-neutral-300" />
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0  p-4 bg-white">
                  <div className="flex flex-col md:flex-row md:items-start md:col-span-2  gap-4">
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

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-4">
                        <p className="font-medium text-neutral-900 truncate text-sm">
                          {category.name}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            category.isActive
                              ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                              : 'bg-neutral-100 border border-border text-neutral-500'
                          }`}
                        >
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {category.description && (
                        <p className="text-xs text-neutral-500 truncate">
                          {category.description}
                        </p>
                      )}
                      <p className="text-xs text-neutral-400">
                        Order: {category.displayOrder}
                        {category.subcategories &&
                          ` · ${category.subcategories.length} subcategories`}
                        {category.storeCount !== undefined &&
                          ` · ${category.storeCount} stores`}
                      </p>
                    </div>
                  </div>

                  {/* Category actions */}
                  <div className="flex items-center justify-between md:justify-end    md:col-span-2 gap-4">
                    <div className="flex items-center gap-3 md:gap-6">
                      <IconButton
                        onClick={() => handleAddSubcategory(category.id)}
                        rounded="lg"
                      >
                        <Plus size={14} />
                      </IconButton>
                      <IconButton
                        rounded="lg"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit2Icon size={14} />
                      </IconButton>

                      <IconButton
                        variant="red"
                        rounded="lg"
                        onClick={() =>
                          handleDeleteCategory(category.id, category.name)
                        }
                        disabled={isPending}
                      >
                        <Trash2 size={14} />
                      </IconButton>

                      <ToggleSwitch
                        checked={category.isActive}
                        onChange={() =>
                          handleToggleCategoryStatus(category.id, category.name)
                        }
                        disabled={isPending}
                      />
                    </div>

                    {expandedCategory === category.id ? (
                      <IconButton
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === category.id
                              ? null
                              : category.id,
                          )
                        }
                        className="text-xs flex items-center gap-1"
                      >
                        {' '}
                        Show Less
                        <ChevronUp size={18} className="text-neutral-400" />
                      </IconButton>
                    ) : (
                      <IconButton
                        className="text-xs flex items-center gap-1"
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === category.id
                              ? null
                              : category.id,
                          )
                        }
                      >
                        {' '}
                        Show More
                        <ChevronDown size={18} className="text-neutral-400" />
                      </IconButton>
                    )}
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
                          className="flex flex-col md:flex-row  md:items-center gap-4 md:gap-0 justify-between px-4 py-3 border-b border-border last:border-b-0 hover:bg-neutral-100 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-4">
                              <p className="text-sm font-medium text-neutral-800 truncate ">
                                {sub.name}
                              </p>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                  sub.isActive
                                    ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                                    : 'bg-neutral-100 border border-border text-neutral-500'
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

                          <div className="flex items-center gap-4">
                            <IconButton
                              rounded="lg"
                              variant="white"
                              onClick={() => handleEditSubcategory(sub)}
                            >
                              <Edit size={14} />
                            </IconButton>
                            <IconButton
                              variant="red"
                              rounded="lg"
                              onClick={() =>
                                handleDeleteSubcategory(sub.id, sub.name)
                              }
                              disabled={isPending}
                            >
                              <Trash2 size={14} />
                            </IconButton>

                            <ToggleSwitch
                              checked={sub.isActive}
                              onChange={() =>
                                handleToggleSubcategoryStatus(sub.id, sub.name)
                              }
                              disabled={isPending}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Empty subcategories */}
                {expandedCategory === category.id &&
                  (!category.subcategories ||
                    category.subcategories.length === 0) && (
                    <div className="border-t border-border bg-neutral-50 px-4 py-8 flex flex-col items-center space-y-4">
                      <LayersPlus size={20} className="text-neutral-300" />
                      <div className="space-y-2 text-center">
                        <p className="text-sm text-neutral-500">
                          No subcategories yet
                        </p>
                        <Button
                          size="icon"
                          onClick={() => handleAddSubcategory(category.id)}
                          leftIcon={<Plus size={14} />}
                        >
                          Add a subcategory
                        </Button>
                      </div>
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
        onSuccess={fetchCategories}
        onClose={() => setShowCreateCategory(false)}
      />

      <EditCategoryModal
        isOpen={showEditCategory}
        onSuccess={fetchCategories}
        onClose={() => {
          setShowEditCategory(false);
          setSelectedCategory(null);
        }}
        category={selectedCategory}
      />

      <CreateSubcategoryModal
        isOpen={showCreateSubcategory}
        onSuccess={fetchCategories}
        onClose={() => {
          setShowCreateSubcategory(false);
          setPreselectedCategoryId(undefined);
        }}
        categories={categories}
        preselectedCategoryId={preselectedCategoryId}
      />

      <EditSubcategoryModal
        isOpen={showEditSubcategory}
        onSuccess={fetchCategories}
        onClose={() => {
          setShowEditSubcategory(false);
          setSelectedSubcategory(null);
        }}
        subcategory={selectedSubcategory}
        categories={categories}
      />
    </>
  );
}
