import { getStoreByIdAction } from '@/features/vendor/store/action';
import StoreForm from '@/features/vendor/store/components/store-form';

export default async function StoreFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === 'new-store';
  const storeData = isNew ? null : await getStoreByIdAction(id);

  return (
    <>
      <StoreForm initialData={storeData} />
    </>
  );
}
