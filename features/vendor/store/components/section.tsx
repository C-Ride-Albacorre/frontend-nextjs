import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Textarea from '@/components/ui/inputs/textarea';
import TimePicker from '@/components/ui/inputs/time-picker';
import { Button } from '@/components/ui/buttons/button';
import { Copy } from 'lucide-react';
import { useBusinessTypes } from '../../onboarding/fetch';

export interface StoreFormValues {
  storeName: string;
  storeCategory: string;
  storeAddress: string;
  phoneNumber: string;
  email: string;
  storeDescription: string;
  minimumOrder: string;
  preparationTime: string;
  operatingHours: Record<string, { open: string; close: string }>;
}

interface StoreInformationProps {
  values: StoreFormValues;
  onChange: (field: keyof StoreFormValues, value: string) => void;
  errors?: Record<string, string[]>;
  disabled?: boolean;
}

export function StoreInformation({
  values,
  onChange,
  errors,
  disabled,
}: StoreInformationProps) {
  const { data: StoreCategory, isPending, error } = useBusinessTypes();

  console.log('Store Category :', StoreCategory);

  const options =
    StoreCategory?.map((type: any) => ({
      value: type.id,
      label: type.name,
    })) ?? [];

  return (
    <Card
      spacing="md"
      className={`bg-white ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className=" space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Store Information</p>
        <div className="space-y-6">
          <Input
            name="storeName"
            label="Store Name"
            placeholder="Enter your business name"
            spacing="sm"
            value={values.storeName}
            onChange={(e) => onChange('storeName', e.target.value)}
            errorMessage={errors?.storeName?.[0]}
            disabled={disabled}
          />

          <Select
            id="storeCategory"
            name="storeCategory"
            label="Store Category"
            placeholder="Select category"
            spacing="sm"
            options={
              isPending
                ? [{ value: '', label: 'Loading Business Types...' }]
                : options
            }
            value={values.storeCategory}
            onChange={(value) => onChange('storeCategory', value)}
            errorMessage={errors?.storeCategory?.[0]}
            disabled={disabled}
          />

          <Input
            name="storeAddress"
            label="Store Address"
            placeholder="12B Adeola Odaku street, Victoria Island Lag.."
            spacing="sm"
            value={values.storeAddress}
            onChange={(e) => onChange('storeAddress', e.target.value)}
            errorMessage={errors?.storeAddress?.[0]}
            disabled={disabled}
          />

          <Input
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="+234 812 345 6789"
            spacing="sm"
            value={values.phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            errorMessage={errors?.phoneNumber?.[0]}
            disabled={disabled}
          />

          <Input
            name="email"
            label="Email Address"
            type="email"
            placeholder="Contact@theplace.com.ng"
            spacing="sm"
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
            errorMessage={errors?.email?.[0]}
            disabled={disabled}
          />
        </div>
      </div>
    </Card>
  );
}

interface OperatingHoursProps {
  values: StoreFormValues;
  onTimeChange: (day: string, type: 'open' | 'close', value: string) => void;
  onApplyToAll: (day: string) => void;
  lastChangedDay?: string | null;
  errors?: Record<string, string[]>;
  disabled?: boolean;
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function OperatingHours({
  values,
  onTimeChange,
  onApplyToAll,
  lastChangedDay,
  errors,
  disabled,
}: OperatingHoursProps) {
  return (
    <Card
      className={`bg-white ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Operating Hours</p>
        {errors?.operatingHours && (
          <p className="text-xs text-red-600">{errors.operatingHours[0]}</p>
        )}
        <div className="space-y-6">
          {(() => {
            // The day to show the button on is the last changed day (if it has both times)
            const targetDay = lastChangedDay ?? undefined;
            const hasTarget =
              targetDay != null &&
              Boolean(values.operatingHours[targetDay]?.open) &&
              Boolean(values.operatingHours[targetDay]?.close);

            // Check if all days already share the same times
            const allSame =
              hasTarget &&
              DAYS.every((d) => {
                const dk = d.toLowerCase();
                return (
                  values.operatingHours[dk]?.open ===
                    values.operatingHours[targetDay!]?.open &&
                  values.operatingHours[dk]?.close ===
                    values.operatingHours[targetDay!]?.close
                );
              });

            return DAYS.map((day) => {
              const dayKey = day.toLowerCase();

              return (
                <div key={day} className="space-y-2">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <span className="text-sm col-span-3">{day}</span>
                    <div className="col-span-4">
                      <TimePicker
                        name={`${dayKey}Open`}
                        value={values.operatingHours[dayKey]?.open || ''}
                        onChange={(val) => onTimeChange(dayKey, 'open', val)}
                        placeholder="Open"
                        disabled={disabled}
                      />
                    </div>

                    <span className="text-sm flex justify-center items-center">
                      to
                    </span>
                    <div className="col-span-4">
                      <TimePicker
                        name={`${dayKey}Close`}
                        value={values.operatingHours[dayKey]?.close || ''}
                        onChange={(val) => onTimeChange(dayKey, 'close', val)}
                        placeholder="Close"
                        disabled={disabled}
                      />
                    </div>
                  </div>

                  {dayKey === targetDay &&
                    hasTarget &&
                    !allSame &&
                    !disabled && (
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          rounded="md"
                          leftIcon={<Copy size={12} />}
                          onClick={() => onApplyToAll(dayKey)}
                        >
                          Apply to all
                        </Button>
                      </div>
                    )}
                </div>
              );
            });
          })()}
        </div>
      </div>
    </Card>
  );
}

interface StoreDetailsProps {
  values: StoreFormValues;
  onChange: (field: keyof StoreFormValues, value: string) => void;
  errors?: Record<string, string[]>;
  disabled?: boolean;
}

export function StoreDetails({
  values,
  onChange,
  errors,
  disabled,
}: StoreDetailsProps) {
  return (
    <Card
      className={`bg-white ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">
          Store Description & Details
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Textarea
            id="storeDescription"
            name="storeDescription"
            label="Store Description"
            placeholder="Tell customers about your store, specialities, and what makes you unique."
            wrapperClassName="md:col-span-3"
            value={values.storeDescription}
            onChange={(e) => onChange('storeDescription', e.target.value)}
            disabled={disabled}
          />

          <Input
            name="minimumOrder"
            label="Minimum Order/per day"
            type="number"
            placeholder="5000"
            value={values.minimumOrder}
            onChange={(e) => onChange('minimumOrder', e.target.value)}
            errorMessage={errors?.minimumOrder?.[0]}
            disabled={disabled}
          />

          <Input
            name="preparationTime"
            label="Preparation Time (mins)"
            type="number"
            placeholder="30"
            value={values.preparationTime}
            onChange={(e) => onChange('preparationTime', e.target.value)}
            errorMessage={errors?.preparationTime?.[0]}
            disabled={disabled}
          />
        </div>
      </div>
    </Card>
  );
}
