import Card from '@/components/layout/card';
import { useEffect } from 'react';
import { searchAddress } from '@/helpers/address-search';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import Textarea from '@/components/ui/inputs/textarea';
import TimePicker from '@/components/ui/inputs/time-picker';
import { Button } from '@/components/ui/buttons/button';
import { useBusinessTypes } from '../../onboarding/fetch';
import { AddressSuggestion } from '@/helpers/address-search';
import { useState } from 'react';
import PhoneInput from '@/components/ui/inputs/phone-input';

export interface StoreFormValues {
  storeName: string;
  categoryId: string;
  storeAddress: string;
  phoneNumber: string;
  email: string;
  storeDescription: string;
  dailyOrderLimit: string;
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
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const { data: StoreCategory, isPending, error } = useBusinessTypes();

  console.log('Store Category :', StoreCategory);

  const options =
    StoreCategory?.map((type: any) => ({
      value: type.id,
      label: type.name,
    })) ?? [];

  console.log('store category options :', options);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const results = await searchAddress(values.storeAddress);

      setSuggestions(results);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values.storeAddress]);

  return (
    <Card
      spacing="md"
      className={`bg-white ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className=" space-y-6 md:space-y-10">
        <h2 className="text-neutral-900 font-semibold">Store Information</h2>
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
            required
          />

          <Select
            id="categoryId"
            name="categoryId"
            label="Store Category"
            placeholder="Select category"
            spacing="sm"
            required
            options={
              error
                ? [{ value: '', label: 'Error loading Business Types' }]
                : isPending
                  ? [{ value: '', label: 'Loading Business Types...' }]
                  : options
            }
            value={values.categoryId}
            onChange={(value) => onChange('categoryId', value)}
            errorMessage={errors?.categoryId?.[0]}
            disabled={disabled}
          />

          <div className="relative">
            {' '}
            <Input
              name="storeAddress"
              label="Store Address"
              required
              placeholder="12B Adeola Odaku street, Victoria Island Lag.."
              spacing="sm"
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setTimeout(() => setIsFocused(false), 150);
              }}
              value={values.storeAddress}
              onChange={(e) => onChange('storeAddress', e.target.value)}
              errorMessage={errors?.storeAddress?.[0]}
              disabled={disabled}
            />
            {isFocused && suggestions.length > 0 && (
              <div className="absolute z-50 mt-2 w-full rounded-xl border border-border bg-white shadow-lg overflow-hidden">
                {suggestions.map((item) => (
                  <button
                    key={Math.random()}
                    type="button"
                    className="w-full border-b border-border px-4 py-3 text-left hover:bg-neutral-50 last:border-b-0 text-sm text-neutral-700 cursor-pointer "
                    onClick={() => {
                      onChange('storeAddress', item.description);
                      setSuggestions([]);
                    }}
                  >
                    {item.description}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Input
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            required
            placeholder="+234 123 456 7890"
            spacing="sm"
            value={values.phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            errorMessage={errors?.phoneNumber?.[0]}
            disabled={disabled}
            pattern="[0-9]+"
            maxLength={11}
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
            required
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
        <h2 className="text-neutral-900 font-semibold">Operating Hours</h2>
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
                  <div className="grid grid-cols-5  xl:grid-cols-12 gap-4 items-center">
                    <span className="text-sm col-span-5 xl:col-span-3">
                      {day}<span className="text-red-500">*</span>
                    </span>
                    <div className="col-span-2 xl:col-span-4">
                      <TimePicker
                        name={`${dayKey}Open`}
                        value={values.operatingHours[dayKey]?.open || ''}
                        onChange={(val) => onTimeChange(dayKey, 'open', val)}
                        placeholder="Open"
                        disabled={disabled}
                      />
                    </div>

                    <span className="text-sm flex justify-center items-center col-span-1 xl:col-span-1">
                      to
                    </span>
                    <div className="col-span-2 xl:col-span-4">
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
                          size="icon"
                          rounded="md"
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
        <h2 className="text-neutral-900 font-semibold">
          Store Description & Details
        </h2>
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
            required
          />

          <Input
            name="dailyOrderLimit"
            label="Daily Order Limit/per day"
            type="number"
            placeholder="5000"
            value={values.dailyOrderLimit}
            onChange={(e) => onChange('dailyOrderLimit', e.target.value)}
            errorMessage={errors?.dailyOrderLimit?.[0]}
            disabled={disabled}
            required
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
            required
          />
        </div>
      </div>
    </Card>
  );
}
