
"use client";

import DonationTable from "@/components/dashboard/donation/DonationTable";
import { useEffect, useState } from "react";
import {
    FiHeart,
    FiDollarSign,
    FiCheckCircle,
    FiClock,
} from "react-icons/fi";

interface DonationData {
    _id: string;
    name: string;
    category: string;
    purpose: string;
    amount: number;
    email: string;
    phone: string;
    paymentStatus: string;
    paymentMethod: string;
    tranId: string;
    createdAt: string;
}

const DonationPage = () => {
    const [donations, setDonations] = useState<DonationData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/donations`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch donations");
                }

                const data = await response.json();
                setDonations(data.donations || []);
            } catch (error) {
                console.error("Donation Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const successfulDonations = donations.filter(
        (donation) => donation.paymentStatus === "SUCCESS"
    );

    const pendingDonations = donations.filter(
        (donation) => donation.paymentStatus === "PENDING"
    );

    const totalAmount = successfulDonations.reduce(
        (total, donation) => total + donation.amount,
        0
    );

    const stats = [
        {
            title: "Total Donations",
            value: donations.length,
            icon: FiHeart,
            color: "bg-[#E8F2F4] text-[#0F4C5C]",
        },
        {
            title: "Total Amount",
            value: `৳${totalAmount.toLocaleString()}`,
            icon: FiDollarSign,
            color: "bg-orange-50 text-[#E36414]",
        },
        {
            title: "Successful",
            value: successfulDonations.length,
            icon: FiCheckCircle,
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Pending",
            value: pendingDonations.length,
            icon: FiClock,
            color: "bg-amber-50 text-amber-600",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-7">

                <div>
                    <h1 className="text-2xl font-bold text-[#1D2D44] sm:text-3xl">
                        Donations
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Manage and monitor all donations made through CareBridge.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {stat.title}
                                        </p>

                                        <h2 className="mt-3 text-2xl font-bold text-[#1D2D44]">
                                            {loading ? "..." : stat.value}
                                        </h2>
                                    </div>

                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                                    >
                                        <Icon size={23} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#1D2D44]">
                                All Donations
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                View all donor information and donation records.
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-[#E8F2F4] px-3 py-1.5 text-xs font-semibold text-[#0F4C5C]">
                            {donations.length} Records
                        </span>
                    </div>

                    <div className="p-4 sm:p-5">
                        {loading ? (
                            <div className="py-12 text-center text-sm text-gray-500">
                                Loading donations...
                            </div>
                        ) : (
                            <DonationTable
                                donations={donations}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DonationPage;
