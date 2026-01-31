'use client';

import { useRef, useState } from 'react';
import {
  Upload,
  Check,
  FileText,
  CheckCircle,
} from 'lucide-react';


import { FileInputProps } from '@/types/input';



export default function FileInput({
  title,
  description,
  verified = false,
  mode = 'upload',
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const isUploaded = Boolean(fileName) || verified;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-border px-6 py-6 bg-white">
      {/* LEFT */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* ICON */}
        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center
            ${
              verified
                ? 'bg-emerald-500 text-white'
                : mode === 'dashboard'
                ? 'bg-primary/10 text-primary'
                : isUploaded
                ? 'bg-emerald-500 text-white'
                : 'bg-primary/10 text-primary'
            }
          `}
        >
          {verified ? (
            <CheckCircle size={20} />
          ) : mode === 'dashboard' ? (
            <FileText size={20} />
          ) : isUploaded ? (
            <Check size={20} />
          ) : (
            <Upload size={20} />
          )}
        </div>

        {/* TEXT */}
        <div className="space-y-1 text-center md:text-left">
          <p className="text-sm font-medium text-neutral-900">{title}</p>
          <p className="text-xs text-neutral-500">{description}</p>

          {/* FILE NAME */}
          {fileName && (
            <p className="text-xs text-emerald-600 truncate max-w-xs">
              {fileName}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      {verified ? (
        <span className="rounded-full border border-emerald-500 px-4 py-2 text-xs text-emerald-600 bg-emerald-500/10 flex items-center gap-2">
          <CheckCircle size={14} />
          Verified
        </span>
      ) : mode === 'dashboard' ? (
        <span className="rounded-full border border-border px-4 py-2 text-xs text-neutral-500">
          Pending
        </span>
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl bg-primary px-5 py-3 text-sm text-primary-text-100 hover:bg-primary-hover transition"
          >
            Upload
          </button>
        </>
      )}
    </div>
  );
}
