import { Layers, Layers2, Package } from 'lucide-react';
export default function AddProductType({
  setProductType,
  productType,
}: {
  productType: string;
  setProductType: (type: 'SINGLE' | 'VARIABLE') => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Layers2 size={16} className="text-primary" />

        <h2 className="text-sm font-medium">Product Type</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => setProductType('SINGLE')}
          className={`p-6 border  rounded-xl flex flex-col gap-4 items-center justify-center cursor-pointer ${
            productType === 'SINGLE'
              ? 'bg-primary/10  border-primary'
              : 'bg-white border-border'
          }`}
        >
          <Package size={24} className="text-primary" />

          <h2 className="font-medium">Single Product</h2>

          <span className="text-xs text-neutral-500">
            One price, no variations
          </span>
        </button>

        <button
          type="button"
          onClick={() => setProductType('VARIABLE')}
          className={`p-6 border rounded-xl flex flex-col gap-4 items-center justify-center cursor-pointer ${
            productType === 'VARIABLE'
              ? 'bg-primary/10 border-primary'
              : 'bg-white border-border'
          }`}
        >
          <Layers size={24} className="text-green-100" />

          <h2 className="font-medium">Variable Product</h2>

          <span className="text-xs text-neutral-500">
            Multiple prices, depending on variations
          </span>
        </button>
      </div>
    </div>
  );
}
