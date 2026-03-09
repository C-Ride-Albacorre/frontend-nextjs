import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { CircleMinus, Plus } from 'lucide-react';
import { useState } from 'react';

export interface Addon {
  name: string;
  price: number;
  available: boolean;
}

interface AddOnsFormProps {
  addons: Addon[];
  setAddons: (addons: Addon[]) => void;
}

export default function AddOnsForm({ addons, setAddons }: AddOnsFormProps) {
  const [addonName, setAddonName] = useState('');
  const [addonPrice, setAddonPrice] = useState('');

  const handleAddAddon = () => {
    if (!addonName.trim() || !addonPrice) return;

    const newAddon: Addon = {
      name: addonName.trim(),
      price: Number(addonPrice),
      available: true,
    };

    setAddons([...addons, newAddon]);
    setAddonName('');
    setAddonPrice('');
  };

  const handleRemoveAddon = (index: number) => {
    setAddons(addons.filter((_, i) => i !== index));
  };

  const handleToggleAvailability = (index: number) => {
    setAddons(
      addons.map((addon, i) =>
        i === index ? { ...addon, available: !addon.available } : addon,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-primary/10 border border-primary text-sm space-y-1">
        <p className="font-medium">Configure Add-ons</p>
        <p className="text-neutral-500">
          Add optional extras customers can add to this product (e.g., Extra
          cheese, Plantain)
        </p>
      </Card>

      <div className="space-y-4">
        <p className="text-sm font-medium">Add an Add-on</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="addonName"
            name="addonName"
            placeholder="Add-on name (e.g., Extra Chicken)"
            value={addonName}
            onChange={(e) => setAddonName(e.target.value)}
          />
          <Input
            id="addonPrice"
            name="addonPrice"
            type="number"
            placeholder="Price (e.g., 500)"
            value={addonPrice}
            onChange={(e) => setAddonPrice(e.target.value)}
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddAddon}
          leftIcon={<Plus size={14} />}
          disabled={!addonName.trim() || !addonPrice}
        >
          Add Add-on
        </Button>
      </div>

      {addons.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Added Add-ons ({addons.length})</p>

          {addons.map((addon, index) => (
            <Card
              key={index}
              border="default"
              className="bg-primary/5 text-sm flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium">{addon.name}</p>
                <p className="text-primary">₦{addon.price.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleAvailability(index)}
                  className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                    addon.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {addon.available ? 'Available' : 'Unavailable'}
                </button>

                <button
                  type="button"
                  onClick={() => handleRemoveAddon(index)}
                  className="cursor-pointer"
                >
                  <CircleMinus size={18} className="text-red-500" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {addons.length === 0 && (
        <p className="text-sm text-neutral-400 text-center py-4">
          No add-ons yet. Add-ons are optional — you can skip this step.
        </p>
      )}
    </div>
  );
}
