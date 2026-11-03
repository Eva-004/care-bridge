"use client";

import { Plus } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";

interface CategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CategoryModal = ({
  isOpen,
  setIsOpen,
}: CategoryModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const categoryData = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/helpCategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );

      if (!res.ok) {
        toast.error("Failed to create category");
        return;
      }

      toast.success("Category created successfully");
      formRef.current?.reset();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Trigger>
        <Button
          size="sm"
          className="bg-[#0F4C5C] text-white hover:bg-[#0b3d4a]"
          onPress={() => setIsOpen(true)}
        >
          <Plus />
          Add Category
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-[#1D2D44]">
                Add Category
              </Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-gray-500">
                Create a category for donation and help requests.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <TextField isRequired className="w-full">
                    <Label>Category Name</Label>
                    <Input
                      name="name"
                      placeholder="e.g. Education, Medicine, Food"
                      required
                    />
                  </TextField>

                  <TextField className="w-full">
                    <Label>Description</Label>
                    <TextArea
                      name="description"
                      placeholder="Write a short description about this category"
                      rows={3}
                    />
                  </TextField>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="bg-[#0F4C5C] text-white hover:bg-[#0b3d4a]"
                    >
                      Add Category
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default CategoryModal;