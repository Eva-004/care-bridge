"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getDonations, getMyRequests } from "@/lib/fetchData";
import OverviewCard from "@/components/dashboard/OverviewCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import {
    FiFileText,
    FiClock,
    FiCheckCircle,
    FiHeart,
    FiDollarSign,
    FiUsers,
} from "react-icons/fi";
import type { ReactNode } from "react";
import NotificationPanel from "@/components/dashboard/NotificationPanel";

interface Activity {
    _id: string;
    amount?: number;
    status?: string;
    purpose?: string;
    category?: {
        name?: string;
    };
    createdAt: string;
    role: string;
}

interface OverviewCardData {
    title: string;
    value: string | number;
    icon: ReactNode;
    color: string;
}


const OverView = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    const role = user?.role;

    useEffect(() => {
        const fetchActivities = async () => {
            if (!user) return;

            try {
                let data: Activity[] = [];

                if (role === "donor") {
                    data = await getDonations(user.email);
                } else if (role === "user") {
                    data = await getMyRequests(user.id);
                }

                setActivities(data || []);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [user?.id, user?.email, role]);

    if (loading) {
        return <p className="p-6 text-gray-500">Loading dashboard...</p>;
    }

    const totalAmount = activities.reduce(
        (total, item) => total + Number(item.amount || 0),
        0
    );

    const pending = activities.filter(
        (item) => item.status === "pending"
    ).length;

    const approved = activities.filter(
        (item) => item.status === "approved"
    ).length;



    const cards: OverviewCardData[] =
        role === "donor"
            ? [
                {
                    title: "Total Donations",
                    value: activities.length,
                    icon: <FiHeart size={22} />,
                    color: "bg-orange-50 text-[#E36414]",
                },
                {
                    title: "Total Donated",
                    value: `৳${totalAmount.toLocaleString()}`,
                    icon: <FiDollarSign size={22} />,
                    color: "bg-green-50 text-[#0F6848]",
                },
            ]
            : [
                {
                    title: "Total Requests",
                    value: activities.length,
                    icon: <FiFileText size={22} />,
                    color: "bg-blue-50 text-[#0F4C5C]",
                },
                {
                    title: "Pending",
                    value: pending,
                    icon: <FiClock size={22} />,
                    color: "bg-orange-50 text-[#E36414]",
                },
                {
                    title: "Approved",
                    value: approved,
                    icon: <FiCheckCircle size={22} />,
                    color: "bg-green-50 text-[#0F6848]",
                },

            ];

    return (
        <div className="space-y-6 w-11/12 mx-auto py-4">
            <div>
                <p className="text-sm font-medium text-[#E36414]">
                    MY DASHBOARD
                </p>
                <h1 className="mt-1 text-2xl font-bold text-[#1D2D44]">
                    Welcome back, {user?.name}!
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    {role === "donor"
                        ? "Thank you for making a difference through your donations."
                        : "Keep track of your help requests and updates."}
                </p>
            </div>


            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {cards.map((card) => (
                    <OverviewCard key={card.title} {...card} />
                ))}
            </div>

            <section>
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-[#1D2D44]">
                        Your Updates
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Stay informed about your recent activities and notifications.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <RecentActivities
                        activities={activities}
                        role={role}
                    />

                    <NotificationPanel />
                </div>
            </section>
        </div>
    );
};

export default OverView ;