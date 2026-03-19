export const VENDOR_STATUS_OPTIONS = [
  { label: 'All Vendors', value: '' },
  { label: 'Pending Verification', value: 'PENDING_VERIFICATION' },
  { label: 'Pending Email', value: 'PENDING_EMAIL_VERIFICATION' },
  { label: 'Pending Phone', value: 'PENDING_PHONE_VERIFICATION' },
  { label: 'Pending Onboarding', value: 'PENDING_ONBOARDING' },
  { label: 'Pending Documents', value: 'PENDING_DOCUMENTS' },
  { label: 'Ready for Review', value: 'READY_FOR_REVIEW' },
  { label: 'Under Review', value: 'UNDER_REVIEW' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Suspended', value: 'SUSPENDED' },
  { label: 'Rejected', value: 'REJECTED' },
];

export const statusStyles: Record<string, string> = {
  APPROVED: 'bg-emerald-100 text-emerald-600',
  ACTIVE: 'bg-emerald-100 text-emerald-600',
  UNDER_REVIEW: 'bg-blue-100 text-blue-600',
  READY_FOR_REVIEW: 'bg-blue-100 text-blue-600',
  PENDING_VERIFICATION: 'bg-orange-100 text-orange-600',
  PENDING_ONBOARDING: 'bg-orange-100 text-orange-600',
  PENDING_DOCUMENTS: 'bg-orange-100 text-orange-600',
  PENDING_EMAIL_VERIFICATION: 'bg-orange-100 text-orange-600',
  PENDING_PHONE_VERIFICATION: 'bg-orange-100 text-orange-600',
  REJECTED: 'bg-red-100 text-red-600',
  SUSPENDED: 'bg-red-100 text-red-600',
};
