'use client';

import Card from '@/components/layout/card';
import { Button } from '@/components/ui/buttons/button';
import { Select } from '@/components/ui/inputs/select';
import VendorDashboardHeader from '@/components/ui/headers/vendor-header';
import Input from '@/components/ui/inputs/input';
import ProductRow from '@/features/vendor/products/components/product-row';
import { Funnel, Plus, Search, Upload } from 'lucide-react';
import { useState } from 'react';
import AddProduct from '@/features/vendor/products/components/add-product';
import MainLayout from '@/components/layout/main-layout';
import SectionLayout from '@/components/layout/section-layout';
import VendorToolbar from '@/components/layout/vendor-tool-bar';

const CATEGORIES = [
  'All',
  'Nigerian',
  'Chinese',
  'Indian',
  'Italian',
  'Snacks',
];

export default function ProductsPage() {
  const [sort, setSort] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [onEdit, setOnEdit] = useState(false);

  return (
    <>
      <MainLayout>
        <VendorDashboardHeader />

        <SectionLayout>
          <Card>
            <div className="px-4 md:px-8 flex justify-between items-start gap-8">
              <div className="space-y-8">
                <div className="space-y-2 md:space-y-2.5 flex-1">
                  <p className="font-medium text-neutral-900">
                    Product Upload Requirements
                  </p>
                  <p className="text-xs md:text-sm font-normal leading-6 text-neutral-500">
                    All products must have real, high-quality images (minimum
                    800x800px, clear lighting, professional presentation)
                  </p>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="primary"
                  size="lg"
                  type="submit"
                >
                  <Plus size={18} /> Add Product
                </Button>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary/10 hover:bg-primary/20 rounded-full h-10 w-10 md:h-14 md:w-14 shrink-0 aspect-square flex items-center justify-center cursor-pointer"
              >
                <Upload size={20} className="text-primary" />
              </button>
            </div>
          </Card>

          {/* Select Items */}
          <VendorToolbar
            title="Product Catalog"
            searchPlaceholder="Search products..."
            sort={sort}
            onSortChange={setSort}
            categories={CATEGORIES}
          />
          <Card>
            <ul className="px-4 md:px-8 space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  name: 'Signature Jollof Rice',
                  status: 'active',
                  category: 'Nigerian',
                  price: '₦4,500',
                  stock: 'in',
                },
                {
                  name: 'Beef Suya Platter',
                  status: 'inactive',
                  category: 'Nigerian',
                  price: '₦6,500',
                  stock: 'low',
                },
                {
                  name: 'Chicken Alfredo Pasta',
                  status: 'active',
                  category: 'Italian',
                  price: '₦8,500',
                  stock: 'in',
                },
              ].map((product) => (
                <li key={product.name}>
                  <ProductRow
                    name={product.name}
                    status={product.status as 'active' | 'inactive'}
                    category={product.category}
                    price={product.price}
                    stock={product.stock as 'in' | 'low'}
                    onEdit={() => {
                      setSelectedProduct(product);
                      setOnEdit(true);
                      setIsModalOpen(true);
                    }}
                    setIsModalOpen={setIsModalOpen}
                  />
                </li>
              ))}
            </ul>
          </Card>
        </SectionLayout>
      </MainLayout>

      {isModalOpen && (
        <AddProduct
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onEdit={onEdit}
          setOnEdit={setOnEdit}
        />
      )}
    </>
  );
}
