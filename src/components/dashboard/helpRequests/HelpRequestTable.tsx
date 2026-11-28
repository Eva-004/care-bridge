
"use client";

import { useState } from "react";
import { Table, Chip, Button } from "@heroui/react";
import EditHelpRequestModal from "../EditHelpRequestModal";
import { updateHelpRequest } from "@/lib/fetchData";
import { toast } from "react-toastify";
import Link from "next/link";
import HelpRequestPaymentModal from "@/components/admin/modals/HelpRequestPaymentModal";

interface HelpRequest {
    _id: string;
    name: string;
    phone: string;
    category: string | { _id: string; name: string };
    urgency: string;
    description: string;
    supportType: string;
    amount?: string | number;
    paymentMethod?: string;
    needs?: string;
    location: string;
    status: string;
    createdAt: string;
}

interface HelpRequestTableProps {
    requests: HelpRequest[];
    role: "admin" | "user";
}

const HelpRequestTable = ({
    requests,
    role,
}: HelpRequestTableProps) => {
    const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleApprove = async (id: string) => {
        const res = await updateHelpRequest(id, { status: "approved" });

        if (res.ok) {
            toast.success("Request approved successfully");
            window.location.reload();
        } else {
            toast.error("Failed to approve request");
        }
    };

    const handleReject = async (id: string) => {
        const res = await updateHelpRequest(id, { status: "rejected" });

        if (res.ok) {
            toast.success("Request rejected successfully");
            window.location.reload();
        } else {
            toast.error("Failed to reject request");
        }
    };

    const handlePay = (request: HelpRequest) => {
        setSelectedRequest(request);
        setIsPaymentModalOpen(true);
    };

    const filteredRequests = requests.filter(
        (request) => request.status !== "paid"
    );

    return (
        <>
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-[#0F4C5C]">
                        {role === "admin" ? "All Requests" : "My Requests"}
                    </h3>

                    <Chip size="sm" className="bg-[#E8F3F4] text-[#0F4C5C]">
                        {requests.length} Requests
                    </Chip>
                </div>

                <Table aria-label="Help requests table">
                    <Table.ScrollContainer>
                        <Table.Content className="min-w-[700px]">
                            <Table.Header>
                                <Table.Column isRowHeader>Request Details</Table.Column>
                                <Table.Column>Urgency</Table.Column>
                                <Table.Column>Submitted Date</Table.Column>
                                <Table.Column>Status</Table.Column>
                                <Table.Column>Actions</Table.Column>
                            </Table.Header>

                            <Table.Body items={filteredRequests}>
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((request) => (
                                        <Table.Row key={request._id}>
                                            <Table.Cell>
                                                <Link
                                                    href={`/help-seekers/${request._id}`}
                                                    className="font-semibold text-[#0F4C5C] transition hover:text-[#E36414] hover:underline"
                                                >
                                                    {request.name}
                                                </Link>

                                                <p className="mt-1 text-xs capitalize text-gray-500">
                                                    {request.supportType === "financial"
                                                        ? `Financial - ৳${request.amount}`
                                                        : `In-kind - ${request.needs}`}
                                                </p>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip
                                                    size="sm"
                                                    className={
                                                        request.urgency === "high" ||
                                                            request.urgency === "urgent"
                                                            ? "bg-red-50 text-red-600"
                                                            : "bg-[#FFF1E8] text-[#C65315]"
                                                    }
                                                >
                                                    {request.urgency}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(request.createdAt).toLocaleDateString()}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip
                                                    size="sm"
                                                    className={
                                                        request.status === "paid"
                                                            ? "bg-[#E8F3F4] text-[#0F4C5C]"
                                                            : request.status === "approved"
                                                                ? "bg-green-50 text-green-700"
                                                                : request.status === "rejected"
                                                                    ? "bg-red-50 text-red-600"
                                                                    : request.status === "pending"
                                                                        ? "bg-amber-50 text-amber-700"
                                                                        : "bg-gray-100 text-gray-600"
                                                    }
                                                >
                                                    {request.status}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <div className="flex items-center gap-2">
                                                    {role === "admin" ? (
                                                        <>
                                                            {request.status === "pending" && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        onPress={() => handleApprove(request._id)}
                                                                        className="bg-[#0F4C5C] text-white"
                                                                    >
                                                                        Approve
                                                                    </Button>

                                                                    <Button
                                                                        size="sm"
                                                                        onPress={() => handleReject(request._id)}
                                                                        className="bg-red-50 text-red-600"
                                                                    >
                                                                        Reject
                                                                    </Button>
                                                                </>
                                                            )}

                                                            {request.status === "approved" &&
                                                                request.supportType === "financial" && (
                                                                    <Button
                                                                        size="sm"
                                                                        onPress={() => handlePay(request)}
                                                                        className="bg-green-600 text-white hover:bg-green-700"
                                                                    >
                                                                        Pay
                                                                    </Button>
                                                                )}

                                                            <EditHelpRequestModal
                                                                request={request}
                                                                role="admin"
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            {request.status === "pending" && (
                                                                <>
                                                                    <EditHelpRequestModal
                                                                        request={request}
                                                                        role="user"
                                                                    />

                                                                    <Button
                                                                        size="sm"
                                                                        className="bg-red-50 text-red-600"
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell>
                                            <div className="flex min-h-56 w-full flex-col items-center justify-center text-center">
                                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F3F4] text-[#0F4C5C]">
                                                    <span className="text-2xl">📋</span>
                                                </div>

                                                <h3 className="text-base font-semibold text-[#1D2D44]">
                                                    No Requests Found
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {role === "admin"
                                                        ? "There are no help requests to manage right now."
                                                        : "You haven't submitted any help requests yet."}
                                                </p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell />
                                        <Table.Cell />
                                        <Table.Cell />
                                        <Table.Cell />
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            {selectedRequest && (
                <HelpRequestPaymentModal
                    requestId={selectedRequest._id}
                    paymentMethod={selectedRequest.paymentMethod || ""}
                    isOpen={isPaymentModalOpen}
                    onOpenChange={setIsPaymentModalOpen}
                    onSuccess={() => window.location.reload()}
                />
            )}
        </>
    );
};

export default HelpRequestTable;
