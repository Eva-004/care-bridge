
"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Chip, Modal } from "@heroui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import AddRoleModal from "@/components/admin/modals/AddRoleModal";
import EditRoleModal from "@/components/admin/modals/EditRoleModal";

interface Permission {
    label: string;
    href: string;
}

interface Role {
    _id: string;
    name: string;
    slug: string;
    permissions: Permission[];
    isActive: boolean;
}

const RoleAndPermission = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchRoles = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/roles`
            );
            const data: Role[] = await res.json();
            setRoles(data);
        } catch (error) {
            toast.error("Failed to load roles");
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const filteredRoles = roles.filter((role) => role.slug !== "admin");

    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setIsEditOpen(true);
    };

    const handleDelete = (role: Role) => {
        setSelectedRole(role);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedRole) return;

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/roles/${selectedRole._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to delete role");
            }

            toast.success("Role deleted successfully");
            setIsDeleteOpen(false);
            setSelectedRole(null);
            fetchRoles();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 w-11/12 mx-auto py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#1D2D44]">
                        Roles & Permissions
                    </h1>

                    <p className="mt-1 text-sm text-[#1D2D44]/70">
                        Manage roles and control their dashboard permissions.
                    </p>
                </div>

                <AddRoleModal />
            </div>

            <div className="rounded-xl border border-[#0F4C5C]/15 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-[#1D2D44]">
                        All Roles
                    </h2>

                    <p className="mt-1 text-sm text-[#1D2D44]/70">
                        View and manage roles available in Carebridge.
                    </p>
                </div>

                <Table>
                    <Table.ScrollContainer>
                        <Table.Content
                            aria-label="Roles and permissions"
                            className="min-w-[700px]"
                        >
                            <Table.Header>
                                <Table.Column isRowHeader>Name</Table.Column>
                                <Table.Column>Permissions</Table.Column>
                                <Table.Column>Actions</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {filteredRoles.map((role) => (
                                    <Table.Row key={role._id}>
                                        <Table.Cell>
                                            <p className="font-semibold text-[#1D2D44]">
                                                {role.name}
                                            </p>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex max-w-[500px] flex-wrap gap-1.5">
                                                {role.permissions.slice(0, 3).map((permission) => (
                                                    <Chip
                                                        key={permission.href}
                                                        size="sm"
                                                        className="bg-[#0F4C5C]/10 text-[#0F4C5C]"
                                                    >
                                                        {permission.label}
                                                    </Chip>
                                                ))}

                                                {role.permissions.length > 3 && (
                                                    <Chip
                                                        size="sm"
                                                        className="bg-[#FB8B24]/15 text-[#E36414]"
                                                    >
                                                        +{role.permissions.length - 3} more
                                                    </Chip>
                                                )}
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    aria-label={`Edit ${role.name}`}
                                                    onPress={() => handleEdit(role)}
                                                    className="text-[#0F4C5C] bg-white hover:bg-[#0F4C5C]/10"
                                                >
                                                    <FiEdit2 size={17} />
                                                </Button>

                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    aria-label={`Delete ${role.name}`}
                                                    onPress={() => handleDelete(role)}
                                                    className="text-[#E36414] bg-white hover:bg-[#E36414]/10"
                                                >
                                                    <FiTrash2 size={17} />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>

            <EditRoleModal
                role={selectedRole}
                isOpen={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSuccess={fetchRoles}
            />

            <Modal
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
            >
                <Modal.Backdrop>
                    <Modal.Container placement="center">
                        <Modal.Dialog>
                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading className="text-[#1D2D44]">
                                    Delete Role
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                                <p className="text-sm text-[#1D2D44]/70">
                                    Are you sure you want to delete{" "}
                                    <span className="font-semibold text-[#1D2D44]">
                                        {selectedRole?.name}
                                    </span>
                                    ? This action cannot be undone.
                                </p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onPress={() => setIsDeleteOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    isDisabled={loading}
                                    onPress={confirmDelete}
                                    className="bg-[#E36414] text-white hover:bg-[#E36414]/90"
                                >
                                    {loading ? "Deleting..." : "Delete Role"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default RoleAndPermission;
