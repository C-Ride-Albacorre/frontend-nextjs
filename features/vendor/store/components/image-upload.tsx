'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, AlertCircle } from 'lucide-react';
import Card from '@/components/layout/card';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface StoreImageUploadProps {
  initialLogo?: string | null;
  disabled?: boolean;
}

export default function StoreImageUpload({
  initialLogo,
  disabled,
}: StoreImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialLogo || null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('Image size must be less than 5MB');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const removeImage = () => {
    if (disabled) return;
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card className={disabled ? 'opacity-50 pointer-events-none' : ''}>
      <div className="px-4 md:px-8 space-y-6 md:space-y-10">
        <p className="text-neutral-900 font-medium">Store Logo</p>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex gap-4">
          {/* LOGO PREVIEW */}
          {preview && (
            <div className="relative h-40 w-40 rounded-xl overflow-hidden border border-border">
              <Image
                src={preview}
                alt="Store logo preview"
                fill
                className="object-cover"
                unoptimized
              />

              {/* DELETE */}
              {!disabled && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* ADD LOGO */}
          {!preview && (
            <button
              type="button"
              onClick={() => !disabled && inputRef.current?.click()}
              disabled={disabled}
              className={`flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-sm text-neutral-500 transition bg-foreground-200 ${
                disabled
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:bg-foreground-100 cursor-pointer'
              }`}
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
            disabled={disabled}
          />
        </div>
      </div>
    </Card>
  );
}
