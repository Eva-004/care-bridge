
"use client";

import { useState } from "react";
import {
    Button,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { Pencil } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/upload";
import type { Campaign } from "@/types/campaign";

interface EditCampaignModalProps {
    campaign: Campaign;
}

const EditCampaignModal = ({ campaign }: EditCampaignModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(campaign.title);
    const [description, setDescription] = useState(campaign.description);
    const [date, setDate] = useState(campaign.date.slice(0, 10));
    const [time, setTime] = useState(campaign.time);
    const [location, setLocation] = useState(campaign.location);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            let imageUrl = campaign.imageUrl;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaign._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        date,
                        time,
                        location,
                        imageUrl,
                    }),
                }
            );

            if (!res.ok) {
                toast.error("Failed to update campaign");
                return;
            }

            toast.success("Campaign updated successfully");
            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Failed to update campaign:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                isIconOnly

                className="bg-white text-[#0F4C5C] shadow-md"
                onPress={() => setIsOpen(true)}
            >
                <Pencil className="size-4" />
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-lg">
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading className="text-[#0F4C5C]">
                                    Edit Campaign
                                </Modal.Heading>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update campaign information.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4"
                                    >
                                        <TextField className="w-full">
                                            <Label>Campaign Title</Label>
                                            <input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Description</Label>
                                            <textarea
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows={3}
                                                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                            />
                                        </TextField>

                                        <div className="grid grid-cols-2 gap-3">
                                            <TextField className="w-full">
                                                <Label>Date</Label>
                                                <input
                                                    type="date"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                />
                                            </TextField>

                                            <TextField className="w-full">
                                                <Label>Time</Label>
                                                <input
                                                    type="time"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                />
                                            </TextField>
                                        </div>

                                        <TextField className="w-full">
                                            <Label>Location</Label>
                                            <input
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Campaign Image</Label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setImageFile(e.target.files?.[0] || null)
                                                }
                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                            />
                                        </TextField>

                                        <Modal.Footer className="px-0 pb-0">
                                            <Button
                                                variant="outline"
                                                onPress={() => setIsOpen(false)}
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                                type="submit"
                                                isDisabled={loading}
                                                className="bg-[#E36414] text-white"
                                            >
                                                {loading ? "Saving..." : "Save Changes"}
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </>
    );
};

export default EditCampaignModal;
