
import { Card } from "@heroui/react";
import Link from "next/link";
import { FiActivity, FiArrowRight } from "react-icons/fi";

interface Activity {
    _id: string;
    purpose?: string;
    amount?: number;
    category?: {
        name?: string;
    };
    status?: string;
    createdAt: string;
}

interface RecentActivitiesProps {
    activities: Activity[];
    role?: string;
}

const RecentActivities = ({ activities, role }: RecentActivitiesProps) => {
    return (
        <Card className="h-full border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFF0E5] text-[#E36414]">
                        <FiActivity size={19} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-[#1D2D44]">
                            Recent Activities
                        </h2>
                        <p className="text-xs text-gray-500">
                            Your latest activities
                        </p>
                    </div>
                </div>

                <Link
                    href={role === "donor" ? "/dashboard/donor/my-donations" : "/dashboard/user/help-requests"}
                    className="flex items-center gap-1 text-sm font-semibold text-[#0F6848] transition hover:text-[#E36414]"
                >
                    View All
                    <FiArrowRight size={16} />
                </Link>
            </div>

            {activities.length === 0 ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF0E5] text-[#E36414]">
                        <FiActivity size={28} />
                    </div>

                    <h3 className="mt-4 font-semibold text-[#1D2D44]">
                        No activities yet
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-gray-500">
                        {role === "donor"
                            ? "Your donation activities will appear here once you make your first donation."
                            : "Your help request activities and updates will appear here."}
                    </p>
                </div>
            ) : (
                <div>
                    {activities.slice(0, 5).map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 last:border-0"
                        >
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4F1] text-[#0F6848]">
                                    <FiActivity size={18} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-medium text-[#1D2D44]">
                                        {role === "donor"
                                            ? item.purpose || "Donation"
                                            : item.category?.name || "Help Request"}
                                    </h3>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {role === "donor" ? (
                                <span className="shrink-0 font-semibold text-[#0F6848]">
                                    ৳{item.amount}
                                </span>
                            ) : (
                                <span className="shrink-0 rounded-full bg-[#FFF0E5] px-3 py-1 text-xs font-medium capitalize text-[#E36414]">
                                    {item.status || "Pending"}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-auto border-t border-gray-100 bg-[#F8FAFB] px-5 py-3">
                <p className="text-center text-xs text-gray-500">
                    Showing your 5 latest activities
                </p>
            </div>
        </Card>
    );
};

export default RecentActivities;
