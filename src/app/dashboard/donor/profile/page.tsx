"use client";

import { authClient } from "@/lib/auth-client";
import ProfileContent from "@/components/dashboard/ProfileContent";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";
import type { ProfileContentProps, UserProfile,UserRole } from "@/types/profile";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const user = session?.user;

    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
                <h2 className="text-xl font-semibold text-[#1D2D44]">
                    Please sign in to view your profile
                </h2>
                <button
                    onClick={() => router.push("/login")}
                    className="rounded-lg bg-[#0F4C5C] px-5 py-2.5 text-sm font-medium text-white"
                >
                    Sign In
                </button>
            </div>
        );
    }

    const roleSlug =
        "role" in user && typeof user.role === "string"
            ? user.role
            : "member";

    const profile: UserProfile = {
        _id: user.id,
        name: user.name,
        email: user.email,
        image: user.image || undefined,
        role: roleSlug,
        bio: "",
        phone: "",
        location: "",
        createdAt: new Date(user.createdAt).toISOString(),
    };

    const roles: UserRole[] = [
        {
            _id: roleSlug,
            name: roleSlug === "member" ? "Community Member" : roleSlug,
            slug: roleSlug,
            isActive: true,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <p className="text-sm font-medium text-[#E36414]">
                        Account Settings
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-[#1D2D44] md:text-3xl">
                        My Profile
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Manage your personal information and community profile.
                    </p>
                </div>

                <ProfileContent
                    profile={profile}
                    roles={roles}
                    isOwnProfile={true}
                />
            </div>
        </div>
    );
};

export default ProfilePage;