import EmptyState from '@/components/layout/empty-state';
import ErrorState from '@/components/layout/error-state';
import { getSubcategoriesService } from '@/features/admin/category/service';
import Product from '@/features/vendor/products/components/product-wrapper';
import { getStoreProductsService } from '@/features/vendor/products/service';
import { Package } from 'lucide-react';

export default async function ProductIdWrapper({
  productId,
}: {
  productId: string;
}) {
  const id = productId;

  try {
    if (id) {
      const { data } = await getStoreProductsService(id);

      const { data: subCategories } = await getSubcategoriesService();

      console.log('Fetching products for store ID:', id);

      if (!data || data.length === 0) {
        return (
          <EmptyState
            icon={<Package size={36} className="text-neutral-500" />}
            title="No products found"
            message="Please add a product to view its details."
          />
        );
      }
      return (
        <Product
          selectedId={id}
          productData={data}
          subCategories={subCategories}
        />
      );
    } else {
      return (
        <EmptyState
          icon={<Package size={36} className="text-neutral-500" />}
          title="No Store Selected"
          message="Please select a store to view its products."
        />
      );
    }
  } catch (error) {
    console.error('Error fetching products:', error);

    return (
      <ErrorState
        icon={<Package size={36} className="text-orange-500" />}
        title="Something went wrong!"
        message={
          error instanceof Error
            ? error.message
            : 'An error occurred while fetching the products. Please try again later.'
        }
      />
    );
  }
}
