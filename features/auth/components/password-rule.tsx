export function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <li
      className={`flex items-center gap-2 transition-colors duration-200 text-xs ${
        valid ? 'text-green-600' : 'text-red-500'
      }`}
    >
      <span
        className={`h-1 w-1 rounded-full ${
          valid ? 'bg-green-600' : 'bg-red-500'
        }`}
      />
      {text}
    </li>
  );
}
