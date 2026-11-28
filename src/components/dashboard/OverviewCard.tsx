import { Card } from "@heroui/react";
import { ReactNode } from "react";

interface OverviewCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    color: string;
}

const OverviewCard = ({ title, value, icon, color }: OverviewCardProps) => {
    return (
        <Card  className="border border-gray-100 shadow-sm">
            <div className="flex flex-row items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                    {icon}
                </div>

                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h2 className="text-2xl font-bold text-[#1D2D44]">
                        {value}
                    </h2>
                </div>
            </div>
        </Card>
    );
};

export default OverviewCard;