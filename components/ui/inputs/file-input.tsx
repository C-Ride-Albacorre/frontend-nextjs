'use client';

import { Check, Upload } from 'lucide-react';

export default function FileInput({
  isUploaded,
  title,
  subtitle,
  value,
  //   handleUpload,
}: {
  isUploaded: boolean;
  title: string;
  subtitle: string;
  value: string;
  //   handleUpload: (value: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between rounded-2xl border border-border px-6 py-6 ">
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
        <div
          className={`p-4 rounded-full flex items-center justify-center
                    ${
                      isUploaded
                        ? 'bg-emerald-500 text-white'
                        : 'bg-primary/10 text-primary'
                    }`}
        >
          {isUploaded ? <Check size={22} /> : <Upload size={22} />}
        </div>

        <div className='text-center md:text-left space-y-1'>
          <p className="text-sm font-medium text-primary-text-100">{title}</p>
          <p className="text-xs text-neutral-500">{subtitle}</p>
        </div>
      </div>

      {isUploaded ? (
        <span className="rounded-full border border-emerald-500 px-4 py-2 text-xs text-emerald-600">
          Uploaded
        </span>
      ) : (
        <button
          //   onClick={() => handleUpload(value)}
          className="rounded-xl bg-primary px-5 py-3 text-sm text-primary-text-100 hover:bg-primary-hover cursor-pointer transition"
        >
          Upload
        </button>
      )}
    </div>
  );
}
