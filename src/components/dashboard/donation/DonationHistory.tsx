
"use client";

import { Card, Chip } from "@heroui/react";
import {
    FiCalendar,
    FiClock,
    FiCreditCard,
    FiHash,
    FiPhone,
    FiUser,
} from "react-icons/fi";

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

interface DonationHistoryProps {
    history: DonationHistoryItem[];
    role: "admin" | "user";
}

const DonationHistory = ({
    history,
    role,
}: DonationHistoryProps) => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-BD", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString("en-BD", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-[#E36414]">
                        {role === "admin" ? "Payment Records" : "Your Support"}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-[#0F4C5C]">
                        Donation History
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {role === "admin"
                            ? "Track all financial support sent to beneficiaries."
                            : "View the financial support you have received."}
                    </p>
                </div>

                <Chip className="w-fit bg-[#E8F3F4] text-[#0F4C5C]">
                    {history.length} Payments
                </Chip>
            </div>

            {history.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {history.map((item) => (
                        <Card
                            key={item._id}
                            className="w-full border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F3F4] text-[#0F4C5C]">
                                        <FiCreditCard size={21} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            {role === "admin"
                                                ? "Financial Support Sent To"
                                                : "Received Financial Support"}
                                        </p>

                                        <h3 className="mt-1 truncate font-semibold text-[#1D2D44]">
                                            {item.userName}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 sm:justify-end">
                                    <div className="sm:text-right">
                                        <p className="text-xs text-gray-500">
                                            Amount
                                        </p>

                                        <h3 className="mt-1 text-xl font-bold text-[#0F4C5C]">
                                            ৳{Number(item.amount).toLocaleString("en-BD")}
                                        </h3>
                                    </div>

                                    <Chip
                                        size="sm"
                                        className={
                                            item.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }
                                    >
                                        {item.status}
                                    </Chip>
                                </div>
                            </div>

                            <div className="my-4 border-t border-dashed border-gray-200" />

                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex items-start gap-2">
                                    <FiCreditCard className="mt-0.5 shrink-0 text-[#E36414]" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Payment Method
                                        </p>

                                        <p className="mt-1 break-words text-sm font-medium capitalize text-[#1D2D44]">
                                            {item.paymentMethod}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <FiUser className="mt-0.5 shrink-0 text-[#E36414]" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Beneficiary
                                        </p>

                                        <p className="mt-1 break-words text-sm font-medium text-[#1D2D44]">
                                            {item.userName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <FiHash className="mt-0.5 shrink-0 text-[#E36414]" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Transaction ID
                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-[#1D2D44]">
                                            {item.transactionId}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <FiPhone className="mt-0.5 shrink-0 text-[#E36414]" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Sender Number
                                        </p>

                                        <p className="mt-1 break-words text-sm font-medium text-[#1D2D44]">
                                            {item.senderNumber}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <FiCalendar className="mt-0.5 shrink-0 text-[#E36414]" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Payment Date
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#1D2D44]">
                                            {formatDate(item.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2">
                                    <FiClock className="mt-0.5 shrink-0 text-[#E36414]" />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Payment Time
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#1D2D44]">
                                            {formatTime(item.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="flex w-full flex-col items-center justify-center border border-dashed border-gray-200 bg-white px-5 py-16 text-center shadow-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F3F4] text-[#0F4C5C]">
                        <FiCreditCard size={28} />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-[#1D2D44]">
                        No Donation History Found
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-gray-500">
                        {role === "admin"
                            ? "Payment records will appear here when financial support is sent to beneficiaries."
                            : "You have not received any financial support yet."}
                    </p>
                </Card>
            )}
        </div>
    );
};

export default DonationHistory;
