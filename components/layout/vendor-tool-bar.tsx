
'use client';

import { Search, Funnel, Clock } from 'lucide-react';
import Input from '../ui/inputs/input';
import { Select } from '../ui/inputs/select';

type Option = {
  label: string;
  value: string;
};

type Props = {
  title?: string;
  searchPlaceholder?: string;
  filterPlaceholder?: string;
  // search
  search: string;
  onSearchChange: (value: string) => void;
  // filter/status
  filter: string;
  onFilterChange: (value: string) => void;
  filterOptions?: Option[];
  updatedAt?: string;
};

export default function VendorToolbar({
  title,
  searchPlaceholder = 'Search...',
  filterPlaceholder = 'Filter by status',
  search,
  onSearchChange,
  filter,
  onFilterChange,
  filterOptions = [],
  updatedAt,
}: Props) {
  const hasTitle = Boolean(title);

  return (
    <div className="space-y-2">
      <div
        className={`space-y-4 md:space-y-0 md:flex md:items-center
          ${hasTitle ? 'md:justify-between' : ''}`}
      >
        {hasTitle && (
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
        )}

        <div
          className={`flex gap-3 w-full md:items-center
            ${hasTitle ? 'md:w-auto' : 'md:flex-1'}`}
        >
          {/* Search */}
          <div className={`flex-1 min-w-0 ${hasTitle ? 'md:w-64' : ''}`}>
            <Input
              leftIcon={<Search size={16} className="text-neutral-400" />}
              placeholder={searchPlaceholder}
              spacing="none"
              variant="fill"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Filter */}
          {filterOptions.length > 0 && (
            <div className="w-44 shrink-0">
              <Select
                id="filter"
                value={filter}
                onChange={onFilterChange}
                placeholder={filterPlaceholder}
                variant="fill"
                spacing="none"
                options={filterOptions}
                // leftIcon={<Funnel size={16} className="text-neutral-400" />}
              />
            </div>
          )}
        </div>
      </div>

      {updatedAt && (
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-primary" />
          <span className="text-neutral-400 text-xs">
            Last updated: {updatedAt}
          </span>
        </div>
      )}
    </div>
  );
}
