"use client";

import { Button, Card } from "@heroui/react";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaHandHoldingHeart,
  FaUser,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface HelpRequest {
  _id: string;
  name?: string;
  phone?: string;
  createdAt?: string;
  category?: {
    name?: string;
  };
  urgency?: string;
  description?: string;
  supportType: string,
  needs?: string,
  amount?: string | number;
  location?: string;
}

interface HelpRequestCardProps {
  request: HelpRequest;
}

const HelpRequestCard = ({ request }: HelpRequestCardProps) => {
  const router = useRouter();

  const urgencyColors: Record<string, string> = {
    normal: "bg-gray-100 text-gray-600",
    urgent: "bg-[#FFF1E6] text-[#E36414]",
    critical: "bg-red-50 text-red-600",
  };

  const handleDetails = () => {
    router.push(`/help-seekers/${request?._id}`);
  };

  return (
    <Card className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-[#0F4C5C]">
          <FaHandHoldingHeart />
          {request?.category?.name || "General"}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${urgencyColors[request?.urgency?.toLowerCase() || ""] ||
            "bg-gray-100 text-gray-600"
            }`}
        >
          {request?.urgency || "Normal"}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FaUser className="shrink-0 text-[#0F4C5C]" />
          <span>{request?.name || "Anonymous"}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaPhone className="shrink-0 text-[#0F4C5C]" />
          <span>{request?.phone || "Phone not available"}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="shrink-0 text-[#0F4C5C]" />
          <span>
            {request?.createdAt
              ? new Date(request.createdAt).toLocaleDateString("en-GB")
              : "Date not available"}
          </span>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-5 text-[#1D2D44]">
        {request?.description || "No description available."}
      </p>

      {request?.supportType === "financial" ? (
        <div className="mt-3 rounded-lg bg-[#F8F9FA] p-3">
          <p className="text-xs text-gray-500">Requested Amount</p>
          <h3 className="mt-1 text-xl font-bold text-[#0F4C5C]">
            ৳{Number(request?.amount || 0).toLocaleString("en-IN")}
          </h3>
        </div>
      ) : (
        <div className="mt-3 rounded-lg bg-[#F8F9FA] p-3">
          <p className="text-xs text-gray-500">Requested Support</p>
          <h3 className="mt-1 text-sm font-semibold text-[#0F4C5C]">
            {request?.needs
              ? request.needs.split(/\s+/).slice(0, 2).join(" ") + "..."
              : "Essential Items Needed"}
          </h3>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
        <FaMapMarkerAlt className="shrink-0 text-[#E36414]" />
        <span className="truncate">
          {request?.location || "Location not specified"}
        </span>
      </div>

      <div className="mt-auto border-t border-gray-100 pt-3">
        <Button
          onPress={handleDetails}
          className="w-full bg-[#0F4C5C] font-medium text-white hover:bg-[#0b3d4a]"
        >
          View Details
          <FaArrowRight className="ml-2 text-xs" />
        </Button>
      </div>
    </Card>
  );
};

export default HelpRequestCard;