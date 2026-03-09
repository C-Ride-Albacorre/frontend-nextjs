import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
import { Button } from '@/components/ui/buttons/button';
import { CircleMinus, Plus } from 'lucide-react';
import { useState } from 'react';

export interface Variant {
  name: string;
  options: string[];
  priceModifier: number;
}

interface VariantsFormProps {
  variants: Variant[];
  setVariants: (variants: Variant[]) => void;
}

export default function VariantsForm({
  variants,
  setVariants,
}: VariantsFormProps) {
  const [variantName, setVariantName] = useState('');
  const [variantPrice, setVariantPrice] = useState('');

  const handleAddVariant = () => {
    if (!variantName.trim()) return;

    const newVariant: Variant = {
      name: variantName.trim(),
      options: [variantName.trim()],
      priceModifier: variantPrice ? Number(variantPrice) : 0,
    };

    setVariants([...variants, newVariant]);
    setVariantName('');
    setVariantPrice('');
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-primary/10 border border-primary text-sm space-y-1">
        <p className="font-medium">Configure Product Variants</p>
        <p className="text-neutral-500">
          Add different sizes or variations of this product (e.g., Small,
          Medium, Large)
        </p>
      </Card>

      <div className="space-y-4">
        <p className="text-sm font-medium">Add Variant</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="variantName"
            name="variantName"
            placeholder="Variant name (e.g., Small)"
            value={variantName}
            onChange={(e) => setVariantName(e.target.value)}
          />
          <Input
            id="variantPrice"
            name="variantPrice"
            type="number"
            placeholder="Additional price (e.g., 500)"
            value={variantPrice}
            onChange={(e) => setVariantPrice(e.target.value)}
          />
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddVariant}
          leftIcon={<Plus size={14} />}
          disabled={!variantName.trim()}
        >
          Add Variant
        </Button>
      </div>

      {variants.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">
            Added Variants ({variants.length})
          </p>

          {variants.map((variant, index) => (
            <Card
              key={index}
              border="default"
              className="bg-primary/5 text-sm flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium">{variant.name}</p>
                <p className="text-primary">
                  {variant.priceModifier > 0
                    ? `+₦${variant.priceModifier.toLocaleString()}`
                    : 'No additional cost'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveVariant(index)}
                className="cursor-pointer"
              >
                <CircleMinus size={18} className="text-red-500" />
              </button>
            </Card>
          ))}
        </div>
      )}

      {variants.length === 0 && (
        <p className="text-sm text-neutral-400 text-center py-4">
          No variants added yet. Add at least one variant above.
        </p>
      )}
    </div>
  );
}
