
"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card } from "@heroui/react";

export interface AnalyticsData {
    month: string;
    donations: number;
    requests: number;
}

interface OverviewAnalyticsProps {
    data: AnalyticsData[];
}

const OverviewAnalytics = ({ data }: OverviewAnalyticsProps) => {
    return (
        <Card className="border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                    <h2 className="font-semibold text-[#1D2D44]">
                        Overview Analytics
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                        Monthly donations and help requests
                    </p>
                </div>

                <span className="rounded-lg bg-[#EAF4F1] px-3 py-2 text-xs font-medium text-[#0F6848]">
                    Last 6 Months
                </span>
            </div>

            <div className="h-[300px] w-full p-4">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="donationColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0F8B8D" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#0F8B8D" stopOpacity={0} />
                                </linearGradient>

                                <linearGradient id="requestColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E36414" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#E36414" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "1px solid #E5E7EB",
                                    fontSize: "12px",
                                }}
                            />

                            <Legend />

                            <Area
                                type="monotone"
                                dataKey="donations"
                                name="Donations"
                                stroke="#0F8B8D"
                                strokeWidth={2}
                                fill="url(#donationColor)"
                            />

                            <Area
                                type="monotone"
                                dataKey="requests"
                                name="Requests"
                                stroke="#E36414"
                                strokeWidth={2}
                                fill="url(#requestColor)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                        No analytics data available.
                    </div>
                )}
            </div>
        </Card>
    );
};

export default OverviewAnalytics;
