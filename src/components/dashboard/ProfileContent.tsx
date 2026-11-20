
"use client";

import { Avatar, Button, Card, Chip } from "@heroui/react";
import { FiEdit2, FiMapPin, FiMail, FiPhone, FiCalendar, FiUsers, FiCamera } from "react-icons/fi";
import type { ProfileContentProps } from "@/types/profile";

interface InfoProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const ProfileContent = ({ profile, roles, isOwnProfile, onEdit }: ProfileContentProps) => {
    const role = roles.find((item) => item.slug === profile.role);
    const memberSince = new Date(profile.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            <Card className="overflow-hidden border border-gray-100 shadow-sm">
                <div className="h-40 bg-gradient-to-r from-[#0F4C5C] to-[#1D7180] sm:h-56" />
                <div className="px-5 pb-6 sm:px-8">
                    <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                            <div className="relative w-fit">
                                <Avatar className="h-28 w-28">
                                    <Avatar.Image
                                        src={profile.image || ""}
                                        alt={profile.name}
                                    />
                                    <Avatar.Fallback>
                                        {profile.name?.charAt(0).toUpperCase()}
                                    </Avatar.Fallback>
                                </Avatar>

                                {isOwnProfile && (
                                    <>
                                        <input
                                            type="file"
                                            id="profile-image"
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="profile-image"
                                            className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#E36414] text-white shadow-md transition hover:bg-[#c9550e]"
                                        >
                                            <FiCamera size={16} />
                                        </label>
                                    </>
                                )}
                            </div>

                            <div className="pb-1">
                                <h1 className="text-2xl font-bold text-[#1D2D44]">{profile.name}</h1>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <Chip size="sm" color="success">{role?.name || "Member"}</Chip>
                                    <span className="text-xs text-gray-400">Member since {memberSince}</span>
                                </div>
                            </div>
                        </div>
                        {isOwnProfile ? (
                            <Button onPress={onEdit} className="flex items-center gap-2 bg-[#0F4C5C] text-white">
                                <FiEdit2 /> Edit Profile
                            </Button>
                        ) : null}
                    </div>
                    {profile.bio && <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600">{profile.bio}</p>}
                </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border border-gray-100 md:col-span-2">
                    <div className="space-y-5 p-5 sm:p-6">
                        <div>
                            <h2 className="text-lg font-bold text-[#1D2D44]">About</h2>
                            <p className="mt-1 text-sm text-gray-500">Personal information and profile details.</p>
                        </div>
                        <div className="border-t border-gray-100" />
                        <div className="grid gap-5 sm:grid-cols-2">
                            {profile.location && <Info icon={<FiMapPin />} label="Location" value={profile.location} />}
                            {isOwnProfile && (
                                <>
                                    <Info icon={<FiMail />} label="Email" value={profile.email} />
                                    <Info icon={<FiPhone />} label="Phone" value={profile.phone || "Not provided"} />
                                </>
                            )}
                            <Info icon={<FiCalendar />} label="Joined" value={memberSince} />
                            <Info icon={<FiUsers />} label="Community Role" value={role?.name || "Member"} />
                        </div>
                    </div>
                </Card>

                <Card className="border border-gray-100">
                    <div className="flex flex-col gap-4 p-5 sm:p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E36414]/10 text-2xl text-[#E36414]">
                            <FiUsers />
                        </div>
                        <h2 className="text-lg font-bold text-[#1D2D44]">{role?.name || "Community Member"}</h2>
                        <p className="text-sm leading-6 text-gray-500">A member of the CareBridge community, helping build a better and more supportive community.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const Info = ({ icon, label, value }: InfoProps) => (
    <div className="flex items-center gap-3">
        <span className="text-lg text-[#0F4C5C]">{icon}</span>
        <div className="min-w-0">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="break-words text-sm font-medium text-[#1D2D44]">{value}</p>
        </div>
    </div>
);

export default ProfileContent;
