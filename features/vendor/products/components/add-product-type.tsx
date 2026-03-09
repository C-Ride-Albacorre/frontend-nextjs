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
        <Layers2 size={20} className="text-primary" />

        <p className="text-sm font-medium">Product Type</p>
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

          <p className="text-sm font-medium">Single Product</p>

          <span className="text-sm text-neutral-500">
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

          <p className="text-sm font-medium">Variable Product</p>

          <span className="text-sm text-neutral-500">
            One price, no variations
          </span>
        </button>
      </div>
    </div>
  );
}
