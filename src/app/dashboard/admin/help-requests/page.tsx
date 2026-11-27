
"use client";

import { useEffect, useState } from "react";
import { FiClock, FiCheckCircle, FiCheck} from "react-icons/fi";
import HelpRequest from "@/components/dashboard/helpRequests/HelpRequest";
import { getRequests } from "@/lib/fetchData";

interface Request {
    _id: string;
    status: string;
    supportType: string;
    urgency: string;
    createdAt: string;
}

const HelpRequestManagePage = () => {
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const data = await getRequests();
            setRequests(data);
        };

        fetchRequests();
    }, []);

    const pending = requests.filter(
        (request) => request.status === "pending"
    ).length;

    const approved = requests.filter(
        (request) => request.status === "approved"
    ).length;

    const completed = requests.filter(
        (request) => request.status === "completed"
    ).length;

    const stats = [
        {
            title: "Pending Requests",
            count: pending,
            icon: <FiClock size={20} />,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
        {
            title: "Approved Requests",
            count: approved,
            icon: <FiCheckCircle size={20} />,
            color: "text-[#0F4C5C]",
            bg: "bg-[#E8F3F4]",
        },
        {
            title: "Completed Requests",
            count: completed,
            icon: <FiCheck size={20} />,
            color: "text-green-600",
            bg: "bg-green-50",
        },
    ];

    return (
        <div className="space-y-6 w-11/12 mx-auto py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                    >
                        <div>
                            <p className="text-sm text-gray-500">
                                {stat.title}
                            </p>
                            <h3 className="mt-2 text-2xl font-bold text-[#1D2D44]">
                                {stat.count}
                            </h3>
                        </div>

                        <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <HelpRequest
                requests={requests}
                role="admin"
            />
        </div>
    );
};

export default HelpRequestManagePage;
