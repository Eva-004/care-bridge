
"use client";
import HelpRequestTable from "./HelpRequestTable";

interface HelpRequest {
     _id: string;
    name: string;
    phone: string;
    category: string | { _id: string; name: string };
    urgency: string;
    description: string;
    supportType: string;
    amount?: string | number;
    needs?: string;
    location: string;
    status: string;
    createdAt: string;
}

interface HelpRequestProps {
    requests: HelpRequest[];
    role: "admin" | "user";
}

const HelpRequest = ({
    requests,
    role,
}: HelpRequestProps) => {
    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-2xl font-semibold text-[#1D2D44]">
                    {role === "admin" ? "Manage Help Requests" : "My Help Requests"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    {role === "admin"
                        ? "Review and manage all help requests."
                        : "View and manage your submitted help requests."}
                </p>
            </div>

            <HelpRequestTable
                requests={requests}
                role={role}
            />
        </div>
    );
};

export default HelpRequest;
