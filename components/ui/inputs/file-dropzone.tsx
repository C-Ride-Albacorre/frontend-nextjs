'use client';

import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import clsx from 'clsx';

type FileDropzoneProps = {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  value?: File | null;
  onChange: (file: File | null) => void;
  className?: string;
};

export default function FileDropzone({
  label = 'Product Image',
  accept = 'image/png, image/jpeg',
  maxSizeMB = 10,
  value,
  onChange,
  className,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File must be under ${maxSizeMB}MB`);
      return;
    }

    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium">{label}</p>}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={clsx(
          'relative flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-border border transition',
          isDragging ? 'border-primary bg-primary/5' : 'border-border mt-2',
        )}
      >
        {value ? (
          <div className="relative">
            <img
              src={URL.createObjectURL(value)}
              alt="Preview"
              className="h-24 w-24 rounded-lg object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute -top-2 -right-2 rounded-full bg-black p-1 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <Upload className="h-6 w-6 text-neutral-700" />
            <p className="text-sm text-neutral-900">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-neutral-500">
              PNG, JPG up to {maxSizeMB}MB
            </p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
    </div>
  );
}
