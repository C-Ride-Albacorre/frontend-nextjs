'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Save, Upload, X } from 'lucide-react';
import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';

type ImageItem = {
  id: string;
  file: File;
  preview: string;
};

export default function StoreImageUpload() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = (file: File) => {
    const preview = URL.createObjectURL(file);

    setImages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        file,
        preview,
      },
    ]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleSelectImage(file);

    e.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <Card>
      <div className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Store Image</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {/* IMAGE PREVIEWS */}
          {images.map((img) => (
            <div
              key={img.id}
              className="relative h-40  rounded-xl overflow-hidden border border-border"
            >
              <Image
                src={img.preview}
                alt="Store preview"
                fill
                className="object-cover"
              />

              {/* DELETE */}
              <button
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* ADD IMAGE */}
          <button
            onClick={() => inputRef.current?.click()}
            className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-sm text-neutral-500 hover:bg-foreground-100 transition bg-foreground-200 cursor-pointer"
          >
            <Upload size={20} className="text-primary" />
            Add Image
          </button>

          {/* HIDDEN INPUT */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            leftIcon={<Save size={18} />}
          >
            Save Images
          </Button>
        </div>
      </div>
    </Card>
  );
}
