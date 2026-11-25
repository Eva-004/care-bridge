
"use client";

import { useState } from "react";
import {
    Button,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { toast } from "react-toastify";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface EditUserModalProps {
    user: User;
}

const EditUserModal = ({ user }: EditUserModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState(user.role);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role }),
                }
            );

            if (!res.ok) {
                toast.error("Failed to update user");
            }

            setIsOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Failed to update user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                size="sm"
                className="bg-[#E8F3F4] text-[#0F4C5C]"
                onPress={() => setIsOpen(true)}
            >
                Edit
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading className="text-[#0F4C5C]">
                                    Edit User
                                </Modal.Heading>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update user role and account information.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4"
                                    >
                                        <TextField className="w-full">
                                            <Label>User Name</Label>
                                            <input
                                                value={user.name}
                                                disabled
                                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Email</Label>
                                            <input
                                                value={user.email}
                                                disabled
                                                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                                            />
                                        </TextField>

                                        <TextField className="w-full">
                                            <Label>Role</Label>
                                            <select
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#1D2D44] outline-none focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#E8F3F4]"
                                            >
                                                <option value="donor">Donor</option>
                                                <option value="user">Help Seeker /User</option>
                                            </select>
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
                                                isDisabled={loading || role === user.role}
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

export default EditUserModal;
