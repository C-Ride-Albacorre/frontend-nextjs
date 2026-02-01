import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import { CheckCircle, Upload } from 'lucide-react';
import Image from 'next/image';

export function StoreInformation() {
  return (
    <Card>
      <form className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Store Information</p>
        <div className="space-y-6">
          <Input
            label="Business Name"
            placeholder="Enter your business Bank name"
            spacing="sm"
          />

          <Input
            label="Business Category"
            placeholder="Select type"
            spacing="sm"
          />

          <Input
            label="Store Address"
            placeholder="12B Adeola Odaku street, Victoria Island Lag.."
            spacing="sm"
          />

          <Input
            label="Phone Number"
            type="numeric"
            placeholder="+234 812 345 6789"
            spacing="sm"
          />

          <Input
            label="Store Address"
            placeholder="Contact@theplace.com.ng"
            spacing="sm"
          />
        </div>

        <div className="w-full text-center">
          <Button
            leftIcon={<CheckCircle size={18} />}
            variant="primary"
            size="lg"
            type="submit"
          >
            Update Store Information
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function OperatingHours() {
  return (
    <Card>
      <form className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Operating Hours</p>
        <div className="space-y-6">
          {[
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ].map((day) => (
            <div key={day} className="grid grid-cols-7 gap-4 items-center">
              <span className="w-20 text-sm col-span-2">{day}</span>
              <div className="col-span-2">
                <Input />
              </div>

              <span className=" text-sm flex justify-center items-center">
                to
              </span>
              <div className="col-span-2">
                <Input />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full text-center">
          <Button variant="primary" size="lg" type="submit">
            Save Operating Hours
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function StoreDetails() {
  return (
    <Card>
      <form className="px-4 md:px-8 space-y-6 md:space-y-10">
        {' '}
        <p className="text-neutral-900 font-medium">
          Store Description & Details
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Textarea
            id="storeDescription"
            label="Store Description"
            placeholder="Tell Customers about your store, specialities, and what makes you unique."
            wrapperClassName="md:col-span-3"
          />

          <Input label="Minimum Order" placeholder="5,000" />

          <Input label="Delivery Fee" placeholder="2,000" />

          <Input label="Preparation Time" placeholder="30 mins" />
        </div>
        <div className="w-full text-center">
          <Button variant="primary" size="lg" type="submit">
            Update Details
          </Button>
        </div>
      </form>
    </Card>
  );
}


