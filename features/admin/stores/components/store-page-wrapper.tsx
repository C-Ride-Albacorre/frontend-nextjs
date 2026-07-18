import { getStoresService } from "../service";
import StoresPageSection from "./stores-page-section";

export default async function StorePageWrapper({
  page,
  limit,
  status,
  search,
}: {
  page: number;
  limit: number;
  status: string;
  search: string;
}) {
  try {
    const response = await getStoresService(
      page,
      limit,
      status || undefined,
      search || undefined,
    );

    console.log('Stores response:', response);

    const stores = response.data.data;

    console.log('stores:', response.data.data);
    
    const meta = response?.data.meta;

    return (
      <StoresPageSection
        stores={stores}
        meta={meta}
        currentPage={page}
        currentStatus={status}
        currentSearch={search}
      />
    );
  } catch (error) {}
}
