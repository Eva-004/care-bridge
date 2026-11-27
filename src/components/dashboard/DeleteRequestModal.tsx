"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { deleteHelpRequest } from "@/lib/fetchData";

interface DeleteRequestModalProps {
    request: {
        _id: string;
        title: string;
    };
}

const DeleteRequestModal = ({ request }: DeleteRequestModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        const res = await deleteHelpRequest(request._id);

        if (res.ok) {
            toast.success("Help request deleted successfully");
            setIsOpen(false);
            window.location.reload();
        } else {
            toast.error("Failed to delete help request");
        }

        setLoading(false);
    };

    return (
        <>
            <Button
                isIconOnly
                className="bg-white text-red-600 shadow-md"
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
                                    Delete Help Request?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p className="text-sm leading-6 text-gray-600">
                                    Are you sure you want to permanently delete{" "}
                                    <strong className="text-[#1D2D44]">
                                        {request.title}
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
                                    {loading ? "Deleting..." : "Delete Request"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    );
};

export default DeleteRequestModal;