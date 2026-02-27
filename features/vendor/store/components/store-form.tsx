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
import { createStoreAction } from '../action';
import { StoreFormState } from '../types';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const initialValues: StoreFormValues = {
  storeName: '',
  storeCategory: '',
  storeAddress: '',
  phoneNumber: '',
  email: '',
  storeDescription: '',
  minimumOrder: '',
  deliveryFee: '',
  preparationTime: '',
  operatingHours: {},
};

export default function StoreForm() {
  const [values, setValues] = useState<StoreFormValues>(initialValues);

  const [state, action, pending] = useActionState(
    createStoreAction,
    undefined as StoreFormState,
  );

  const isError = state?.status === 'error';
  const errors = isError ? state.errors : undefined;

  useEffect(() => {
    if (state?.status === 'error' && state.message) {
      toast.error(state.message);
    }
    if (state?.status === 'success') {
      toast.success(state.message ?? 'Store saved successfully!');
      // Reset form on success
      setValues(initialValues);
    }
  }, [state]);

  const handleChange = (field: keyof StoreFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleTimeChange = (
    day: string,
    type: 'open' | 'close',
    value: string,
  ) => {
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

  return (
    <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <StoreInformation
        values={values}
        onChange={handleChange}
        errors={errors}
      />
      <OperatingHours
        values={values}
        onTimeChange={handleTimeChange}
        errors={errors}
      />
      <div className="md:col-span-2">
        <StoreDetails values={values} onChange={handleChange} errors={errors} />
      </div>

      <div className="md:col-span-2">
        <StoreImageUpload />
      </div>

      <div className="flex justify-end items-center md:col-span-2">
        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={pending}
          leftIcon={<CheckCircle size={18} />}
        >
          {pending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
