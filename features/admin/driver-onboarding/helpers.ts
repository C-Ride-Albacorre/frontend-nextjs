export function formatStatus(status: string) {
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const REVIEWABLE_STATUSES = ['UNDER_REVIEW', 'READY_FOR_REVIEW'];
