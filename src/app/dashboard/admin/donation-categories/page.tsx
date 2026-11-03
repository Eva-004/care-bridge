
"use client";

import { useEffect, useState } from "react";
import { Button, Table } from "@heroui/react";
import { Pencil } from "@gravity-ui/icons";
import { BsTrash2 } from "react-icons/bs";
import CategoryModal from "@/components/admin/modals/CategoryModal";
import { getCategories } from "@/lib/fetchData";


interface Category {
  _id: string;
  name: string;
  description: string;
}


const DonationCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const[categories,setCategories]=useState<Category[]>([]);
  useEffect(()=>{
    const fetchCategories = async()=>{
        const data = await getCategories();
        setCategories(data);
    }
    fetchCategories();
  },[]);
 console.log(categories);
  return (
    <div className="w-11/12 mx-auto py-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#1D2D44]">
            Donation Categories
          </h2>
          <p className="mt-1 text-sm text-gray-500">
           Manage categories for donation and help requests.
          </p>
        </div>

        <CategoryModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Donation categories"
            className="min-w-[600px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>Category Name</Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body
              items={categories}
            >
              {(category) => (
                <Table.Row key={category._id}>
                  <Table.Cell>
                    <span className="font-medium text-[#0F4C5C]">
                      {category.name}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-gray-600">
                      {category.description || "-"}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                       className={'bg-white'}
                        aria-label="Edit category"
                      >
                        <Pencil  className="text-[#0F4C5C]" />
                      </Button>

                      <Button
                        isIconOnly
                        size="sm"
                       className={'bg-white'}
                        aria-label="Delete category"
                      >
                        <BsTrash2 className="text-red-500" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default DonationCategories;
