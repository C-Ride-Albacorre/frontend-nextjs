import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import { Button } from '@/components/ui/buttons/button';
import { CircleMinus, CirclePlus, Plus } from 'lucide-react';
import { useState } from 'react';
import Textarea from '@/components/ui/inputs/textarea';

export interface Addon {
  addonName: string;
  price: number;
  description?: string;
  maxQuantity?: number;
  category?: string;
}

interface AddOnsFormProps {
  addons: Addon[];
  setAddons: (addons: Addon[]) => void;
}

export default function AddOnsForm({ addons, setAddons }: AddOnsFormProps) {
  const [addonName, setAddonName] = useState('');
  const [addonPrice, setAddonPrice] = useState('');
  const [addonDescription, setAddonDescription] = useState('');
  const [addonMaxQuantity, setAddonMaxQuantity] = useState('');
  const [addonCategory, setAddonCategory] = useState('');

  const handleAddAddon = () => {
    if (!addonName.trim() || !addonPrice) return;

    const newAddon: Addon = {
      addonName: addonName.trim(),
      price: Number(addonPrice),
      description: addonDescription.trim() || undefined,
      maxQuantity: addonMaxQuantity ? Number(addonMaxQuantity) : undefined,
      category: addonCategory.trim() || undefined,
    };

    setAddons([...addons, newAddon]);
    setAddonName('');
    setAddonPrice('');
    setAddonDescription('');
    setAddonMaxQuantity('');
    setAddonCategory('');
  };

  const handleRemoveAddon = (index: number) => {
    setAddons(addons.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card
        gap="sm"
        spacing="sm"
        className="bg-primary/10 border border-primary text-sm space-y-1"
      >
        <p className="font-medium">Configure Add-ons</p>
        <p className="text-neutral-500 text-xs">
          Add optional extras customers can add to this product (e.g., Extra
          cheese, Plantain)
        </p>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="addonName"
            name="addonName"
            label="Add-on Name"
            placeholder="Add-on name (e.g., Extra Chicken)"
            value={addonName}
            onChange={(e) => setAddonName(e.target.value)}
          />
          <Input
            id="addonPrice"
            label="Price"
            name="addonPrice"
            type="number"
            placeholder="Price (e.g., 500)"
            value={addonPrice}
            onChange={(e) => setAddonPrice(e.target.value)}
          />

          <Input
            id="addonMaxQuantity"
            label="Max quantity"
            name="addonMaxQuantity"
            type="number"
            placeholder="Max quantity"
            value={addonMaxQuantity}
            onChange={(e) => setAddonMaxQuantity(e.target.value)}
          />
          <Select
            id="addonCategory"
            label="Category"
            value={addonCategory}
            onChange={(v) => setAddonCategory(v)}
            options={[
              { label: 'Toppings', value: 'Toppings' },
              { label: 'Sides', value: 'Sides' },
              { label: 'Drinks', value: 'Drinks' },
              { label: 'Sauces', value: 'Sauces' },
              { label: 'Extras', value: 'Extras' },
            ]}
          />

          <div className="md:col-span-2">
            <Textarea
              id="addonDescription"
              name="addonDescription"
              placeholder="Description"
              value={addonDescription}
              onChange={(e) => setAddonDescription(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="green-secondary-outline"
          size="icon"
          className="w-full"
          onClick={handleAddAddon}
          leftIcon={<CirclePlus size={14} />}
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
              <div className="space-y-2 mb-0">
                <p className="font-medium capitalize">{addon.addonName}</p>

                <div className="flex items-center gap-12">
                  {addon.category && (
                    <p className="text-neutral-800 text-sm">
                      <span className="text-xs text-neutral-500">
                        Category:
                      </span>{' '}
                      {addon.category}
                    </p>
                  )}

                  <p className="text-primary">
                    <span className="text-xs text-neutral-500">Price:</span> ₦
                    {addon.price.toLocaleString()}
                  </p>
                </div>

                {addon.description && (
                  <p className="text-neutral-500 text-xs">
                    {addon.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleRemoveAddon(index)}
                className="cursor-pointer"
              >
                <CircleMinus size={18} className="text-red-500" />
              </button>
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
