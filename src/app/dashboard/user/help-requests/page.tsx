"use client";

import { useEffect, useState } from "react";
import HelpRequest from "@/components/dashboard/helpRequests/HelpRequest";
import { authClient } from "@/lib/auth-client";
import { getMyRequests, getRequestById } from "@/lib/fetchData";
import { FiCheckCircle, FiFileText, FiXCircle } from "react-icons/fi";

interface HelpRequestData {
    _id: string;
    userId: string;
    supportType: string;
    urgency: string;
    status: string;
    createdAt: string;
}

const MyHelpRequestPage = () => {
    const [requests, setRequests] = useState<HelpRequestData[]>([]);
    const { data: session } = authClient.useSession();
       const user = session?.user;
    useEffect(() => {
        const fetchRequests = async () => {
            if (!user?.id) return;

            const data = await getMyRequests(user.id);
            setRequests(data);
        };

        fetchRequests();
    }, [user?.id]);

    const totalRequests = requests.length;

    const approvedRequests = requests.filter(
        (request) => request.status === "approved"
    ).length;
    const rejectedRequests = requests.filter(
        (request) => request.status === "rejected"
    ).length;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div>
                        <p className="text-sm text-gray-500">Total Requests</p>
                        <h3 className="mt-2 text-2xl font-bold text-[#1D2D44]">
                            {totalRequests}
                        </h3>
                    </div>
                    <div className="rounded-xl bg-[#E8F3F4] p-3 text-[#0F4C5C]">
                        <FiFileText size={22} />
                    </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div>
                        <p className="text-sm text-gray-500">Approved Requests</p>
                        <h3 className="mt-2 text-2xl font-bold text-[#1D2D44]">
                            {approvedRequests}
                        </h3>
                    </div>
                    <div className="rounded-xl bg-green-50 p-3 text-green-600">
                        <FiCheckCircle size={22} />
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div>
                        <p className="text-sm text-gray-500">Rejected Requests</p>
                        <h3 className="mt-2 text-2xl font-bold text-[#1D2D44]">
                            {rejectedRequests}
                        </h3>
                    </div>
                    <div className="rounded-xl bg-red-50 p-3 text-red-600">
                        <FiXCircle size={22} />
                    </div>
                </div>
            </div>

            <HelpRequest requests={requests} role="user" />
        </div>
    );

};

export default MyHelpRequestPage;