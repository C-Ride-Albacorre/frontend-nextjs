import ErrorState from '@/components/layout/error-state';
import { getDriversService } from '../service';
import DriverPageSection from './drivers-page-section';
import { Car } from 'lucide-react';

export default async function DriverPageWrapper({
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
    const response = await getDriversService(
      page,
      limit,
      status || undefined,
      search || undefined,
    );

    // console.log('Response:', response);

    const drivers = response.data.data;
    const meta = response.data.meta;


    console.log(' Drivers:', drivers);

    return (
      <DriverPageSection
        drivers={drivers}
        meta={meta}
        currentPage={page}
        currentStatus={status}
        currentSearch={search}
      />
    );
  } catch (error) {
    return (
      <ErrorState
        icon={<Car className='text-orange-500' size={36} />}
        title="Something went wrong!"
        message={
          error instanceof Error
            ? error.message
            : 'Unable to load drivers at this time. Please try again later'
        }
      />
    );
  }
}
