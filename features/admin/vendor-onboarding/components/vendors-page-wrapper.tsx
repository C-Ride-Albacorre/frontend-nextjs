import ErrorState from '@/components/layout/error-state';
import VendorPageSection from './vendors-page-section';
import { Package, UsersRound } from 'lucide-react';
import { getVendorsService } from '../service';

export default async function VendorsPageWrapper({
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
    const response = await getVendorsService(
      page,
      limit,
      status || undefined,
      search || undefined,
    );

    console.log('Vendors response:', response);

    const vendors = response.data.data;

    console.log('vendors:', response.data.data);
    const meta = response?.data.meta;

    return (
      <VendorPageSection
        vendors={vendors}
        meta={meta}
        currentPage={page}
        currentStatus={status}
        currentSearch={search}
      />
    );
  } catch (error) {
    console.error('Error rendering VendorPageSection:', error);

    return (
      <ErrorState
        icon={<UsersRound size={36} className="text-orange-500" />}
        title="Something went wrong!"
        message={
          error instanceof Error
            ? error.message
            : 'An error occurred while loading the vendors. Please try again later.'
        }
      />
    );
  }
}
