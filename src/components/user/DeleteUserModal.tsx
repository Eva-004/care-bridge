
"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";

interface User {
    _id: string;
    name: string;
}

interface DeleteUserModalProps {
    user: User;
}

const DeleteUserModal = ({ user }: DeleteUserModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user._id}`,
                {
                    method: "DELETE",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to delete user");
            }

            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Failed to delete user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                size="sm"
                className="bg-[#FFF1E8] text-[#D35400]"
                onPress={() => setIsOpen(true)}
            >
                Delete
            </Button>

            <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading className="text-[#1D2D44]">
                                    Delete User?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p className="text-sm leading-6 text-gray-600">
                                    Are you sure you want to permanently delete{" "}
                                    <strong className="text-[#1D2D44]">
                                        {user.name}
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
                                    {loading ? "Deleting..." : "Delete User"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    );
};

export default DeleteUserModal;
