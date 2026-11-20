
"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Chip } from "@heroui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import AddRoleModal from "@/components/admin/modals/AddRoleModal";

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

  const fetchRoles = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/roles`
    );
    const data: Role[] = await res.json();
    setRoles(data);
    console.log(data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const filteredRoles = roles.filter((role) => role.slug !== "admin");

  const handleEdit = (role: Role) => {
    console.log("Edit:", role);
  };

  const handleDelete = (role: Role) => {
    console.log("Delete:", role);
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
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-[#1D2D44]">
                          {role.name}
                        </p>
                      </div>
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
    </div>
  );
};

export default RoleAndPermission;
