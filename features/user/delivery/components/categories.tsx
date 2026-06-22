import Image from 'next/image';
import Link from 'next/link';
import { Store } from 'lucide-react';
import { fetchCategoriesService } from '../service';
import EmptyState from '@/components/layout/empty-state';
import ErrorState from '@/components/layout/error-state';

type Category = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
};

export default async function Categories() {
  try {
    const { data: categories } = await fetchCategoriesService();

    if (!Array.isArray(categories) || !categories.length) {
      return (
        <EmptyState
          icon={<Store size={36} className="text-neutral-400" />}
          title="No categories found"
          message="Please try again later."
        />
      );
    }

    return (
      <>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories?.map((item: any) => (
            <Link
              prefetch={false}
              href={`/user/delivery/${item.id}?name=${encodeURIComponent(item.name)}`}
              key={item.id}
              className="relative flex  items-center justify-between rounded-2xl bg-linear-to-r from-primary to-primary-hover shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300   px-6 py-4  text-left hover:opacity-95 cursor-pointer"
            >
              {/* Left */}
              <div className="flex flex-col justify-around h-full py-2">
                {/* <item.icon className="h-6 w-6 text-primary-text-100" /> */}
                <p className="mt-6 font-medium text-primary-text-100 ">
                  {item.name}
                </p>
              </div>

              {/* Image */}
              <div className="relative h-32 w-36 overflow-hidden rounded-xl">
                <Image
                  src={item.image ? item.image : '/assets/image/nigerian.jpg'}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Display Order */}
                <span className="absolute right-1 top-1 rounded-full bg-white w-6 h-6 flex justify-center items-center shrink-0 aspect-square text-[10px] font-medium text-primary-text-100 shadow-2xl">
                  {item._count?.stores ?? 0}
                </span>

                <div className="absolute inset-0 hidden md:block [background:linear-gradient(180deg,rgba(153,153,153,0)_54.34%,#201F23_95.39%)]" />

                {/* Text */}
                <div className="absolute bottom-1 left-1 text-[10px] text-white">
                  <p className="font-medium">
                    {item.description || 'No description available'}
                  </p>
                  <p className="opacity-80">{item.meta}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);

    return (
      <ErrorState
        icon={<Store size={36} className="text-neutral-400" />}
        title="Failed to load categories"
        message="An error occurred while fetching categories. Please try again later."
      />
    );
  }
}
