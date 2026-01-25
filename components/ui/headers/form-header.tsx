import { sub } from 'framer-motion/client';

export default function FormHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className=" text-center space-y-2 mb-8 md:mb-12 ">
      <h2 className=" text-xl md:text-2xl font-semibold">{title}</h2>

      <p className="text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}
