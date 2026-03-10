import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import { Button } from '@/components/ui/buttons/button';
import { CircleMinus, CirclePlus, Plus } from 'lucide-react';
import { useState } from 'react';

export interface Variant {
  variantName: string;
  price: number;
  sku: string;
  stockQuantity: number;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  attributes?: Record<string, string>;
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
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [stockStatus, setStockStatus] = useState<
    'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
  >('IN_STOCK');

  const handleAddVariant = () => {
    if (!variantName || !price || !sku) return;

    const newVariant: Variant = {
      variantName,
      price: Number(price),
      sku,
      stockQuantity: Number(stockQuantity) || 0,
      stockStatus,
      attributes: {},
    };

    setVariants([...variants, newVariant]);

    setVariantName('');
    setPrice('');
    setSku('');
    setStockQuantity('');
    setStockStatus('IN_STOCK');
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card
        gap="sm"
        spacing="sm"
        className="bg-primary/10  border-primary text-sm"
      >
        <p className="font-medium">Configure Product Variants</p>
        <p className="text-neutral-500 text-xs">
          Add different variations of this product (e.g., Small, Medium, Large)
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          placeholder="Variant name"
          value={variantName}
          onChange={(e) => setVariantName(e.target.value)}
        />

        <Input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Input
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />

        <Input
          placeholder="Stock Quantity"
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />

        <Select
          id="stockStatus"
          label="Stock Status"
          value={stockStatus}
          onChange={(v) => setStockStatus(v as any)}
          options={[
            { label: 'In Stock', value: 'IN_STOCK' },
            { label: 'Low Stock', value: 'LOW_STOCK' },
            { label: 'Out of Stock', value: 'OUT_OF_STOCK' },
          ]}
        />
      </div>

      <Button
        type="button"
        variant="green-secondary-outline"
        size="icon"
        onClick={handleAddVariant}
        leftIcon={<CirclePlus size={14} />}
        className="w-full"
      >
        Add Variant
      </Button>

      {variants.length > 0 && (
        <div className="space-y-3">
          {variants.map((variant, index) => (
            <Card
              key={index}
              gap="sm"
              spacing="sm"
              className="flex items-center justify-between text-sm bg-primary/10  border-primary"
            >
              <div className="mb-0 space-y-2">
                <p className="font-medium">{variant.variantName}</p>

                <div className="flex gap-4">
                  <p className="text-neutral-500">
                    <span className="text-xs">SKU:</span> {variant.sku}
                  </p>

                  <p className="text-primary">
                    {' '}
                    <span className="text-xs text-neutral-500">Price: </span>₦
                    {variant.price}
                  </p>
                </div>
              </div>

              <button type="button" onClick={() => handleRemoveVariant(index)}>
                <CircleMinus size={18} className="text-red-500" />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
