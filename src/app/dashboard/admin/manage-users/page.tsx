
"use client";

import ManageUserTable from "@/components/user/ManageUserTable";
import { getUsers } from "@/lib/fetchData";
import { useEffect, useState } from "react";
import { FiUsers, FiUserCheck, FiHeart } from "react-icons/fi";


 export interface User {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
    createdAt: string;
}

const ManageUsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                const filterData = data.filter((dt: User) => dt.role !== "admin");
                setUsers(filterData);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const donors = users.filter((user) => user.role === "donor").length;
    const helpSeekers = users.filter((user) => user.role === "user").length;

    const stats = [
        {
            title: "Total Users",
            value: users.length,
            icon: <FiUsers size={22} />,
        },
        {
            title: "Donors",
            value: donors,
            icon: <FiHeart size={22} />,
        },
        {
            title: "Help Seekers",
            value: helpSeekers,
            icon: <FiUserCheck size={22} />,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-6">

                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                        <span>Admin Dashboard</span>
                        <span>/</span>
                        <span className="font-medium text-[#0F4C5C]">
                            Manage Users
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-[#1D2D44] sm:text-3xl">
                        Manage Users
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage donors, help seekers and administrators of CareBridge.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    {stat.title}
                                </p>
                                <h3 className="mt-2 text-2xl font-bold text-[#1D2D44]">
                                    {stat.value}
                                </h3>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F3F4] text-[#0F4C5C]">
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b border-gray-100 p-4 sm:p-5">
                        <h2 className="text-lg font-semibold text-[#0F4C5C]">
                            All Accounts
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            View and manage all registered CareBridge users.
                        </p>
                    </div>

                    <div className="p-4">
                        {loading ? (
                            <p className="py-8 text-center text-sm text-gray-500">
                                Loading users...
                            </p>
                        ) : (
                            <ManageUserTable users={users} />
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ManageUsersPage;
