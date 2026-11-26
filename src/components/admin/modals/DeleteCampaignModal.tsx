
"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import type { Campaign } from "@/types/campaign";

interface DeleteCampaignModalProps {
    campaign: Campaign;
}

const DeleteCampaignModal = ({ campaign }: DeleteCampaignModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns/${campaign._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete campaign");
            }

            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete campaign:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                isIconOnly
                className="bg-white text-[#D35400] shadow-md"
                onPress={() => setIsOpen(true)}
            >
                <TrashBin className="size-4" />
            </Button>

            <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading className="text-[#1D2D44]">
                                    Delete Campaign?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p className="text-sm leading-6 text-gray-600">
                                    Are you sure you want to permanently delete{" "}
                                    <strong className="text-[#1D2D44]">
                                        {campaign.title}
                                    </strong>
                                    ? This action cannot be undone.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    variant="outline"
                                    onPress={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="danger"
                                    isDisabled={loading}
                                    onPress={handleDelete}
                                >
                                    {loading ? "Deleting..." : "Delete Campaign"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    );
};

export default DeleteCampaignModal;
