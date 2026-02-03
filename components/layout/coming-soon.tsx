export default function ComingSoon({
  title = 'Coming Soon',
  subtitle = 'We’re working hard to bring this feature to life.',
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
          <span className="text-primary text-2xl">🚀</span>
        </div>

        {/* Text */}
        <h1 className="text-3xl lg:text-4xl font-semibold text-neutral-900 mb-4">
          {title}
        </h1>
        <p className="text-neutral-500 mb-6 ">{subtitle}</p>
      </div>
    </div>
  );
}
