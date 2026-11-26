
import Image from "next/image";
import { Card } from "@heroui/react";
import { Campaign } from "@/types/campaign";
import Link from "next/link";

interface CampaignCardProps {
    campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
    return (
        <Card className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
            <div className="relative h-40 w-full bg-[#F1F5F5]">
                {campaign.imageUrl && (
                    <Image
                        src={campaign.imageUrl}
                        alt={campaign.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                )}
            </div>

            <Card.Content className="gap-2.5 p-4">
                <Card.Title className="line-clamp-1 text-base font-semibold text-[#1D2D44]">
                    {campaign.title}
                </Card.Title>

                <Card.Description className="line-clamp-2 text-sm leading-5 text-gray-500">
                    {campaign.description}
                </Card.Description>

                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
                    <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="mt-1 text-sm font-medium text-[#1D2D44]">
                            {new Date(`${campaign.date.slice(0, 10)}T00:00:00`).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="mt-1 text-sm font-medium text-[#1D2D44]">
                            {new Date(`2000-01-01T${campaign.time}`).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="mt-1 truncate text-sm font-medium text-[#1D2D44]">
                            {campaign.location}
                        </p>
                    </div>
                </div>
                <Link
                    href={`/campaigns/${campaign._id}`}
                    className="mt-2 flex w-full items-center justify-center rounded-lg bg-[#0F4C5C] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0B3D4A]"
                >
                    View Details
                </Link>
            </Card.Content>
        </Card>
    );
};

export default CampaignCard;
