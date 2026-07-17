'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Car } from 'lucide-react';
import { toast } from 'sonner';
import DriversTable from './drivers-table';

import ViewDriverModal from './view-driver-modal';
import { DriverPageSectionProps, Driver, DriverDetail, DriverProps } from '../types';
import { approveDriverAction, getDriverByIdAction } from '../action';
import Toolbar from '@/components/layout/tool-bar';
import { DRIVER_STATUS_OPTIONS } from '../data';
import PaginationControls from '@/components/ui/buttons/pagination-control';
import { getDriverByIdService } from '../service';

export default function DriverPageSection({
  drivers,
  meta,
  currentPage,
  currentStatus,
  currentSearch,
}: DriverPageSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [statusFilter, setStatusFilter] = useState(currentStatus);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverDetail, setDriverDetail] = useState<DriverProps | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Sync local state with URL params on external navigation
  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    setStatusFilter(currentStatus);
  }, [currentStatus]);

  // Debounce search -> push to URL
  useEffect(() => {
    if (search === currentSearch) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set('search', search);
      else params.delete('search');
      params.set('page', '1');
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [search, currentSearch, searchParams, pathname, router, startTransition]);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleViewDriver = async (driver: Driver) => {
    setIsModalOpen(true);
    setIsLoadingDetail(true);
    setDriverDetail(null);

    try {
      const detail: DriverProps = await getDriverByIdAction(driver.id);

      setDriverDetail(detail);
    } catch {
      setDriverDetail(null);
      toast.error('Failed to load driver');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleDriverAction = async (
    driverId: string,
    action: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ) => {
    const payload = rejectionReason ? { action, rejectionReason } : { action };
    const result = await approveDriverAction(driverId, payload);

    if (result.success) {
      toast.success(
        action === 'APPROVED'
          ? 'Driver approved successfully'
          : 'Driver declined successfully',
      );
      setIsModalOpen(false);
      setDriverDetail(null);
    } else {
      toast.error(result.message);
    }

    return result;
  };

  return (
    <div className="space-y-6">
      <Toolbar
        title={
          statusFilter === ''
            ? 'All Drivers'
            : `${DRIVER_STATUS_OPTIONS.find((cat) => cat.value === statusFilter)?.label ?? statusFilter} `
        }
        searchPlaceholder="Search drivers..."
        search={search}
        onSearchChange={setSearch}
        filter={statusFilter}
        onFilterChange={handleStatusChange}
        filterOptions={DRIVER_STATUS_OPTIONS}
        filterPlaceholder="Filter by status"
      />

      <DriversTable
        drivers={drivers}
        onView={handleViewDriver}
        onAction={handleDriverAction}
      />

      {meta.totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={meta.totalPages ?? 0}
        />
      )}

      <ViewDriverModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        driver={driverDetail}
        isLoading={isLoadingDetail}
        onAction={handleDriverAction}
      />
    </div>
  );
}
