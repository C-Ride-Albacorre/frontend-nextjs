'use client';

import Card from '@/components/layout/card';
import Input from '@/components/ui/inputs/input';
import { Select } from '@/components/ui/inputs/select';
import { Button } from '@/components/ui/buttons/button';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useState } from 'react';

export interface Variant {
  variantName: string;
  price: number;
  sku: string;
  stockQuantity: number;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'NOT_AVAILABLE';
  attributes?: Record<string, string>;
}

interface Props {
  variants: Variant[];
  setVariants: (variants: Variant[]) => void;
}

export default function VariantsForm({ variants, setVariants }: Props) {
  const [variantName, setVariantName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [stockStatus, setStockStatus] = useState<
    'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'NOT_AVAILABLE'
  >('IN_STOCK');

  const [attributeName, setAttributeName] = useState('');
  const [attributeValue, setAttributeValue] = useState('');

  const handleAddVariant = () => {
    if (!variantName || !price || !sku) return;

    const attributes: Record<string, string> = {};

    if (attributeName && attributeValue) {
      attributes[attributeName] = attributeValue;
    }

    const newVariant: Variant = {
      variantName,
      price: Number(price),
      sku,
      stockQuantity: Number(stockQuantity) || 0,
      stockStatus,
      attributes,
    };

    setVariants([...variants, newVariant]);

    setVariantName('');
    setPrice('');
    setSku('');
    setStockQuantity('');
    setAttributeName('');
    setAttributeValue('');
  };

  return (
    <div className="space-y-6">
      <Card
        gap="sm"
        spacing="md"
        className="bg-[#10B981]/10 border border-[#10B981] text-sm"
      >
        <p className="font-medium">Configure Product Variants</p>

        <p className="text-neutral-500 text-xs">
          Add different sizes or variations of this product (e.g., Small,
          Medium, Large)
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <Input
          placeholder="Attribute Name (e.g size)"
          value={attributeName}
          onChange={(e) => setAttributeName(e.target.value)}
        />

        <Input
          placeholder="Attribute Value (e.g Large)"
          value={attributeValue}
          onChange={(e) => setAttributeValue(e.target.value)}
        />

        <div className="md:col-span-2 w-full">
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
      </div>

      <Button
        onClick={handleAddVariant}
        variant="green-secondary-outline"
        type="button"
        size="icon"
        disabled={!variantName.trim() || !price || !sku}
        className="w-full"
      >
        <CirclePlus size={16} /> Add Variant
      </Button>

      {variants.map((variant, index) => (
        <Card
          key={index}
          className="bg-primary/5 text-sm flex items-center justify-between"
        >
          <div className="space-y-2 mb-0">
            <p className="font-medium capitalize">{variant.variantName}</p>

            <div className="flex items-center gap-12">
              <p className="text-neutral-800 text-sm">
                <span className="text-xs text-neutral-500">SKU:</span>{' '}
                {variant.sku}
              </p>

              <p className="text-neutral-800 text-sm">
                <span className="text-xs text-neutral-500 space-x-2">
                  Qty:{' '}
                </span>{' '}
                <span>{variant.stockQuantity}</span>
                <span className="text-xs text-neutral-500 capitalize ml-2">
                  ({variant.stockStatus.replaceAll('_', ' ').toLowerCase()})
                </span>
              </p>
            </div>

            <p className="text-[#10B981] font-medium">
              <span className="text-xs text-neutral-500">Price:</span> ₦
              {variant.price.toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setVariants(variants.filter((_, i) => i !== index))}
            className="cursor-pointer"
          >
            <CircleMinus size={18} className="text-red-500" />
          </button>
        </Card>
      ))}
    </div>
  );
}
