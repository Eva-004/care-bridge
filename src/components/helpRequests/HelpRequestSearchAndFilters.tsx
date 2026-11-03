"use client";

import { FaSearch, FaChevronDown } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
}

interface Filters {
  search: string;
  category: string;
  urgency: string;
}

interface Props {
  filters: Filters;
  categories: Category[];
  onFiltersChange: (callback: (prev: Filters) => Filters) => void;
}

const HelpRequestSearchAndFilters = ({
  filters,
  categories,
  onFiltersChange,
}: Props) => {
  const filterButtonClass =
    "h-12 w-full rounded-xl border border-[#DCE7E9] bg-white px-3 text-sm text-[#1D2D44] shadow-sm outline-none transition hover:border-[#0F4C5C] focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/10";

  const handleFilterChange = (name: keyof Filters, value: string) => {
    onFiltersChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-3 pb-5 lg:flex-row lg:items-center">
      
      <div className="relative min-w-0 flex-1">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F4C5C]" />

        <input
          type="text"
          value={filters.search}
          onChange={(e) =>
            handleFilterChange("search", e.target.value)
          }
          placeholder="Search by name or description..."
          aria-label="Search help requests"
          className="h-12 w-full rounded-xl border border-[#DCE7E9] bg-white py-2 pl-11 pr-4 text-sm text-[#1D2D44] outline-none transition placeholder:text-gray-400 focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/10"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-[400px] lg:shrink-0">
        
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) =>
              handleFilterChange("category", e.target.value)
            }
            aria-label="Filter by category"
            className={`${filterButtonClass} appearance-none pr-8`}
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500" />
        </div>

        
        <div className="relative">
          <select
            value={filters.urgency}
            onChange={(e) =>
              handleFilterChange("urgency", e.target.value)
            }
            aria-label="Filter by urgency"
            className={`${filterButtonClass} appearance-none pr-8`}
          >
            <option value="">All Urgency</option>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>

          <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default HelpRequestSearchAndFilters;