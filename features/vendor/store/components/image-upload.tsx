'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import Card from '@/components/layout/card';

export default function StoreImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const removeImage = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card>
      <div className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Store Logo</p>

        <div className="flex gap-4">
          {/* LOGO PREVIEW */}
          {preview && (
            <div className="relative h-40 w-40 rounded-xl overflow-hidden border border-border">
              <Image
                src={preview}
                alt="Store logo preview"
                fill
                className="object-cover"
              />

              {/* DELETE */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* ADD LOGO */}
          {!preview && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-sm text-neutral-500 hover:bg-foreground-100 transition bg-foreground-200 cursor-pointer"
            >
              <Upload size={20} className="text-primary" />
              Add Logo
            </button>
          )}

          {/* HIDDEN INPUT */}
          <input
            ref={inputRef}
            name="logo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </Card>
  );
}
