import Input from '@/components/ui/inputs/input';
import Textarea from '@/components/ui/inputs/textarea';
import { Button } from '@/components/ui/buttons/button';

export default function ManualAddressForm() {
  return (
    <>
      <form action="/" className="space-y-5">
        <Input
          label="Location Name"
          type="text"
          placeholder="e.g. Home, Office, Gym"
          spacing="sm"
        />

        <Input
          label="Street Address"
          type="text"
          placeholder="Home/Building number and street"
          spacing="sm"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Select your city"
            spacing="sm"
          />

          <Input label="State" type="text" placeholder="Lagos" spacing="sm" />
        </div>

        <Input
          label="Nearby Landmark"
          type="text"
          placeholder="eg. Near Shoprite"
          spacing="sm"
        />

        <Textarea
          id="deliveryInstructions"
          label="Delivery Instructions (Optional)"
          placeholder="Add any specific delivery instructions..."
          rows={4}
        />

        <div className="text-center">
          <Button variant="primary" size="lg" className="px-12">
            Save & Use Location
          </Button>
        </div>
      </form>
    </>
  );
}
