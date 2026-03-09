export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-3  bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs">
      {message}
    </div>
  );
}
