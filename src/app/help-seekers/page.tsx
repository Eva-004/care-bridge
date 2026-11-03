"use client";

import HelpRequestCard from "@/components/cards/HelpRequestCard";
import HelpRequestSearchAndFilters from "@/components/helpRequests/HelpRequestSearchAndFilters";
import { getCategories, getRequests } from "@/lib/fetchData";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface Category {
  _id: string;
  name: string;
}

interface Filters {
  search: string;
  category: string;
  urgency: string;
}

interface HelpRequest {
  _id: string;
  name?: string;
  phone?: string;
  createdAt?: string;
  category?: {
    _id?: string;
    name?: string;
  };
  urgency?: string;
  description?: string;
  supportType: string,
  needs?: string,
  amount?: string | number;
  location?: string;
}

const HelpSeekersPage = () => {
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    urgency: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await getRequests(filters);
        setHelpRequests(data);
      } catch (error) {
        console.error(error);
        setHelpRequests([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <main className="min-h-screen bg-[#F8F9FA] p-4">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#1D2D44] sm:text-3xl">
            Help Seekers
          </h1>
          <p className="mt-2  text-sm leading-6 text-gray-500 sm:text-base">
            Explore help requests from people who need support and make a
            positive difference in their lives.
          </p>
        </div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#1D2D44]">
              All Help Requests
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse requests submitted by people in need.
            </p>
          </div>
          <span className="rounded-full bg-[#E8F1F3] px-3 py-1.5 text-sm font-semibold text-[#0F4C5C]">
            {helpRequests.length} Requests
          </span>
        </div>
        <HelpRequestSearchAndFilters
          filters={filters}
          categories={categories}
          onFiltersChange={setFilters}
        />
        <div className="mx-auto w-11/12">
          {loading ? (
            <p className="py-12 text-center text-sm text-gray-500">
              Loading help requests...
            </p>
          ) : helpRequests.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {helpRequests.map((request) => (
                <HelpRequestCard key={request._id} request={request} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F1F3]">
                <FaSearch className="text-xl text-[#0F4C5C]" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1D2D44]">
                No Help Requests Found
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Try changing your search or filters to find help requests.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HelpSeekersPage;