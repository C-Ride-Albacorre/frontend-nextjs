'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/buttons/button';
import StoreImageUpload from './image-upload';
import {
  OperatingHours,
  StoreDetails,
  StoreInformation,
  StoreFormValues,
} from './section';
import { createStoreAction, updateStoreAction } from '../action';
import { StoreFormState, StoreData } from '../types';
import { CheckCircle, Pencil, Lock, ChevronLeft, Store } from 'lucide-react';
import { toast } from 'sonner';
import Card from '@/components/layout/card';
import Modal from '@/components/layout/modal';

const emptyValues: StoreFormValues = {
  storeName: '',
  storeCategory: '',
  storeAddress: '',
  phoneNumber: '',
  email: '',
  storeDescription: '',
  minimumOrder: '',
  preparationTime: '',
  operatingHours: {},
};

interface StoreFormProps {
  initialData?: StoreData | null;
}

export default function StoreForm({ initialData }: StoreFormProps) {
  const isEditMode = Boolean(initialData?.id);
  const [isEditing, setIsEditing] = useState(!isEditMode);

  // Convert initial data to form values
  const getInitialValues = (): StoreFormValues => {
    if (!initialData) return emptyValues;

    // Convert operating hours array to form format
    const operatingHours: Record<string, { open: string; close: string }> = {};
    initialData.operatingHours?.forEach((hour) => {
      const dayKey = hour.dayOfWeek.toLowerCase();
      operatingHours[dayKey] = {
        open: hour.openingTime || '',
        close: hour.closingTime || '',
      };
    });

    return {
      storeName: initialData.storeName || '',
      storeCategory: initialData.storeCategory || '',
      storeAddress: initialData.storeAddress || '',
      phoneNumber: initialData.phoneNumber || '',
      email: initialData.email || '',
      storeDescription: initialData.storeDescription || '',
      minimumOrder: initialData.minimumOrder?.toString() || '',
      preparationTime: initialData.preparationTime?.toString() || '',
      operatingHours,
    };
  };

  const [values, setValues] = useState<StoreFormValues>(getInitialValues);

  const actionFn = isEditMode ? updateStoreAction : createStoreAction;

  const [state, action, pending] = useActionState(
    actionFn,
    undefined as StoreFormState,
  );

  const isError = state?.status === 'error';
  const errors = isError ? state.errors : undefined;
  const [imageResetKey, setImageResetKey] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdStoreId, setCreatedStoreId] = useState<string | null>(null);

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }
    if (state?.status === 'success') {
      if (isEditMode) {
        toast.success(state.message ?? 'Store updated successfully!');
        setIsEditing(false);
      } else {
        // Show success modal for new store creation
        setCreatedStoreId(state.storeId ?? null);
        setShowSuccessModal(true);
        setValues(emptyValues);
        setImageResetKey((k) => k + 1);
      }
    }
  }, [state, isEditMode]);

  const handleChange = (field: keyof StoreFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const [lastChangedDay, setLastChangedDay] = useState<string | null>(null);

  const handleTimeChange = (
    day: string,
    type: 'open' | 'close',
    value: string,
  ) => {
    setLastChangedDay(day);
    setValues((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [type]: value,
        },
      },
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleApplyToAll = (sourceDay: string) => {
    setValues((prev) => {
      const source = prev.operatingHours[sourceDay];
      if (!source?.open || !source?.close) return prev;

      const DAYS_KEYS = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];

      const updated = { ...prev.operatingHours };
      for (const day of DAYS_KEYS) {
        updated[day] = { open: source.open, close: source.close };
      }
      return { ...prev, operatingHours: updated };
    });
    setLastChangedDay(null);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="white"
        size="xs"
        href="/vendor/store"
        leftIcon={<ChevronLeft size={16} />}
        rounded="full"
      >
        Back
      </Button>

      <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hidden field for store ID when editing */}
        {isEditMode && (
          <input type="hidden" name="storeId" value={initialData?.id} />
        )}

        {/* Read-only banner when in edit mode but not editing */}
        {isEditMode && !isEditing && (
          <Card
            spacing="none"
            className="md:col-span-2 flex flex-col md:flex-row gap-4 md:items-center justify-between bg-primary/10 px-4 md:px-6 py-3"
          >
            <div className="flex items-center gap-2 text-primary mb-0">
              <Lock size={16} />
              <span className="text-xs font-medium">
                Fields are locked. Click Edit to make changes.
              </span>
            </div>
            <Button
              variant="white"
              size="sm"
              type="button"
              onClick={handleEditToggle}
              leftIcon={<Pencil size={14} />}
            >
              Edit Store
            </Button>
          </Card>
        )}

        <StoreInformation
          values={values}
          onChange={handleChange}
          errors={errors}
          disabled={isEditMode && !isEditing}
        />
        <OperatingHours
          values={values}
          onTimeChange={handleTimeChange}
          onApplyToAll={handleApplyToAll}
          lastChangedDay={lastChangedDay}
          errors={errors}
          disabled={isEditMode && !isEditing}
        />
        <div className="md:col-span-2">
          <StoreDetails
            values={values}
            onChange={handleChange}
            errors={errors}
            disabled={isEditMode && !isEditing}
          />
        </div>

        <div className="md:col-span-2">
          <StoreImageUpload
            initialLogo={initialData?.storeLogo}
            disabled={isEditMode && !isEditing}
            resetKey={imageResetKey}
          />
        </div>

        <div className="flex justify-end items-center md:col-span-2">
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={pending || (isEditMode && !isEditing)}
          >
            {pending
              ? 'Saving...'
              : isEditMode
                ? 'Update Store'
                : 'Create Store'}
          </Button>
        </div>
      </form>

      {/* Success Modal — shown after store creation */}
      <Modal
        isModalOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
        <div className="flex flex-col items-center text-center space-y-6 py-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle size={32} className="text-emerald-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              Store Created Successfully!
            </h3>
            <p className="text-sm text-neutral-500">
              Your store has been created and is ready to go. You can now view
              your store or add products.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowSuccessModal(false)}
            >
              Create Another
            </Button>
            <Button
              variant="primary"
              size="md"
              href={
                createdStoreId
                  ? `/vendor/store/${createdStoreId}`
                  : '/vendor/store'
              }
              leftIcon={<Store size={16} />}
            >
              View Store
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
