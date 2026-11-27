
"use client";

import { useEffect, useState } from "react";
import { Table } from "@heroui/react";
import { getCategories } from "@/lib/fetchData";

interface DonationData {
    _id: string;
    name: string;
    category: string;
    purpose: string;
    amount: number;
    email: string;
    phone: string;
}

interface Category {
    _id: string;
    name: string;
}

interface DonationTableProps {
    donations: DonationData[];
}

const DonationTable = ({ donations }: DonationTableProps) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        fetchCategories();
    }, []);

    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Donation history"
                        className="min-w-[750px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>Donor Name</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Purpose</Table.Column>
                            <Table.Column>Amount</Table.Column>
                            <Table.Column>Email</Table.Column>
                            <Table.Column>Phone</Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {donations.map((donation) => (
                                <Table.Row key={donation._id}>
                                    <Table.Cell>
                                        <span className="font-medium text-[#1D2D44]">
                                            {donation.name}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="rounded-full bg-[#F8F9FA] px-3 py-1 text-xs font-medium text-[#0F4C5C]">
                                            {categories.find(
                                                (cat) => cat._id === donation.category
                                            )?.name || "Unknown"}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-gray-600">
                                            {donation.purpose || "General"}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="font-semibold text-[#0F4C5C]">
                                            ৳{donation.amount.toLocaleString()}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-gray-600">
                                            {donation.email}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-gray-600">
                                            {donation.phone}
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            {donations.length === 0 && (
                <div className="py-12 text-center">
                    <p className="font-medium text-[#1D2D44]">
                        No donations found
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                        Donation records will appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DonationTable;
