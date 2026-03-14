'use client';

import { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import VendorsTable from './vendors-table';
import VendorTabs from './vendor-tab';
import ViewVendorModal from './view-vendor-modal';
import {
  getVendorsAction,
  getVendorByIdAction,
  approveVendorAction,
} from './action';
import { Vendor, VendorDetail } from './types';
import ErrorMessage from '@/components/layout/error-message';
import { Button } from '@/components/ui/buttons/button';

export default function VendorPageSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [vendorDetail, setVendorDetail] = useState<VendorDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Fetch vendors list
  const vendorsQuery = useQuery({
    queryKey: ['admin-vendors', page],
    queryFn: () => getVendorsAction(page),
  });

  const allVendors: Vendor[] = vendorsQuery.data?.vendors ?? [];
  const meta = vendorsQuery.data?.meta ?? {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };

  // Filter vendors by active tab
  const vendors = useMemo(() => {
    if (activeTab === 'all') return allVendors;
    return allVendors.filter((v: Vendor) => v.status === activeTab);
  }, [allVendors, activeTab]);

  // Handle view vendor
  const handleViewVendor = async (vendor: Vendor) => {
    setSelectedVendorId(vendor.id);
    setIsModalOpen(true);
    setIsLoadingDetail(true);

    try {
      const detail = await getVendorByIdAction(vendor.id);
      setVendorDetail(detail);
    } catch {
      setVendorDetail(null);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Shared approve/decline handler used by both modal and table rows
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
      setIsModalOpen(false);
      setVendorDetail(null);
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] });
    } else {
      toast.error(result.message);
    }
    return result;
  };

  return (
    <div className="space-y-6">
      <VendorTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {vendorsQuery.isError && (
        <div className="flex justify-between items-center">
          <ErrorMessage
            message={
              (vendorsQuery.error as Error)?.message || 'Failed to load vendors'
            }
          />
          <Button
            variant="white"
            leftIcon={<RefreshCcw size={14} />}
            size="icon"
            onClick={() => vendorsQuery.refetch()}
          >
            Retry
          </Button>
        </div>
      )}

      {vendorsQuery.isPending ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <>
          <VendorsTable
            vendors={vendors}
            onView={handleViewVendor}
            onAction={handleVendorAction}
          />

          {/* Pagination */}
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
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft size={16} />
                </Button>
                <span className="text-sm font-medium">
                  {meta.page} / {meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

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
