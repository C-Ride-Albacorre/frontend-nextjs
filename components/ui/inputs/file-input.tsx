'use client';

import { useRef, useState } from 'react';
import { Upload, Check, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { FileInputProps } from '@/types/input';

export default function FileInput({
  title,
  description,
  verified = false,
  mode = 'upload',
  onFileSelect,
  uploadStatus = 'idle',
}: FileInputProps & {
  onFileSelect?: (file: File) => void;
  uploadStatus?: 'idle' | 'uploading' | 'done' | 'error';
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const isUploaded = uploadStatus === 'done' || verified;
  const isUploading = uploadStatus === 'uploading';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
    e.target.value = '';
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-border px-6 py-6 bg-white">
      {/* LEFT */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center
            ${isUploaded ? 'bg-emerald-500 text-white' : 'bg-primary/10 text-primary'}
          `}
        >
          {isUploading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : isUploaded ? (
            <Check size={20} />
          ) : mode === 'dashboard' ? (
            <FileText size={20} />
          ) : (
            <Upload size={20} />
          )}
        </div>

        <div className="space-y-1 text-center md:text-left">
          <p className="text-sm font-medium text-neutral-900">{title}</p>
          <p className="text-xs text-neutral-500">{description}</p>
          {fileName && (
            <p
              className={`text-xs truncate max-w-xs ${uploadStatus === 'error' ? 'text-red-500' : 'text-emerald-600'}`}
            >
              {uploadStatus === 'error'
                ? 'Upload failed — try again'
                : fileName}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      {verified ? (
        <span className="rounded-full border border-emerald-500 px-4 py-2 text-xs text-emerald-600 bg-emerald-500/10 flex items-center gap-2">
          <CheckCircle size={14} /> Verified
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
            disabled={isUploading}
            className="rounded-xl bg-primary px-5 py-3 text-sm text-primary-text-100 hover:bg-primary-hover transition disabled:opacity-50 cursor-pointer"
          >
            {isUploading ? 'Uploading...' : isUploaded ? 'Replace' : 'Upload'}
          </button>
        </>
      )}
    </div>
  );
}
