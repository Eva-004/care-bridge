
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
    name: string;
    phone: string;
    category: string | { _id: string; name: string };
    urgency: string;
    description: string;
    supportType: string;
    amount?: string | number;
    needs?: string;
    location: string;
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
    const [name, setName] = useState(request.name || "");
    const [phone, setPhone] = useState(request.phone || "");
    const [category, setCategory] = useState(
        typeof request.category === "object"
            ? request.category?._id
            : request.category || ""
    );
    const [urgency, setUrgency] = useState(request.urgency || "normal");
    const [description, setDescription] = useState(request.description || "");
    const [supportType, setSupportType] = useState(request.supportType || "");
    const [amount, setAmount] = useState(String(request.amount || ""));
    const [needs, setNeeds] = useState(request.needs || "");
    const [location, setLocation] = useState(request.location || "");
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
                : {
                    name,
                    phone,
                    category,
                    urgency,
                    description,
                    supportType,
                    amount: supportType === "financial" ? amount : "",
                    needs: supportType === "in-kind" ? needs : "",
                    location,
                };

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
                                                <TextField isRequired>
                                                    <Label>Full Name</Label>
                                                    <input
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                    />
                                                </TextField>

                                                <TextField isRequired>
                                                    <Label>Contact Number</Label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
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

                                                <div>
                                                    <Label>Urgency Level</Label>
                                                    <select
                                                        required
                                                        value={urgency}
                                                        onChange={(e) => setUrgency(e.target.value)}
                                                        className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#0F4C5C]"
                                                    >
                                                        <option value="normal">Normal</option>
                                                        <option value="urgent">Urgent</option>
                                                        <option value="critical">Critical</option>
                                                    </select>
                                                </div>

                                                <TextField isRequired>
                                                    <Label>Description</Label>
                                                    <textarea
                                                        required
                                                        rows={4}
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                    />
                                                </TextField>

                                                <div>
                                                    <Label>Type of Support Needed</Label>
                                                    <select
                                                        required
                                                        value={supportType}
                                                        onChange={(e) => setSupportType(e.target.value)}
                                                        className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#0F4C5C]"
                                                    >
                                                        <option value="">Select support type</option>
                                                        <option value="financial">Financial Support</option>
                                                        <option value="in-kind">In-kind Support</option>
                                                    </select>
                                                </div>

                                                {supportType === "financial" && (
                                                    <TextField isRequired>
                                                        <Label>Required Amount (BDT)</Label>
                                                        <input
                                                            required
                                                            type="number"
                                                            min="1"
                                                            value={amount}
                                                            onChange={(e) => setAmount(e.target.value)}
                                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                        />
                                                    </TextField>
                                                )}

                                                {supportType === "in-kind" && (
                                                    <TextField isRequired>
                                                        <Label>What Do You Need?</Label>
                                                        <input
                                                            required
                                                            value={needs}
                                                            onChange={(e) => setNeeds(e.target.value)}
                                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                        />
                                                    </TextField>
                                                )}

                                                <TextField isRequired>
                                                    <Label>Location</Label>
                                                    <input
                                                        required
                                                        value={location}
                                                        onChange={(e) => setLocation(e.target.value)}
                                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C5C]"
                                                    />
                                                </TextField>
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
