'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/buttons/button';

import Image from 'next/image';
import {
  Star,
  Dot,
  Clock,
  Search,
  ChevronUp,
  ChevronDown,
  Minus,
  Plus,
  X,
  ChevronRight,
} from 'lucide-react';
import Input from '@/components/ui/inputs/input';
import { useParams } from 'next/navigation';
import { Select } from '@/components/ui/inputs/select';
import clsx from 'clsx';

const CATEGORIES = ['All', 'Food', 'Grocery', 'Gift Items', 'Packages'];

const PRODUCTS = [
  {
    name: 'Grilled Chicken & Chips',
    category: 'Top Sellers',
    price: '₦8,500',
    image: '/assets/image/chicken.jpg',
  },
  {
    name: 'Jollof Rice Special',
    category: 'Nigerian Classics',
    price: '₦8,500',
    image: '/assets/image/jellof.jpg',
  },
  {
    name: 'Chapman Mocktails',
    category: 'Drinks',
    price: '₦8,500',
    image: '/assets/image/chapman.jpg',
  },
  {
    name: 'Peppered Snail',
    category: 'Appetizers',
    price: '₦3,500',
    image: '/assets/image/snail.jpg',
  },
  {
    name: 'Chapman Mocktails',
    category: 'Drinks',
    price: '₦8,500',
    image: '/assets/image/chapman.jpg',
  },
  {
    name: 'Peppered Snail',
    category: 'Appetizers',
    price: '₦3,500',
    image: '/assets/image/snail.jpg',
  },
];

export default function FoodVendorsPage() {
  const [sort, setSort] = useState('');

  const params = useParams();

  const id = params.name;
  return (
    <main>
      <div>
        {/* Vendor */}
        <div className="mt-8 rounded-2xl bg-foreground-200 border border-border p-4 sm:flex items-center justify-between space-y-6">
          <div className="lg:flex items-center flex-1 gap-6 space-y-6 lg:space-y-0">
            <div>
              <Image
                src="/assets/image/vendor.jpg"
                alt="Vendor"
                width={100}
                height={100}
                priority
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="font-medium">The Place Lagos</p>
                <span className="rounded-full bg-primary font-medium px-2 py-0.5 text-[0.65rem]">
                  Premium
                </span>
              </div>

              <p className="mt-1 text-xs text-neutral-500 flex gap-1">
                Nigerian <Dot size={16} /> Chinese
                <span className="text-green-100 ml-2">
                  Min Order: ₦5,500.00
                </span>
              </p>

              <p className="mt-1 text-xs text-neutral-500 flex gap-4">
                <span className="flex gap-2">
                  <Star fill="#D4AF37" stroke="0" size={16} /> 4.8 (318)
                </span>{' '}
                <span className="flex gap-2">
                  {' '}
                  <Clock size={16} /> 25–35 mins
                </span>
              </p>
            </div>
          </div>

          <button className="rounded-xl border border-border px-4 py-4 font-medium cursor-pointer text-xs hover:bg-foreground-100 bg-white">
            Change Store
          </button>
        </div>

        {/* Select Items */}
        <div className="mt-12 space-y-4 md:space-y-0 md:flex items-center justify-between">
          <h2 className="text-lg font-semibold flex-1">Select Items</h2>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown & Search */}

            <div className="w-56">
              <Select
                id="sort"
                value={sort}
                onChange={setSort}
                placeholder="Sort items"
                variant="fill"
                spacing="none"
                options={CATEGORIES.map((category) => ({
                  label: category,
                  value: category.toLowerCase(),
                }))}
                rightIcon={(open) => (
                  <span className="flex flex-col">
                    <ChevronUp
                      size={14}
                      className={clsx('-mb-1 transition-transform', {
                        'rotate-180 text-primary': open,
                      })}
                    />
                    <ChevronDown
                      size={14}
                      className={clsx('transition-transform', {
                        'rotate-180 text-primary': open,
                      })}
                    />
                  </span>
                )}
              />
            </div>

            {/* Search */}
            <div className="w-64">
              <Input
                leftIcon={<Search size={16} />}
                placeholder="Search for item"
                spacing="none"
                variant="fill"
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-12 grid grid-cols-1 gap-8 xl:grid-cols-2">
          {PRODUCTS.map((item, i) => (
            <div
              key={i}
              className="space-y-4 md:space-y-0 md:flex gap-6 rounded-2xl border border-border bg-foreground-200 p-6"
            >
              <div className="relative w-full  h-48 md:h-60  xl:h-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-xl object-cover"
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              </div>

              <div className="flex xl:flex-1 flex-col justify-between">
                <div className="space-y-2">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-neutral-500">{item.category}</p>
                  <p className="text-sm font-medium text-primary">
                    {item.price}
                  </p>
                </div>

                <div className="flex gap-12 py-2 justify-center items-center md:justify-start">
                  <button className="px-3 py-3 text-primary border border-primary rounded-xl flex justify-center items-center cursor-pointer">
                    <Minus size={16} />
                  </button>

                  <span className="px-4 py-2">1</span>

                  <button className="px-3 py-3 bg-primary hover:bg-primary-hover rounded-xl shadow flex justify-center items-center cursor-pointer">
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  className="mt-4 w-full"
                >
                  Add to Order
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className=" bg-foreground-200 p-8  rounded-2xl space-y-10  mt-12">
          <h2 className="text-lg font-semibold">Your Order Summary</h2>

          <ul className="space-y-8">
            <li className=" flex justify-between items-center">
              <p className="flex-1 space-x-4 text-neutral-500">
                <span>Beef Suya Platter</span> <span>x 1</span>
              </p>

              <p className="font-medium text-lg flex items-center space-x-4">
                <span>₦ 6,500</span>{' '}
                <button className=" cursor-pointer">
                  <X size={20} />
                </button>
              </p>
            </li>

            <li className=" flex justify-between items-center">
              <p className="flex-1 space-x-4 text-neutral-500">
                <span>Beef Suya Platter</span> <span>x 1</span>
              </p>

              <p className="font-medium text-lg flex items-center space-x-4">
                <span>₦ 6,500</span>{' '}
                <button className=" cursor-pointer">
                  <X size={20} />
                </button>
              </p>
            </li>
          </ul>

          <div className="py-8 border-t border-border">
            <p className="flex justify-between items-center">
              <span className="text-lg ">Sub Total</span>{' '}
              <span className="text-xl px-8 text-primary">₦ 12,000</span>
            </p>
          </div>
        </div>

        <div className="mt-12  flex items-center justify-center">
          <Button
            href={`/user/delivery/food/${id}/delivery-type`}
            variant="primary"
            size="lg"
            rightIcon={<ChevronRight size={16} />}
          >
            Continue to Delivery
          </Button>
        </div>
      </div>
    </main>
  );
}
