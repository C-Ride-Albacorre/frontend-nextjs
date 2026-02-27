import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import TimePicker from '@/components/ui/inputs/time-picker';

export interface StoreFormValues {
  storeName: string;
  storeCategory: string;
  storeAddress: string;
  phoneNumber: string;
  email: string;
  storeDescription: string;
  minimumOrder: string;
  deliveryFee: string;
  preparationTime: string;
  operatingHours: Record<string, { open: string; close: string }>;
}

interface StoreInformationProps {
  values: StoreFormValues;
  onChange: (field: keyof StoreFormValues, value: string) => void;
  errors?: Record<string, string[]>;
}

export function StoreInformation({
  values,
  onChange,
  errors,
}: StoreInformationProps) {
  return (
    <Card className="bg-white">
      <div className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Store Information</p>
        <div className="space-y-6">
          <Input
            name="storeName"
            label="Business Name"
            placeholder="Enter your business name"
            spacing="sm"
            value={values.storeName}
            onChange={(e) => onChange('storeName', e.target.value)}
            errorMessage={errors?.storeName?.[0]}
          />

          <Input
            name="storeCategory"
            label="Business Category"
            placeholder="Select type"
            spacing="sm"
            value={values.storeCategory}
            onChange={(e) => onChange('storeCategory', e.target.value)}
            errorMessage={errors?.storeCategory?.[0]}
          />

          <Input
            name="storeAddress"
            label="Store Address"
            placeholder="12B Adeola Odaku street, Victoria Island Lag.."
            spacing="sm"
            value={values.storeAddress}
            onChange={(e) => onChange('storeAddress', e.target.value)}
            errorMessage={errors?.storeAddress?.[0]}
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
          />
        </div>
      </div>
    </Card>
  );
}

interface OperatingHoursProps {
  values: StoreFormValues;
  onTimeChange: (day: string, type: 'open' | 'close', value: string) => void;
  errors?: Record<string, string[]>;
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
  errors,
}: OperatingHoursProps) {
  return (
    <Card className="bg-white">
      <div className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Operating Hours</p>
        {errors?.operatingHours && (
          <p className="text-xs text-red-600">{errors.operatingHours[0]}</p>
        )}
        <div className="space-y-6">
          {DAYS.map((day) => {
            const dayKey = day.toLowerCase();
            return (
              <div key={day} className="grid grid-cols-10 gap-4 items-center">
                <span className="w-20 text-sm col-span-3">{day}</span>
                <div className="col-span-3">
                  <TimePicker
                    name={`${dayKey}Open`}
                    value={values.operatingHours[dayKey]?.open || ''}
                    onChange={(val) => onTimeChange(dayKey, 'open', val)}
                    placeholder="Open"
                  />
                </div>

                <span className="text-sm flex justify-center items-center">
                  to
                </span>
                <div className="col-span-3">
                  <TimePicker
                    name={`${dayKey}Close`}
                    value={values.operatingHours[dayKey]?.close || ''}
                    onChange={(val) => onTimeChange(dayKey, 'close', val)}
                    placeholder="Close"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

interface StoreDetailsProps {
  values: StoreFormValues;
  onChange: (field: keyof StoreFormValues, value: string) => void;
  errors?: Record<string, string[]>;
}

export function StoreDetails({ values, onChange, errors }: StoreDetailsProps) {
  return (
    <Card className="bg-white">
      <div className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">
          Store Description & Details
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Textarea
            id="storeDescription"
            name="storeDescription"
            label="Store Description"
            placeholder="Tell customers about your store, specialities, and what makes you unique."
            wrapperClassName="md:col-span-3"
            value={values.storeDescription}
            onChange={(e) => onChange('storeDescription', e.target.value)}
          />

          <Input
            name="minimumOrder"
            label="Minimum Order"
            type="number"
            placeholder="5000"
            value={values.minimumOrder}
            onChange={(e) => onChange('minimumOrder', e.target.value)}
            errorMessage={errors?.minimumOrder?.[0]}
          />

          <Input
            name="deliveryFee"
            label="Delivery Fee"
            type="number"
            placeholder="2000"
            value={values.deliveryFee}
            onChange={(e) => onChange('deliveryFee', e.target.value)}
            errorMessage={errors?.deliveryFee?.[0]}
          />

          <Input
            name="preparationTime"
            label="Preparation Time (mins)"
            type="number"
            placeholder="30"
            value={values.preparationTime}
            onChange={(e) => onChange('preparationTime', e.target.value)}
            errorMessage={errors?.preparationTime?.[0]}
          />
        </div>
      </div>
    </Card>
  );
}
