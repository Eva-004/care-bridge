
"use client";

import React, { useEffect, useState } from "react";
import { Table } from "@heroui/react";
import { getDonations } from "@/lib/fetchData";
import { authClient } from "@/lib/auth-client";

interface Donation {
    _id: string;
    category: string;
    purpose: string;
    amount: number;
    createdAt: string;
}
interface MyDonationsTableProps {
    setDonationCount: (count: number) => void;
    setTotalAmount: (amount: number) => void;
}

const MyDonationsTable = ({ setDonationCount, setTotalAmount, }: MyDonationsTableProps) => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);

    const userData = authClient.useSession();
    const user = userData.data?.user;

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getDonations(user.email);
                setDonations(data);
                setDonationCount(data.length);
                const total = data.reduce(
                    (sum: number, donation: Donation) => sum + donation.amount,
                    0
                );
                setTotalAmount(total);
                setDonations(data);
            } catch (error) {
                console.error("Failed to fetch donations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.email]);

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content
                    aria-label="My donations"
                    className="min-w-[750px]"
                >
                    <Table.Header>
                        <Table.Column isRowHeader>Purpose</Table.Column>
                        <Table.Column>Date</Table.Column>
                        <Table.Column>Category</Table.Column>
                        <Table.Column>Amount</Table.Column>
                    </Table.Header>

                    <Table.Body>
                        {loading || userData.isPending ? (
                            <Table.Row>
                                <Table.Cell>
                                    Loading donations...
                                </Table.Cell>
                                <Table.Cell />
                                <Table.Cell />
                                <Table.Cell />
                            </Table.Row>
                        ) : donations.length === 0 ? (
                            <Table.Row>
                                <Table.Cell>
                                    No donations found.
                                </Table.Cell>
                                <Table.Cell />
                                <Table.Cell />
                                <Table.Cell />
                            </Table.Row>
                        ) : (
                            donations.map((donation) => (
                                <Table.Row key={donation._id}>
                                    <Table.Cell>
                                        {donation.purpose || "General Donation"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(donation.createdAt).toLocaleDateString("en-GB")}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {donation.category}
                                    </Table.Cell>
                                    <Table.Cell>
                                        ৳ {donation.amount.toLocaleString("en-BD")}
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default MyDonationsTable;
