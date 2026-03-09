'use client';

import { useActionState, useEffect, useState } from 'react';
import { createProductAction, updateProductAction } from '../action';
import { Product, ProductFormState } from '../type';
import { VariableDetailsSchema, VariantsSchema } from '../schema';
import { Button } from '@/components/ui/buttons/button';
import ErrorMessage from '@/components/layout/error-message';
import AddProductStep from './add-product-step';
import VariableDetailsFields from './form/variable-product';
import VariantsForm, { type Variant } from './form/variants';
import AddOnsForm, { type Addon } from './form/add-ons';

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
  // ✅ variable-only state stays here — NOT in the shell
  const [variants, setVariants] = useState<Variant[]>(
    editProduct?.variants?.map((v) => ({
      name: v.name,
      options: v.options,
      priceModifier: v.priceModifier ?? 0,
    })) ?? [],
  );
  const [addons, setAddons] = useState<Addon[]>(
    editProduct?.addons?.map((a) => ({
      name: a.name,
      price: a.price,
      available: a.available,
    })) ?? [],
  );

  const [activeStep, setActiveStep] = useState(0);
  const [stepErrors, setStepErrors] = useState<Record<string, string[]>>({});
  const isLastStep = activeStep === 2;

  function validateStep(step: number): boolean {
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
        for (const issue of result.error.issues) {
          const key = issue.path[0] as string;
          if (!errs[key]) errs[key] = [];
          errs[key].push(issue.message);
        }
        setStepErrors(errs);
        return false;
      }
    }

    if (step === 1) {
      const result = VariantsSchema.safeParse({ variants });
      if (!result.success) {
        setStepErrors({
          variants: ['Add at least one variant before continuing.'],
        });
        return false;
      }
    }

    return true; // step 2 addons always valid
  }

  const variableProductAction = async (
    prevState: ProductFormState,
    formData: FormData,
  ): Promise<ProductFormState> => {
    formData.append('productCategory', productCategory);
    formData.append('productType', 'VARIABLE');
    formData.append('stockStatus', stockStatus);
    formData.append('productStatus', productStatus);
    if (image) formData.append('images', image);
    if (variants.length > 0)
      formData.append('variants', JSON.stringify(variants));
    if (addons.length > 0) formData.append('addons', JSON.stringify(addons));

    if (isEditing && editProduct) {
      return updateProductAction(storeId, editProduct.id, prevState, formData);
    }
    return createProductAction(storeId, prevState, formData);
  };

  const [state, formAction, isPending] = useActionState(
    variableProductAction,
    undefined as ProductFormState,
  );

  useEffect(() => {
    if (state?.status === 'success') onSuccess();
  }, [state]);

  const serverErrors = state?.status === 'error' ? (state.errors ?? {}) : {};
  const errorMessage =
    state?.status === 'error' ? (state.message ?? null) : null;

  // step 0 merges server errors + local step errors; later steps show only step errors
  const activeErrors =
    activeStep === 0 ? { ...serverErrors, ...stepErrors } : stepErrors;

  return (
    <form action={formAction} className="space-y-6">
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <AddProductStep currentStep={activeStep} />

      <div className="mt-2">
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
          <>
            {stepErrors.variants && (
              <p className="mb-4 text-sm text-red-500">
                {stepErrors.variants[0]}
              </p>
            )}
            <VariantsForm variants={variants} setVariants={setVariants} />
          </>
        )}

        {activeStep === 2 && (
          <AddOnsForm addons={addons} setAddons={setAddons} />
        )}
      </div>

      <div className="flex items-center justify-between md:justify-around gap-8 pt-4">
        {activeStep === 0 ? (
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </Button>
        ) : (
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={() => {
              setStepErrors({});
              setActiveStep((p) => p - 1);
            }}
          >
            Back
          </Button>
        )}

        {isLastStep ? (
          <Button
            size="lg"
            variant="primary"
            type="submit"
            disabled={isPending}
          >
            {isPending
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
                ? 'Update Product'
                : 'Add Product'}
          </Button>
        ) : (
          <Button
            size="lg"
            variant="primary"
            type="button"
            onClick={() => {
              if (validateStep(activeStep)) setActiveStep((p) => p + 1);
            }}
          >
            Next
          </Button>
        )}
      </div>
    </form>
  );
}
