
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiArrowRight } from "react-icons/fi";

interface Campaign {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    time: string;
    location: string;
}

interface ActiveCampaignsProps {
    campaigns: Campaign[];
}

const ActiveCampaigns = ({ campaigns }: ActiveCampaignsProps) => {
    return (
        <Card className="border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-[#1D2D44]">
                        Active Campaigns
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                        Upcoming campaigns
                    </p>
                </div>

                <Link
                    href="/campaigns"
                    className="flex items-center gap-1 text-sm font-semibold text-[#0F6848] hover:text-[#E36414]"
                >
                    View All
                    <FiArrowRight size={16} />
                </Link>
            </div>

            {campaigns.length === 0 ? (
                <div className="flex min-h-[250px] flex-col items-center justify-center px-5 text-center">
                    <FiCalendar size={32} className="text-gray-300" />
                    <h3 className="mt-3 font-semibold text-[#1D2D44]">
                        No Upcoming Campaigns
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        New campaigns will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4 p-5">
                    {campaigns.slice(0, 3).map((campaign) => (
                        <div
                            key={campaign._id}
                            className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                        >
                            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#EAF4F1]">
                                {campaign.imageUrl && (
                                    <Image
                                        src={campaign.imageUrl}
                                        alt={campaign.title}
                                        fill
                                        sizes="96px"
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-[#0F6848]">
                                    Upcoming
                                </span>

                                <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-[#1D2D44]">
                                    {campaign.title}
                                </h3>

                                <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                    <FiCalendar className="shrink-0 text-[#0F6848]" />
                                    {new Date(campaign.date).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default ActiveCampaigns;
