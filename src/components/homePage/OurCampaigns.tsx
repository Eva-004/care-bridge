
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getCampaigns } from "@/lib/fetchData";
import type { Campaign } from "@/types/campaign";
import CampaignCard from "../cards/CampaignCard";

const OurCampaigns = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcomingCampaigns = async () => {
            try {
                const data = await getCampaigns();
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcoming = data
                    .filter((campaign: Campaign) => {
                        const campaignDate = new Date(
                            `${campaign.date.slice(0, 10)}T00:00:00`
                        );

                        return campaignDate >= today;
                    })
                    .sort(
                        (a: Campaign, b: Campaign) =>
                            new Date(a.date.slice(0, 10)).getTime() -
                            new Date(b.date.slice(0, 10)).getTime()
                    )
                    .slice(0, 3);

                setCampaigns(upcoming);
            } catch (error) {
                console.error("Failed to fetch campaigns:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingCampaigns();
    }, []);

    return (
        <section className="bg-white w-11/12 mx-auto px-4 py-8 mb-4">
            <div >
                <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div className="text-center max-w-3xl mx-auto">

                        <h2 className="text-3xl font-bold leading-tight text-[#0F4C5C] md:text-4xl">
                            Our Campaigns
                        </h2>

                        <p className="mt-3 leading-7 text-[#1D2D44]/65">
                            Every small act of kindness can make a big difference.
                            Explore our upcoming campaigns and be part of something meaningful.
                        </p>
                    </div>

                    <Link
                        href="/campaigns"
                        className="group flex w-fit items-center gap-2 rounded-lg border border-[#0F4C5C] px-5 py-3 text-sm font-semibold text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
                    >
                        View All Campaigns
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-[390px] animate-pulse rounded-xl bg-gray-100"
                            />
                        ))}
                    </div>
                ) : campaigns.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {campaigns.map((campaign) => (
                            <CampaignCard
                                key={campaign._id}
                                campaign={campaign}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-[#F8F9FA] px-5 py-16 text-center">
                        <h3 className="text-lg font-semibold text-[#0F4C5C]">
                            No Upcoming Campaigns
                        </h3>
                        <p className="mt-2 text-sm text-[#1D2D44]/60">
                            New campaigns will appear here. Stay connected!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OurCampaigns;
