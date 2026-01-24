import { input } from 'framer-motion/client';

type InputProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  errorMessage?: string;
  inputInfo?: string;
  // value?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  errorMessage,
  inputInfo,
  // value,
  // onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        // value={value}
        // onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
      />

      {errorMessage && (
        <span className=" text-xs  mt-2 text-red-600">{errorMessage}</span>
      )}

      {inputInfo && (
        <span className=" text-xs  mt-2 text-neutral-500">{inputInfo}</span>
      )}
    </div>
  );
}
