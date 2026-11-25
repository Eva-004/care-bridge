
"use client";

import { useEffect, useState } from "react";
import { Table, Chip, Avatar, Button } from "@heroui/react";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

interface User {
    _id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
    createdAt: string;
}

interface ManageUserTableProps {
    users: User[];
}

const ManageUserTable = ({ users }: ManageUserTableProps) => {
    return (
        <div className="space-y-5">
            <div>
                <h2 className="text-2xl font-semibold text-[#1D2D44]">
                    Manage Users
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    View and manage all registered users.
                </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-[#0F4C5C]">
                        All Users
                    </h3>
                    <Chip className="bg-[#E8F3F4] text-[#0F4C5C]" size="sm">
                        {users.length} Users
                    </Chip>
                </div>

                <Table aria-label="Manage users table">
                    <Table.ScrollContainer>
                        <Table.Content className="min-w-[650px]">
                            <Table.Header>
                                <Table.Column isRowHeader>User</Table.Column>
                                <Table.Column>Email</Table.Column>
                                <Table.Column>Role</Table.Column>
                                <Table.Column>Joined Date</Table.Column>
                                <Table.Column>Actions</Table.Column>
                            </Table.Header>

                            <Table.Body
                                items={users}>
                                {(user) => (
                                    <Table.Row key={user._id}>
                                        <Table.Cell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="bg-[#E8F3F4] text-[#0F4C5C]" size="sm">
                                                    {user.image && <Avatar.Image src={user.image} alt={user.name} />}
                                                    <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                                                </Avatar>
                                                <span className="font-medium text-[#1D2D44]">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="text-sm text-gray-600">
                                                {user.email}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Chip
                                                size="sm"
                                                className="bg-[#FFF1E8] text-[#C65315] capitalize"
                                            >
                                                {user.role}
                                            </Chip>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <EditUserModal user={user} />
                                               <DeleteUserModal user={user} />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default ManageUserTable;
