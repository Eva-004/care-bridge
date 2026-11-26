
"use client";

import { uploadImage } from "@/lib/upload";
import { Plus } from "@gravity-ui/icons";
import {
    Button,
    Calendar,
    DateField,
    DatePicker,
    type DateValue,
    Input,
    Label,
    Modal,
    TextArea,
    TextField,
    useOverlayState,
} from "@heroui/react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

const AddCampaignModal = () => {
    const modal = useOverlayState();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [campaignDate, setCampaignDate] = useState<DateValue | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [campaignTime, setCampaignTime] = useState("");
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setLocation("");
        setCampaignDate(null);
        setImageFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);

            const imageUrl = imageFile ? await uploadImage(imageFile) : "";

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/campaigns`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title,
                        description,
                        imageUrl,
                        date: campaignDate?.toString(),
                        time: campaignTime,
                        location,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create campaign");
            }

            toast.success("Campaign created successfully!");
            resetForm();
            modal.close();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create campaign"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal state={modal}>
            <Button
                className="flex items-center gap-2 rounded-lg bg-[#0F4C5C] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0b3c49]"
            >
                <Plus />
                Add New Campaign
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-[#FFF1E6] text-[#E36414]">
                                <Plus className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Add New Campaign</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-gray-500">
                                Add details about your upcoming donation campaign.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                            >
                                <TextField className="w-full gap-1.5 sm:col-span-2" name="title">
                                    <Label className="text-sm font-medium text-[#1D2D44]">
                                        Campaign Title
                                    </Label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Winter Food Distribution"
                                        className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm"
                                    />
                                </TextField>

                                <TextField className="w-full gap-1.5 sm:col-span-2" name="description">
                                    <Label className="text-sm font-medium text-[#1D2D44]">
                                        Description
                                    </Label>
                                    <TextArea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        placeholder="Describe the purpose of this campaign..."
                                        className="min-h-24 resize-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm"
                                    />
                                </TextField>

                                <TextField className="w-full gap-1.5 sm:col-span-2" name="image">
                                    <Label className="text-sm font-medium text-[#1D2D44]">
                                        Campaign Image
                                    </Label>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="h-12 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#FFF1E6] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#E36414]"
                                    />

                                    {imageFile && (
                                        <p className="truncate text-xs text-gray-500">
                                            Selected: {imageFile.name}
                                        </p>
                                    )}
                                </TextField>

                                <div className="w-full">
                                    <DatePicker
                                        value={campaignDate}
                                        onChange={setCampaignDate}
                                        className="w-full"
                                    >
                                        <Label className="text-sm font-medium text-[#1D2D44]">
                                            Campaign Date
                                        </Label>
                                        <DateField.Group className="mt-1 flex h-11 items-center rounded-lg border border-gray-200 bg-white px-3">
                                            <DateField.Input>
                                                {(segment) => (
                                                    <DateField.Segment segment={segment} />
                                                )}
                                            </DateField.Input>
                                            <DateField.Suffix>
                                                <DatePicker.Trigger className="ml-auto flex items-center">
                                                    <DatePicker.TriggerIndicator />
                                                </DatePicker.Trigger>
                                            </DateField.Suffix>
                                        </DateField.Group>

                                        <DatePicker.Popover className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
                                            <Calendar aria-label="Select campaign date">
                                                <Calendar.Header className="flex items-center justify-between pb-3">
                                                    <Calendar.YearPickerTrigger>
                                                        <Calendar.YearPickerTriggerHeading />
                                                        <Calendar.YearPickerTriggerIndicator />
                                                    </Calendar.YearPickerTrigger>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar.NavButton slot="previous" />
                                                        <Calendar.NavButton slot="next" />
                                                    </div>
                                                </Calendar.Header>
                                                <Calendar.Grid>
                                                    <Calendar.GridHeader>
                                                        {(day) => (
                                                            <Calendar.HeaderCell>
                                                                {day}
                                                            </Calendar.HeaderCell>
                                                        )}
                                                    </Calendar.GridHeader>
                                                    <Calendar.GridBody>
                                                        {(date) => (
                                                            <Calendar.Cell date={date} />
                                                        )}
                                                    </Calendar.GridBody>
                                                </Calendar.Grid>
                                            </Calendar>
                                        </DatePicker.Popover>
                                    </DatePicker>
                                </div>

                                <TextField className="w-full gap-1.5">
                                    <Label className="text-sm font-medium text-[#1D2D44]">
                                        Campaign Time
                                    </Label>
                                    <Input
                                        type="time"
                                        value={campaignTime}
                                        onChange={(e) => setCampaignTime(e.target.value)}
                                        className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm"
                                    />
                                </TextField>

                                <TextField className=" gap-1.5" name="location">
                                    <Label className="text-sm font-medium text-[#1D2D44]">
                                        Location
                                    </Label>
                                    <Input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="e.g. Sylhet, Bangladesh"
                                        className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm"
                                    />
                                </TextField>

                                <Modal.Footer className="sm:col-span-2">
                                    <Button
                                        type="button"
                                        onPress={() => {
                                            resetForm();
                                            modal.close();
                                        }}
                                        isDisabled={loading}
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        isPending={loading}
                                        isDisabled={loading}
                                        className="bg-[#0F4C5C] text-white hover:bg-[#0b3c49]"
                                    >
                                        {loading ? "Creating..." : "Create Campaign"}
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default AddCampaignModal;
