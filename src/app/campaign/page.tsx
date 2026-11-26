
"use client";

import { useEffect, useState } from "react";
import { getCampaigns } from "@/lib/fetchData";
import type { Campaign } from "@/types/campaign";
import CampaignCard from "@/components/cards/CampaignCard";

const CampaignsPage = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const data = await getCampaigns();
                setCampaigns(data);
            } catch (error) {
                console.error("Failed to fetch campaigns:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const today = new Date();
    const todayDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const upcomingCampaigns = campaigns.filter(
        (campaign) => campaign.date.slice(0, 10) >= todayDate
    );

    const completedCampaigns = campaigns.filter(
        (campaign) => campaign.date.slice(0, 10) < todayDate
    );

    return (
        <main className="min-h-screen w-11/12 mx-auto bg-[#F8F9FA] py-8">
            <section className="bg-[#0F4C5C] px-5 py-8 text-center text-white md:py-20">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#FB8B24]">
                        CareBridge Campaigns
                    </p>

                    <h1 className="text-3xl font-bold md:text-5xl">
                        Together, We Can Make a Difference
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-200 md:text-base">
                        Join our campaigns and be a part of meaningful changes.
                        Every small effort can bring hope to someone`s life.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
                {loading ? (
                    <p className="py-16 text-center text-[#0F4C5C]">
                        Loading campaigns...
                    </p>
                ) : (
                    <div className="space-y-16">
                        <div>
                            <div className="mb-7">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#E36414]">
                                    Join Us
                                </p>
                                <h2 className="text-2xl font-bold text-[#1D2D44] md:text-3xl">
                                    Upcoming Campaigns
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Explore our upcoming events and be part of the change.
                                </p>
                            </div>

                            {upcomingCampaigns.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {upcomingCampaigns.map((campaign) => (
                                        <CampaignCard
                                            key={campaign._id}
                                            campaign={campaign}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
                                    <p className="font-medium text-[#1D2D44]">
                                        No upcoming campaigns
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        New campaigns will be announced soon.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="mb-7">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#E36414]">
                                    Our Journey
                                </p>
                                <h2 className="text-2xl font-bold text-[#1D2D44] md:text-3xl">
                                    Completed Campaigns
                                </h2>
                                <p className="mt-2 text-sm text-gray-500">
                                    Look back at the campaigns where we made a difference together.
                                </p>
                            </div>

                            {completedCampaigns.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {completedCampaigns.map((campaign) => (
                                        <CampaignCard
                                            key={campaign._id}
                                            campaign={campaign}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
                                    <p className="font-medium text-[#1D2D44]">
                                        No completed campaigns yet
                                    </p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Our campaign journey is just getting started.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default CampaignsPage;
