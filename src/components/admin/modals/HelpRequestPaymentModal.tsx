
"use client";

import {
    Button,
    Input,
    Label,
    Modal,
    TextField,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

interface HelpRequestPaymentModalProps {
    requestId: string;
    paymentMethod: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

const HelpRequestPaymentModal = ({
    requestId,
    paymentMethod,
    isOpen,
    onOpenChange,
    onSuccess,
}: HelpRequestPaymentModalProps) => {
    const [transactionId, setTransactionId] = useState("");
    const [senderNumber, setSenderNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!transactionId.trim() || !senderNumber.trim()) {
            toast.error("Please provide all payment information");
            return;
        }

        try {
            setIsLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/helpRequestPayments/confirm`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestId,
                        transactionId: transactionId.trim(),
                        senderNumber: senderNumber.trim(),
                        adminId: "admin",
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Payment confirmation failed");
            }

            toast.success("Payment confirmed successfully");

            setTransactionId("");
            setSenderNumber("");
            onOpenChange(false);
            onSuccess();
        } catch (error) {
            toast.error( "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-lg">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading className="text-[#0F4C5C]">
                                Confirm Financial Payment
                            </Modal.Heading>

                            <p className="mt-1.5 text-sm text-[#1D2D44]/70">
                                Enter the payment details after sending money to the beneficiary.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >
                                <div className="rounded-xl bg-[#0F4C5C]/5 p-4">
                                    <p className="text-xs text-[#1D2D44]/60">
                                        Payment Method
                                    </p>
                                    <p className="mt-1 font-semibold capitalize text-[#0F4C5C]">
                                        {paymentMethod}
                                    </p>
                                </div>

                                <TextField isRequired
                                    className="w-full"
                                    name="transactionId"
                                    variant="secondary"
                                >
                                    <Label>Transaction ID</Label>
                                    <Input
                                        className="w-full"
                                        placeholder="Enter transaction ID"
                                        value={transactionId}
                                        onChange={(e) =>
                                            setTransactionId(e.target.value)
                                        }
                                        
                                    />
                                </TextField>

                                <TextField isRequired
                                    className="w-full"
                                    name="senderNumber"
                                    variant="secondary"
                                >
                                    <Label>Sender Number</Label>
                                    <Input
                                        className="w-full"
                                        placeholder="Enter your payment number"
                                        value={senderNumber}
                                        onChange={(e) =>
                                            setSenderNumber(e.target.value)
                                        }
                                        
                                    />
                                </TextField>

                                <Modal.Footer>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onPress={() => onOpenChange(false)}
                                        isDisabled={isLoading}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        className="bg-[#0F4C5C] text-white hover:bg-[#0F4C5C]/90"
                                        isDisabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Confirming..."
                                            : "Confirm Payment"}
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

export default HelpRequestPaymentModal;
