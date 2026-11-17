
"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import { createDonation, getCategories } from "@/lib/fetchData";
import { authClient } from "@/lib/auth-client";

interface Category {
  _id: string;
  name: string;
}


const DonateForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userData = authClient.useSession();
  const user = userData.data?.user;

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.email) {
      setError("Please login to continue your donation.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const donationData = {
      name: String(formData.get("name")),
      category: String(formData.get("category")),
      purpose: String(formData.get("purpose") || ""),
      amount: Number(formData.get("amount")),
      phone: String(formData.get("phone")),
      email: user?.email,
    };

    try {
      const result = await createDonation(donationData);
      window.location.href = result.gatewayUrl;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        <section className="flex w-full flex-col gap-4">
          <div className="border-b border-gray-100 pb-2">
            <h3 className="font-bold text-[#0F4C5C]">Donation Information</h3>
            <p className="mt-1 text-xs text-gray-500">
              Enter your donation details.
            </p>
          </div>

          <TextField isRequired name="name" className="w-full">
            <Label>Donor Name</Label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-400" />
              <Input placeholder="Enter your name" className="w-full pl-9" />
            </div>
            <FieldError />
          </TextField>

          <TextField isRequired name="phone" type="tel" className="w-full">
            <Label>Phone Number</Label>
            <Input type="tel" placeholder="Enter your phone number" />
            <FieldError />
          </TextField>

          <div className="w-full">
            <Label>Donation Category</Label>
            <select
              name="category"
              required
              defaultValue=""
              className="mt-1.5 h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/10"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <TextField name="purpose" className="w-full">
            <Label>Specific Purpose (Optional)</Label>
            <TextArea
              rows={3}
              placeholder="Describe your specific donation purpose..."
            />
            <Description>
              Mention if your donation is for a specific person or task.
            </Description>
            <FieldError />
          </TextField>
        </section>

        <section className="flex w-full flex-col gap-4">
          <div className="border-b border-gray-100 pb-2">
            <h3 className="font-bold text-[#0F4C5C]">Donation Amount</h3>
            <p className="mt-1 text-xs text-gray-500">
              Enter the amount you want to donate.
            </p>
          </div>

          <TextField isRequired name="amount" className="w-full">
            <Label>Donation Amount (BDT)</Label>
            <Input
              type="number"
              min={1}
              placeholder="Enter donation amount"
            />
            <FieldError />
          </TextField>

          <div className="rounded-lg border border-[#0F4C5C]/10 bg-[#F8F9FA] p-4">
            <h4 className="text-sm font-semibold text-[#0F4C5C]">
              Secure Online Payment
            </h4>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              You will be redirected to a secure payment page where you can
              choose your preferred payment method.
            </p>
          </div>
        </section>
      </div>

      <div className="w-full border-t border-gray-100 pt-4">
        <Button
          type="submit"
          isDisabled={loading}
          className="w-full bg-[#0F4C5C] font-semibold text-white hover:bg-[#0b3d4a]"
        >
          <FaPaperPlane className="text-sm" />
          {loading ? "Redirecting..." : "Continue to Payment"}
        </Button>
      </div>
    </Form>
  );
};

export default DonateForm;
