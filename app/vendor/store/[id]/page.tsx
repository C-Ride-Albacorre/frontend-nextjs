import { Button } from '@/components/ui/buttons/button';
import { getStoreAction } from '@/features/vendor/store/action';
import StoreForm from '@/features/vendor/store/components/store-form';
import { ChevronLeft } from 'lucide-react';

export default async function StoreFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === 'new-store';
  const storeData = isNew ? null : await getStoreAction();

  return (
    <>
      <StoreForm initialData={storeData} />
    </>
  );
}
