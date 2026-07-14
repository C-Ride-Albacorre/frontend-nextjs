'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  LoaderCircle,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import DriversTable from './drivers-table';

import ErrorMessage from '@/components/layout/error-message';
import { Button } from '@/components/ui/buttons/button';
import ViewDriverModal from './view-driver-modal';
import { DriverPageSectionProps, Driver, DriverDetail } from '../types';
import { approveDriverAction, getDriverByIdAction } from '../action';
import Toolbar from '@/components/layout/tool-bar';
import { DRIVER_STATUS_OPTIONS } from '../data';

export default function DriverPageSection({
  drivers,
  meta,
  currentPage,
  currentStatus,
  currentSearch,
  error,
}: DriverPageSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [statusFilter, setStatusFilter] = useState(currentStatus);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverDetail, setDriverDetail] = useState<DriverDetail | null>(null);
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

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
      setSearch(currentSearch);
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
      setStatusFilter(currentStatus);
    }
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateParams({ status: value, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
  };

  const handleViewDriver = async (driver: Driver) => {
    setIsModalOpen(true);
    setIsLoadingDetail(true);
    setDriverDetail(null);

    try {
      const detail = await getDriverByIdAction(driver.id);
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
      router.refresh();
    } else {
      toast.error(result.message);
    }

    return result;
  };

  return (
    <div className="space-y-6">
      <Toolbar
        searchPlaceholder="Search drivers..."
        search={search}
        onSearchChange={setSearch}
        filter={statusFilter}
        onFilterChange={handleStatusChange}
        filterOptions={DRIVER_STATUS_OPTIONS}
        filterPlaceholder="Filter by status"
      />

      {error ? (
        <div className="flex justify-between items-center">
          <ErrorMessage message={error} />
          <Button
            variant="white"
            leftIcon={<RefreshCcw size={14} />}
            size="icon"
            onClick={() => router.refresh()}
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="relative">
          {isPending && (
            <div className="absolute inset-0 bg-white/60 flex justify-center pt-20 z-10">
              <LoaderCircle className="animate-spin text-primary" size={32} />
            </div>
          )}

          <DriversTable
            drivers={drivers}
            onView={handleViewDriver}
            onAction={handleDriverAction}
          />

          {meta.totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-neutral-500">
                Showing {(meta.page - 1) * meta.limit + 1}–
                {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm font-medium">
                  {meta.page} / {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage >= meta.totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
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
