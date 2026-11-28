
"use client";

import { useEffect, useState } from "react";
import { getMyDonationHistory } from "@/lib/fetchData";
import { useSession } from "@/lib/auth-client";
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
    const { data: session, isPending } = useSession();

    const [history, setHistory] = useState<DonationHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!session?.user?.id) return;

            try {
                const data = await getMyDonationHistory(session.user.id);
                setHistory(data);
            } catch (error) {
                toast.error("Failed to load donation history");
            } finally {
                setLoading(false);
            }
        };

        if (!isPending) {
            if (session?.user?.id) {
                fetchHistory();
            } else {
                setLoading(false);
            }
        }
    }, [session, isPending]);

    if (isPending || loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading donation history...
                </p>
            </div>
        );
    }

    if (!session?.user?.id) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Please login to view your donation history.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 w-11/12 mx-auto py-4">
            <DonationHistory history={history} role="user" />
        </div>
    );
};

export default DonationHistoryPage;
