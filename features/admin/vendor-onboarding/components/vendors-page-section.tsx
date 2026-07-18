'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import VendorsTable from './vendors-table';
import ViewVendorModal from './view-vendor-modal';
import { approveVendorAction, getVendorByIdAction } from '../action';
import { Vendor, VendorDetail, VendorPageSectionProps } from '../types';

import { VENDOR_STATUS_OPTIONS } from '../data';
import Toolbar from '@/components/layout/tool-bar';
import PaginationControls from '@/components/ui/buttons/pagination-control';

export default function VendorPageSection({
  vendors,
  meta,
  currentPage,
  currentStatus,
  currentSearch,
}: VendorPageSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(currentSearch);
  const [statusFilter, setStatusFilter] = useState(currentStatus);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendorDetail, setVendorDetail] = useState<VendorDetail | null>(null);
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
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateParams({ status: value, page: '1' });
  };

  const handleViewVendor = async (vendor: Vendor) => {
    setIsModalOpen(true);
    setIsLoadingDetail(true);
    setVendorDetail(null);

    try {
      const detail = await getVendorByIdAction(vendor.id);
      setVendorDetail(detail);
    } catch {
      setVendorDetail(null);
      toast.error('Failed to load vendor');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleVendorAction = async (
    vendorId: string,
    action: 'APPROVED' | 'REJECTED',
    rejectionReason?: string,
  ) => {
    const payload = rejectionReason ? { action, rejectionReason } : { action };
    const result = await approveVendorAction(vendorId, payload);

    if (result.success) {
      toast.success(
        action === 'APPROVED'
          ? 'Vendor approved successfully'
          : 'Vendor declined successfully',
      );

      router.refresh();
      setIsModalOpen(false);
      setVendorDetail(null);
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
            ? 'All Vendors'
            : `${VENDOR_STATUS_OPTIONS.find((cat) => cat.value === statusFilter)?.label ?? statusFilter} `
        }
        searchPlaceholder="Search vendors..."
        search={search}
        onSearchChange={setSearch}
        filter={statusFilter}
        onFilterChange={handleStatusChange}
        filterOptions={VENDOR_STATUS_OPTIONS}
        filterPlaceholder="Filter by status"
      />

      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 bg-white/60 flex justify-center pt-20 z-10">
            <LoaderCircle className="animate-spin text-primary" size={32} />
          </div>
        )}

        <div className="space-y-8">
          <VendorsTable
            vendors={vendors}
            onView={handleViewVendor}
            onAction={handleVendorAction}
          />

          {meta.totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={meta.totalPages ?? 0}
              isLoading={isPending}
            />
          )}
        </div>
      </div>

      <ViewVendorModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        vendor={vendorDetail}
        isLoading={isLoadingDetail}
        onAction={handleVendorAction}
      />
    </div>
  );
}
