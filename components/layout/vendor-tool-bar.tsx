import { Search, Funnel } from 'lucide-react';
import Input from '../ui/inputs/input';
import { Select } from '../ui/inputs/select';

export default function VendorToolbar({
  title,
  searchPlaceholder = 'Search...',
  sort,
  onSortChange,
  categories = [],
}: {
  title?: string;
  searchPlaceholder?: string;
  sort: string;
  onSortChange: (value: string) => void;
  categories: string[];
}) {
  const hasTitle = Boolean(title);

  return (
    <div
      className={`
        space-y-4 md:space-y-0
        md:flex md:items-center
        ${hasTitle ? 'md:justify-between' : ''}
      `}
    >
      {hasTitle && (
        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
      )}

      {/* Actions */}
      <div
        className={`
    flex gap-3 w-full md:items-center
    ${hasTitle ? 'md:w-auto' : 'md:flex-1'}
  `}
      >
        {/* Search */}
        <div
          className={`
      flex-1 min-w-0
      ${hasTitle ? 'md:w-64' : ''}
    `}
        >
          <Input
            leftIcon={<Search size={16} className="text-neutral-400" />}
            placeholder={searchPlaceholder}
            spacing="none"
            variant="fill"
          />
        </div>

        {/* Filter */}
        <div className="w-36 md:w-56 shrink-0">
          <Select
            id="sort"
            value={sort}
            onChange={onSortChange}
            placeholder="Filter"
            variant="fill"
            spacing="none"
            options={categories.map((category) => ({
              label: category,
              value: category.toLowerCase(),
            }))}
            leftIcon={<Funnel size={16} className="text-neutral-400" />}
          />
        </div>
      </div>
    </div>
  );
}
