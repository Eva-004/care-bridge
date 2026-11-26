
"use client";

import AddCampaignModal from "@/components/admin/modals/AddCampaignModal";
import CampaignCard from "@/components/cards/CampaignCard";
import { getCampaigns } from "@/lib/fetchData";
import type { Campaign } from "@/types/campaign";
import { useEffect, useState } from "react";

const CampaignsPage = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const data = await getCampaigns();
                setCampaigns(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const today = new Date();
    const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const upcomingCampaigns = campaigns.filter(
        (campaign) => campaign.date.slice(0, 10) >= todayDate
    );

    const completedCampaigns = campaigns.filter(
        (campaign) => campaign.date.slice(0, 10) < todayDate
    );
    return (
        <div className="min-h-full space-y-8 bg-[#F8F9FA] p-4 sm:p-6 lg:p-8">

            <div className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-6 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#E36414]">
                        Donation Management
                    </p>
                    <h1 className="text-2xl font-bold text-[#1D2D44]">
                        Campaigns
                    </h1>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                        Create and manage monthly donation campaigns to support
                        people with their daily needs.
                    </p>
                </div>

                <AddCampaignModal />
            </div>

            <section>
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#1D2D44]">
                            Upcoming Campaigns
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Your scheduled donation campaigns.
                        </p>
                    </div>

                    <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-[#E36414]">
                        Upcoming
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {upcomingCampaigns.map((campaign) => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
                </div>

            </section>

            <section className="border-t border-gray-200 pt-8">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#1D2D44]">
                            Previous Campaigns
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Your previously completed donation campaigns.
                        </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
                        Completed
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {completedCampaigns.map((campaign) => (
                        <CampaignCard key={campaign._id} campaign={campaign} />
                    ))}
                </div>

            </section>

        </div>
    );
};

export default CampaignsPage;
