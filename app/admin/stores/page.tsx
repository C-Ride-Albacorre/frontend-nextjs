
import StorePageWrapper from '@/features/admin/stores/components/store-page-wrapper';

type Props = {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
};

export default async function StoresPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const status = params.status || '';
  const search = params.search || '';

  return (
    <StorePageWrapper
      page={page}
      limit={limit}
      status={status}
      search={search}
    />
  );
}
