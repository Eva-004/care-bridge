
"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
    getUsers,
    getRequests,
    getCampaigns,
    getAllDonations,
} from "@/lib/fetchData";

import OverviewCard from "@/components/dashboard/OverviewCard";

import NotificationPanel from "@/components/dashboard/NotificationPanel";

import {
    FiUsers,
    FiHeart,
    FiFileText,
} from "react-icons/fi";
import type { ReactNode } from "react";
import OverviewAnalytics, { AnalyticsData } from "@/components/admin/OverviewAnalytics";
import { BsFillMegaphoneFill } from "react-icons/bs";
import RecentHelpRequests from "@/components/admin/RecentHelpRequests";
import ActiveCampaigns from "@/components/admin/ActiveCampaigns";

interface Donation {
    _id: string;
    amount: number;
    paymentStatus: string;
    createdAt: string;
}

interface HelpRequest {
    _id: string;
    title?: string;
    category?: {
        name?: string;
    };
    status?: string;
    createdAt: string;
}

interface Campaign {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    time: string;
    location: string;
}

interface User {
    _id?: string;
    id?: string;
    role?: string;
}

interface OverviewCardData {
    title: string;
    value: string | number;
    icon: ReactNode;
    color: string;
}

const getArray = <T,>(data: unknown, key: string): T[] => {
    if (Array.isArray(data)) return data as T[];

    if (data && typeof data === "object") {
        const result = (data as Record<string, unknown>)[key];
        if (Array.isArray(result)) return result as T[];
    }

    return [];
};

const AdminDashboard = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [users, setUsers] = useState<User[]>([]);
    const [donations, setDonations] = useState<Donation[]>([]);
    const [requests, setRequests] = useState<HelpRequest[]>([]);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;

            try {
                const [userData, requestData, donationData, campaignData] =
                    await Promise.all([
                        getUsers(),
                        getRequests(),
                        getAllDonations(),
                        getCampaigns(),
                    ]);

                const allUsers = getArray<User>(userData, "users");
                const allRequests = getArray<HelpRequest>(
                    requestData,
                    "requests"
                );
                const allDonations = getArray<Donation>(
                    donationData,
                    "donations"
                );
                const allCampaigns = getArray<Campaign>(
                    campaignData,
                    "campaigns"
                );

                setUsers(allUsers.filter((item) => item.role !== "admin"));
                setRequests(allRequests);
                setDonations(allDonations);
                setCampaigns(allCampaigns);

                const successfulDonations = allDonations.filter(
                    (item) => item.paymentStatus === "SUCCESS"
                );

                const monthlyData: AnalyticsData[] = [];

                for (let i = 5; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(1);
                    date.setMonth(date.getMonth() - i);

                    const month = date.toLocaleDateString("en-US", {
                        month: "short",
                    });

                    const year = date.getFullYear();
                    const monthIndex = date.getMonth();

                    const monthlyDonations = successfulDonations.filter(
                        (item) => {
                            const itemDate = new Date(item.createdAt);
                            return (
                                itemDate.getFullYear() === year &&
                                itemDate.getMonth() === monthIndex
                            );
                        }
                    );

                    const monthlyRequests = allRequests.filter((item) => {
                        const itemDate = new Date(item.createdAt);
                        return (
                            itemDate.getFullYear() === year &&
                            itemDate.getMonth() === monthIndex
                        );
                    });

                    monthlyData.push({
                        month,
                        donations: monthlyDonations.length,
                        requests: monthlyRequests.length,
                    });
                }

                setAnalytics(monthlyData);
            } catch (error) {
                console.error("Failed to fetch admin dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user?.id]);

    if (loading) {
        return (
            <div className="mx-auto w-11/12 space-y-5 py-6">
                <div className="h-32 animate-pulse rounded-xl bg-gray-100" />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-28 animate-pulse rounded-xl bg-gray-100"
                        />
                    ))}
                </div>

                <div className="h-72 animate-pulse rounded-xl bg-gray-100" />
            </div>
        );
    }

    const successfulDonations = donations.filter(
        (item) => item.paymentStatus === "SUCCESS"
    );

    const totalDonationAmount = successfulDonations.reduce(
        (total, item) => total + Number(item.amount || 0),
        0
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingCampaigns = campaigns
        .filter((item) => {
            const campaignDate = new Date(item.date);
            return (
                !isNaN(campaignDate.getTime()) &&
                campaignDate >= today
            );
        })
        .sort(
            (a, b) =>
                new Date(a.date).getTime() -
                new Date(b.date).getTime()
        );

    const cards: OverviewCardData[] = [
        {
            title: "Total Users",
            value: users.length.toLocaleString(),
            icon: <FiUsers size={22} />,
            color: "bg-blue-50 text-[#0F4C5C]",
        },
        {
            title: "Total Donations",
            value: `৳${totalDonationAmount.toLocaleString()}`,
            icon: <FiHeart size={22} />,
            color: "bg-orange-50 text-[#E36414]",
        },
        {
            title: "Total Requests",
            value: requests.length.toLocaleString(),
            icon: <FiFileText size={22} />,
            color: "bg-green-50 text-[#0F6848]",
        },
        {
            title: "Active Campaigns",
            value: upcomingCampaigns.length,
            icon: <BsFillMegaphoneFill size={22} />,
            color: "bg-purple-50 text-purple-600",
        },
    ];

    return (
        <div className="mx-auto w-11/12 space-y-6 py-6">
            <section className="relative overflow-hidden rounded-xl bg-[#0F4C5C] p-7 text-white">
                <div className="relative z-10">
                    <p className="text-sm font-medium text-[#B9E5D5]">
                        CAREBRIDGE ADMIN
                    </p>

                    <h1 className="mt-2 text-2xl font-bold md:text-3xl">
                        Welcome back, {user?.name}!
                    </h1>

                    <p className="mt-2 text-sm text-gray-200">
                        Here`s what`s happening on CareBridge today.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <OverviewCard key={card.title} {...card} />
                ))}
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                <div className="xl:col-span-3">
                    <OverviewAnalytics data={analytics} />
                </div>

                <div className="xl:col-span-2">
                    <NotificationPanel />
                </div>
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <RecentHelpRequests
                    requests={[...requests]
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .slice(0, 3)}
                />

                <ActiveCampaigns campaigns={upcomingCampaigns.slice(0, 3)} />
            </section>
        </div>
    );
};

export default AdminDashboard;
