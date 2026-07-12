import ErrorState from '@/components/layout/error-state';
import { getStoreByIdAction } from '@/features/vendor/store/action';
import StoreForm from '@/features/vendor/store/components/store-form';
import { AlertCircle } from 'lucide-react';

export default async function StoreFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === 'new-store';
  try {
    const storeData = isNew ? null : await getStoreByIdAction(id);

    return (
      <>
        <StoreForm initialData={storeData} />
      </>
    );
  } catch (error) {
    console.error('Error fetching store data:', error);

    return (
      <ErrorState
        icon={<AlertCircle size={36} className="text-orange-500" />}
        title="Something went wrong!"
        message={
          error instanceof Error ? error.message : 'Error fetching store data'
        }
      />
    );
  }
}
