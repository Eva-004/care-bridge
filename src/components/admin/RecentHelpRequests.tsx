
import { Card } from "@heroui/react";
import Link from "next/link";
import { FiFileText, FiArrowRight } from "react-icons/fi";

interface HelpRequest {
    _id: string;
    title?: string;
    name?: string;
    category?: {
        name?: string;
    };
    status?: string;
    createdAt: string;
}

interface RecentHelpRequestsProps {
    requests: HelpRequest[];
}

const RecentHelpRequests = ({ requests }: RecentHelpRequestsProps) => {
    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "bg-green-50 text-[#0F6848]";
            case "rejected":
                return "bg-red-50 text-red-600";
            default:
                return "bg-orange-50 text-[#E36414]";
        }
    };

    return (
        <Card className="border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4F1] text-[#0F6848]">
                        <FiFileText size={19} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-[#1D2D44]">
                            Recent Help Requests
                        </h2>
                        <p className="text-xs text-gray-500">
                            Latest submitted requests
                        </p>
                    </div>
                </div>

                <Link
                    href="/dashboard/manage-requests"
                    className="flex items-center gap-1 text-sm font-semibold text-[#0F6848] hover:text-[#E36414]"
                >
                    View All
                    <FiArrowRight size={16} />
                </Link>
            </div>

            {requests.length === 0 ? (
                <div className="flex min-h-[250px] flex-col items-center justify-center px-5 text-center">
                    <FiFileText size={32} className="text-gray-300" />
                    <h3 className="mt-3 font-semibold text-[#1D2D44]">
                        No Help Requests Yet
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        New help requests will appear here.
                    </p>
                </div>
            ) : (
                <div>
                    {requests.slice(0, 5).map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 last:border-0"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4F1] text-[#0F6848]">
                                    <FiFileText size={18} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-medium text-[#1D2D44]">
                                        {item.title || item.category?.name || "Help Request"}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(item.status)}`}
                            >
                                {item.status || "Pending"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default RecentHelpRequests;
