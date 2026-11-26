
"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { HiOutlineCamera } from "react-icons/hi2";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/upload";

interface ProfilePictureProps {
    image?: string;
    name?: string;
    onImageChange?: (imageUrl: string) => void | Promise<void>;
}

const ProfilePicture = ({ image, name, onImageChange }: ProfilePictureProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState(image || "");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setPreview(image || "");
    }, [image]);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image");
            return;
        }

        try {
            setUploading(true);

            const imageUrl = await uploadImage(file);
            await onImageChange?.(imageUrl);

            setPreview(imageUrl);
            toast.success("Profile picture updated successfully!");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update profile picture");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    return (
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-[#F8F9FA]">
            {preview ? (
                <Image src={preview} alt={name || "Profile"} fill className="object-cover" unoptimized />
            ) : (
                <span className="text-4xl font-bold text-[#0F4C5C]">
                    {name?.charAt(0)?.toUpperCase() || "U"}
                </span>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#0F4C5C] text-white transition hover:bg-[#E36414] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {uploading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    <HiOutlineCamera size={17} />
                )}
            </button>
        </div>
    );
};

export default ProfilePicture;
