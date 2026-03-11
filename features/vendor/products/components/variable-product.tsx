'use client';

import { useEffect, useTransition, useState } from 'react';
import { createProductAction, updateProductAction } from '../action';
import { Product, ProductFormState } from '../type';
import { VariableDetailsSchema, VariantsSchema } from '../schema';
import { Button } from '@/components/ui/buttons/button';
import ErrorMessage from '@/components/layout/error-message';
import AddProductStep from './add-product-step';
import VariableDetailsFields from './form/variable-product';
import VariantsForm, { type Variant } from './form/variants';
import AddOnsForm, { type Addon } from './form/add-ons';
import { toast } from 'sonner';

interface SelectOption {
  label: string;
  value: string;
}

export interface VariableProductFormProps {
  storeId: string;
  editProduct?: Product | null;
  isEditing: boolean;
  productName: string;
  setProductName: (v: string) => void;
  productCategory: string;
  setProductCategory: (v: string) => void;
  sku: string;
  setSku: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  basePrice: string;
  setBasePrice: (v: string) => void;
  stockQuantity: string;
  setStockQuantity: (v: string) => void;
  lowStockThreshold: string;
  setLowStockThreshold: (v: string) => void;
  stockStatus: string;
  setStockStatus: (v: string) => void;
  productStatus: string;
  setProductStatus: (v: string) => void;
  image: File | null;
  setImage: (f: File | null) => void;
  existingImageUrl?: string;
  CATEGORIES: SelectOption[];
  STOCK_STATUSES: SelectOption[];
  PRODUCT_STATUSES: SelectOption[];
  handleClose: () => void;
  onSuccess: () => void;
}

export default function VariableProductForm({
  storeId,
  editProduct,
  isEditing,
  productName,
  setProductName,
  productCategory,
  setProductCategory,
  sku,
  setSku,
  description,
  setDescription,
  basePrice,
  setBasePrice,
  stockQuantity,
  setStockQuantity,
  lowStockThreshold,
  setLowStockThreshold,
  stockStatus,
  setStockStatus,
  productStatus,
  setProductStatus,
  image,
  setImage,
  existingImageUrl,
  CATEGORIES,
  STOCK_STATUSES,
  PRODUCT_STATUSES,
  handleClose,
  onSuccess,
}: VariableProductFormProps) {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [stepErrors, setStepErrors] = useState<Record<string, string[]>>({});
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<ProductFormState>(
    undefined as ProductFormState,
  );

  const isLastStep = activeStep === 2;

  function validateStep(step: number) {
    setStepErrors({});

    if (step === 0) {
      const result = VariableDetailsSchema.safeParse({
        productName,
        productCategory,
        sku,
        description,
        basePrice,
        stockQuantity,
        lowStockThreshold,
        stockStatus,
        productStatus,
        productType: 'VARIABLE',
      });

      if (!result.success) {
        const errs: Record<string, string[]> = {};
        result.error.issues.forEach((issue) => {
          const key = issue.path[0] as string;
          if (!errs[key]) errs[key] = [];
          errs[key].push(issue.message);
        });
        setStepErrors(errs);
        return false;
      }
    }

    return true;
  }

  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append('productName', productName);
    fd.append('productCategory', productCategory);
    fd.append('sku', sku);
    fd.append('description', description);
    fd.append('productType', 'VARIABLE');
    fd.append('basePrice', basePrice);
    fd.append('stockQuantity', stockQuantity);
    fd.append('lowStockThreshold', lowStockThreshold);
    fd.append('stockStatus', stockStatus);
    fd.append('productStatus', productStatus);

    if (image) {
      fd.append('images', image);
    }

    /**
     * VARIANTS (OPTIONAL)
     */

    variants.forEach((variant, index) => {
      fd.append(`variants[${index}][variantName]`, variant.variantName);
      fd.append(`variants[${index}][price]`, String(variant.price));
      fd.append(`variants[${index}][sku]`, variant.sku);
      fd.append(
        `variants[${index}][stockQuantity]`,
        String(variant.stockQuantity),
      );
      fd.append(`variants[${index}][stockStatus]`, variant.stockStatus);

      if (variant.attributes) {
        Object.entries(variant.attributes).forEach(([key, value]) => {
          fd.append(`variants[${index}][attributes][${key}]`, value);
        });
      }
    });

    /**
     * ADDONS (OPTIONAL)
     */

    addons.forEach((addon, index) => {
      fd.append(`addons[${index}][addonName]`, addon.addonName);
      fd.append(`addons[${index}][price]`, String(addon.price));

      if (addon.description) {
        fd.append(`addons[${index}][description]`, addon.description);
      }

      if (addon.maxQuantity !== undefined) {
        fd.append(`addons[${index}][maxQuantity]`, String(addon.maxQuantity));
      }

      if (addon.category) {
        fd.append(`addons[${index}][category]`, addon.category);
      }
    });

    startTransition(async () => {
      const result =
        isEditing && editProduct
          ? await updateProductAction(storeId, editProduct.id, state, fd)
          : await createProductAction(storeId, state, fd);

      setState(result);
    });
  };

  useEffect(() => {
    if (!state) return;

    if (state.status === 'success') {
      toast.success(state.message || 'Product created successfully');
      onSuccess();
    }

    if (state.status === 'error') {
      toast.error(state.message || 'Something went wrong');
    }
  }, [state]);

  const serverErrors = state?.status === 'error' ? (state.errors ?? {}) : {};
  const errorMessage =
    state?.status === 'error' ? (state.message ?? null) : null;

  const activeErrors =
    activeStep === 0 ? { ...serverErrors, ...stepErrors } : stepErrors;

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <AddProductStep currentStep={activeStep} />

      {activeStep === 0 && (
        <VariableDetailsFields
          productName={productName}
          setProductName={setProductName}
          productCategory={productCategory}
          setProductCategory={setProductCategory}
          sku={sku}
          setSku={setSku}
          description={description}
          setDescription={setDescription}
          basePrice={basePrice}
          setBasePrice={setBasePrice}
          stockQuantity={stockQuantity}
          setStockQuantity={setStockQuantity}
          lowStockThreshold={lowStockThreshold}
          setLowStockThreshold={setLowStockThreshold}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
          productStatus={productStatus}
          setProductStatus={setProductStatus}
          image={image}
          setImage={setImage}
          existingImageUrl={existingImageUrl}
          CATEGORIES={CATEGORIES}
          STOCK_STATUSES={STOCK_STATUSES}
          PRODUCT_STATUSES={PRODUCT_STATUSES}
          isEditing={isEditing}
          errors={activeErrors}
        />
      )}

      {activeStep === 1 && (
        <VariantsForm variants={variants} setVariants={setVariants} />
      )}

      {activeStep === 2 && <AddOnsForm addons={addons} setAddons={setAddons} />}

      <div className="flex justify-between pt-6">
        {activeStep === 0 ? (
          <Button variant="outline" type="button" onClick={handleClose}>
            Cancel
          </Button>
        ) : (
          <Button
            variant="outline"
            type="button"
            onClick={() => setActiveStep((p) => p - 1)}
          >
            Back
          </Button>
        )}

        {isLastStep ? (
          <Button type="button" disabled={isPending} onClick={handleSubmit}>
            {isPending ? 'Creating...' : 'Add Product'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              if (validateStep(activeStep)) {
                setActiveStep((p) => p + 1);
              }
            }}
          >
            Next
          </Button>
        )}
      </div>
    </form>
  );
}
