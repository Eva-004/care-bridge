
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Campaign } from "@/types/campaign";
import { getCampaignById } from "@/lib/fetchData";

const CampaignDetailsPage = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchCampaign = async () => {
        try {
            const data = await getCampaignById(id as string);
            setCampaign(data);
        } catch (error) {
            console.error("Failed to fetch campaign:", error);
        } finally {
            setLoading(false);
        }
    };

    if (id) fetchCampaign();
}, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center text-[#0F4C5C]">
                Loading campaign...
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
                <h2 className="text-2xl font-bold text-[#1D2D44]">
                    Campaign Not Found
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    This campaign may have been removed or does not exist.
                </p>
                <Link
                    href="/campaign"
                    className="mt-5 rounded-lg bg-[#0F4C5C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0B3D4A]"
                >
                    Back to Campaigns
                </Link>
            </div>
        );
    }

    const campaignDate = new Date(
        `${campaign.date.slice(0, 10)}T00:00:00`
    );

    const campaignTime = new Date(`2000-01-01T${campaign.time}`);

    return (
        <main className="min-h-screen bg-[#F8F9FA] px-5 py-10 md:py-14">
            <div className="mx-auto max-w-6xl">
                <Link
                    href="/campaigns"
                    className="mb-6 inline-flex items-center text-sm font-medium text-[#0F4C5C] hover:text-[#E36414]"
                >
                    ← Back to Campaigns
                </Link>

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    <div className="relative h-64 w-full bg-[#F1F5F5] md:h-[420px]">
                        {campaign.imageUrl && (
                            <Image
                                src={campaign.imageUrl}
                                alt={campaign.title}
                                fill
                                unoptimized
                                priority
                                sizes="(max-width: 768px) 100vw, 1200px"
                                className="object-cover"
                            />
                        )}
                    </div>

                    <div className="grid gap-8 p-6 md:grid-cols-[1fr_300px] md:p-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#E36414]">
                                CareBridge Campaign
                            </p>

                            <h1 className="mt-3 text-2xl font-bold text-[#1D2D44] md:text-4xl">
                                {campaign.title}
                            </h1>

                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-[#1D2D44]">
                                    About This Campaign
                                </h2>

                                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600 md:text-base">
                                    {campaign.description}
                                </p>
                            </div>
                        </div>

                        <div className="h-fit rounded-xl border border-gray-100 bg-[#F8F9FA] p-5">
                            <h2 className="mb-5 text-lg font-bold text-[#1D2D44]">
                                Campaign Information
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Date
                                    </p>
                                    <p className="mt-1 font-semibold text-[#1D2D44]">
                                        {campaignDate.toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Time
                                    </p>
                                    <p className="mt-1 font-semibold text-[#1D2D44]">
                                        {campaignTime.toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Location
                                    </p>
                                    <p className="mt-1 font-semibold text-[#1D2D44]">
                                        {campaign.location}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-200 pt-5">
                                <p className="text-sm leading-6 text-gray-500">
                                    Together, we can make a difference. Thank you
                                    for being part of the CareBridge community.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CampaignDetailsPage;
