"use client";

import { useEffect, useState } from "react";
import { getDonationHistory } from "@/lib/fetchData";
import { toast } from "react-toastify";
import DonationHistory from "@/components/dashboard/donation/DonationHistory";

interface DonationHistoryItem {
    _id: string;
    requestId: string;
    userId: string;
    userName: string;
    amount: number;
    paymentMethod: string;
    transactionId: string;
    senderNumber: string;
    status: string;
    createdAt: string;
}

const DonationHistoryPage = () => {
    const [history, setHistory] = useState<DonationHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getDonationHistory();
                setHistory(data);
            } catch (error) {
                toast.error("Failed to load donation history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading donation history...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-11/12 mx-auto py-4">
            <DonationHistory history={history} role="admin" />
        </div>
    );
};

export default DonationHistoryPage;