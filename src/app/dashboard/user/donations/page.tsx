'use client'
import MyDonationsTable from "@/components/donor/MyDonationsTable";
import React, { useState } from "react";


const MyDonationsPage = () => {
    const [donationCount, setDonationCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    return (
        <div className="w-11/12 mx-auto space-y-6 py-6">
            <div>
                <h1 className="text-2xl font-bold text-[#1D2D44]">
                    My Donations
                </h1>
                <p className="mt-1 text-sm text-[#1D2D44]/70">
                    Track your donations and see how you are helping others.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#0F4C5C]/15 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-[#1D2D44]/70">
                        Total Donations
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-[#0F4C5C]">
                       {donationCount}
                    </h2>
                </div>

                <div className="rounded-xl border border-[#0F4C5C]/15 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-[#1D2D44]/70">
                        Total Amount Donated
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-[#E36414]">
                        ৳ {totalAmount}
                    </h2>
                </div>
            </div>

            <div className="rounded-xl border border-[#0F4C5C]/15 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#1D2D44]">
                        Donation Details
                    </h2>
                    <p className="mt-1 text-sm text-[#1D2D44]/70">
                        A record of all your contributions.
                    </p>
                </div>

                <MyDonationsTable setDonationCount={setDonationCount}setTotalAmount={setTotalAmount} />
            </div>
        </div>
    );
};

export default MyDonationsPage;
