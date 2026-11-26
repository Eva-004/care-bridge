
"use client";

import { useEffect, useState } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Pencil } from "@gravity-ui/icons";

interface EditProfileModalProps {
    user: {
        name?: string | null;
        phone?: string | null;
        location?: string | null;
        bio?: string | null;
    } | null | undefined;
    onUpdate: (formData: {
        name: string;
        phone: string;
        location: string;
        bio: string;
    }) => Promise<void>;
}

const EditProfileModal = ({ user, onUpdate }: EditProfileModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        location: user?.location || "",
        bio: user?.bio || "",
    });

    useEffect(() => {
        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            location: user?.location || "",
            bio: user?.bio || "",
        });
    }, [user]);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            await onUpdate(formData);
            toast.success("Profile updated successfully!");
            setIsOpen(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Profile update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <span
                onClick={() => setIsOpen(true)}
                className="flex size-9 items-center justify-center rounded-lg bg-white text-[#0F4C5C] shadow-md transition hover:bg-[#0F4C5C] hover:text-white"
            >
                <Pencil className="size-4" />
            </span>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md bg-[#FFFFFF]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-[#1D2D44]">
                                Edit Profile
                            </Modal.Heading>
                            <p className="text-sm text-[#1D2D44]/70">
                                Update your personal information.
                            </p>
                        </Modal.Header>
                        <form onSubmit={handleSubmit}>
                            <Modal.Body className="flex flex-col gap-4 p-6">
                                <TextField name="name">
                                    <Label>Name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        placeholder="Your name"
                                    />
                                </TextField>
                                <TextField name="phone">
                                    <Label>Phone Number</Label>
                                    <Input
                                        value={formData.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="Your phone number"
                                    />
                                </TextField>
                                <TextField name="location">
                                    <Label>Location</Label>
                                    <Input
                                        value={formData.location}
                                        onChange={(e) => handleChange("location", e.target.value)}
                                        placeholder="Your location"
                                    />
                                </TextField>
                                <TextField name="bio">
                                    <Label>About Me</Label>
                                    <Input
                                        value={formData.bio}
                                        onChange={(e) => handleChange("bio", e.target.value)}
                                        placeholder="Write something about yourself"
                                    />
                                </TextField>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onPress={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    isDisabled={loading}
                                    className="bg-[#0F4C5C] text-white hover:bg-[#1D2D44]"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditProfileModal;
