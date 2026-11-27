
"use client";

import { useEffect, useState } from "react";
import { Button, Label, Modal, Surface, TextField } from "@heroui/react";
import { Pencil } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { getCategories, updateHelpRequest } from "@/lib/fetchData";

interface Category {
    _id: string;
    name: string;
}

interface HelpRequestData {
    _id: string;
    title?: string;
    description?: string;
    category?: string | { _id: string; name: string };
    status: string;
}

interface EditHelpRequestModalProps {
    request: HelpRequestData;
    role: "admin" | "user";
}

const EditHelpRequestModal = ({
    request,
    role,
}: EditHelpRequestModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [title, setTitle] = useState(request.title || "");
    const [description, setDescription] = useState(request.description || "");
    const [category, setCategory] = useState(
        typeof request.category === "object"
            ? request.category?._id
            : request.category
    );
    const [status, setStatus] = useState(request.status);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const updateData =
            role === "admin"
                ? { status }
                : { title, category };

        const res = await updateHelpRequest(request._id, updateData);

        if (res.ok) {
            toast.success("Help request updated successfully");
            setIsOpen(false);
            window.location.reload();
        } else {
            toast.error("Failed to update help request");
        }

        setLoading(false);
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
                                    Edit Help Request
                                </Modal.Heading>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update help request information.
                                </p>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-4"
                                    >
                                        {role === "user" ? (
                                            <>
                                                <TextField className="w-full">
                                                    <Label>Request Title</Label>
                                                    <input
                                                        required
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                    />
                                                </TextField>

                                                <TextField className="w-full">
                                                    <Label>Description</Label>
                                                    <textarea
                                                        required
                                                        rows={3}
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                    />
                                                </TextField>

                                                <div>
                                                    <Label>Help Category</Label>
                                                    <select
                                                        required
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#0F4C5C]"
                                                    >
                                                        <option value="">Select category</option>
                                                        {categories.map((item) => (
                                                            <option key={item._id} value={item._id}>
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <Label>Request Status</Label>
                                                <select
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#0F4C5C]"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            </div>
                                        )}

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

export default EditHelpRequestModal;
