
"use client";
import PaymentHistoryCard, { Payment } from "@/components/donor/PaymentHistoryCard";
import { authClient } from "@/lib/auth-client";
import { getPayments } from "@/lib/fetchData";
import React, { useEffect, useState } from "react";
import { FiCreditCard, FiCheckCircle, FiDollarSign } from "react-icons/fi";


const PaymentHistoryPage = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);

    const userData = authClient.useSession();
    const user = userData.data?.user;

    useEffect(() => {
        if (!user?.email) return;

        const fetchPayments = async () => {
            try {
                setLoading(true);
                const data = await getPayments(user.email);
                setPayments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [user?.email]);

    const totalAmount = payments
        .filter((payment) => payment.status === "SUCCESS")
        .reduce((total, payment) => total + payment.amount, 0);

    const successfulPayments = payments.filter(
        (payment) => payment.status === "SUCCESS"
    ).length;

    const summary = [
        {
            title: "Total Payments",
            value: payments.length,
            icon: <FiCreditCard />,
            color: "bg-[#0F4C5C]/10 text-[#0F4C5C]",
        },
        {
            title: "Successful Payments",
            value: successfulPayments,
            icon: <FiCheckCircle />,
            color: "bg-green-50 text-green-600",
        },
        {
            title: "Total Amount Paid",
            value: `৳ ${totalAmount.toLocaleString("en-BD")}`,
            icon: <FiDollarSign />,
            color: "bg-orange-50 text-[#E36414]",
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-7">

                <div>
                    <h1 className="text-2xl font-bold text-[#1D2D44] sm:text-3xl">
                        Payment History
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Track and manage all your donation payments in one place.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {summary.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{item.title}</p>
                                    <h2 className="mt-2 text-2xl font-bold text-[#1D2D44]">
                                        {item.value}
                                    </h2>
                                </div>

                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${item.color}`}
                                >
                                    {item.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#1D2D44]">
                                Recent Transactions
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Your complete payment activity
                            </p>
                        </div>

                        <span className="rounded-full bg-[#0F4C5C]/10 px-3 py-1.5 text-xs font-semibold text-[#0F4C5C]">
                            {payments.length} Payments
                        </span>
                    </div>

                    {payments.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F4C5C]/10 text-3xl text-[#0F4C5C]">
                                <FiCreditCard />
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-[#1D2D44]">
                                No Payment History Yet
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                Your completed donation payments will appear here. Start
                                supporting someone in need to see your payment history.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {payments.map((payment) => (
                                <PaymentHistoryCard
                                    key={payment._id}
                                    payment={payment}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PaymentHistoryPage;
