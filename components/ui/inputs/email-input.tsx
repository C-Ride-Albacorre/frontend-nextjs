export default function EmailInput() {
  return (
    <div>
      <label className="text-sm font-medium">Email Address</label>
      <input
        type="email"
        placeholder="Enter email address"
        className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-base md:text-sm outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
