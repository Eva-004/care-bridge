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

import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCloudUploadAlt,
  FaPaperPlane,
  FaFileAlt,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { getCategories } from "@/lib/fetchData";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface Category {
  _id: string;
  name: string;
}

export default function HelpRequestForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [supportType, setSupportType] = useState("");
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);

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
    setLoading(true);

    const form = e.currentTarget;

    try {
      const formData = new FormData(form);

      formData.append("userId", user?.id || "");
      formData.append("userName", user?.name || "");

      documents.forEach((file) => {
        formData.append("documents", file);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/helpRequests`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit request");
        return;
      }

      toast.success("Help request submitted successfully!");
      form.reset();
      setDocuments([]);
      setSupportType("");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  return (
    <Form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <section className="w-full">
        <div className="mb-5 border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-[#0F4C5C] sm:text-lg">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Provide your contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField isRequired name="name" className="w-full">
            <Label>Full Name</Label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-400" />
              <Input
                placeholder="Enter your full name"
                className="pl-9"
              />
            </div>
            <FieldError />
          </TextField>

          <TextField isRequired name="phone" className="w-full">
            <Label>Contact Number</Label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-400" />
              <Input
                type="tel"
                placeholder="+880 1XXXXXXXXX"
                className="pl-9"
              />
            </div>
            <FieldError />
          </TextField>
        </div>
      </section>

      <section className="w-full">
        <div className="mb-5 border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-[#0F4C5C] sm:text-lg">
            Request Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Tell us about the help you need.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="w-full">
              <Label>Help Category</Label>
              <select
                name="category"
                required
                defaultValue=""
                className="mt-2 h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/10"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <Label>Urgency Level</Label>
              <select
                name="urgency"
                required
                defaultValue=""
                className="mt-2 h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/10"
              >
                <option value="" disabled>
                  Select urgency
                </option>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <TextField isRequired name="description" className="w-full">
            <Label>Describe Your Situation</Label>
            <TextArea
              placeholder="Explain why you need help, your current situation and how the support will help you..."
              rows={5}
            />
            <Description>
              Provide enough details so donors can understand your needs.
            </Description>
            <FieldError />
          </TextField>
        </div>
      </section>

      <section className="w-full">
        <div className="mb-5 border-b border-gray-100 pb-3">
          <h3 className="text-base font-bold text-[#0F4C5C] sm:text-lg">
            Support Details
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Specify what kind of support you need and your location.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="w-full">
            <Label>Type of Support Needed</Label>
            <select
              name="supportType"
              required
              value={supportType}
              onChange={(e) => setSupportType(e.target.value)}
              className=" h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-[#0F4C5C] focus:ring-2 focus:ring-[#0F4C5C]/10"
            >
              <option value="" disabled>
                Select support type
              </option>
              <option value="financial">Financial Support</option>
              <option value="in-kind">In-kind Support</option>
            </select>
          </div>

          {supportType === "financial" && (
            <TextField isRequired name="amount" className="w-full">
              <Label>Required Amount (BDT)</Label>
              <Input type="number" min={1} placeholder="e.g. 15000" />
              <FieldError />
            </TextField>
          )}

          <TextField isRequired name="location" className="w-full">
            <Label>Location</Label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-400" />
              <Input placeholder="City, District" className="pl-9" />
            </div>
            <FieldError />
          </TextField>
        </div>
      </section>

      <section className="w-full">
        <div className="mb-4">
          <h3 className="text-base font-bold text-[#0F4C5C] sm:text-lg">
            Supporting Documents
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload documents to support your request (optional).
          </p>
        </div>

        <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#0F4C5C]/25 bg-[#F8F9FA] px-4 py-8 text-center transition hover:border-[#E36414] hover:bg-[#FB8B24]/5 sm:py-10">
          <FaCloudUploadAlt className="mb-3 text-3xl text-[#0F4C5C]" />

          <span className="text-sm font-semibold text-[#1D2D44]">
            Click to upload documents
          </span>

          <span className="mt-1 text-xs text-gray-500">
            PDF, DOC, DOCX, JPG or PNG
          </span>

          <input
            type="file"
            name="documents"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            multiple
            onChange={handleDocumentChange}
            className="hidden"
          />
        </label>

        {documents.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {documents.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <FaFileAlt className="shrink-0 text-xl text-[#0F4C5C]" />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveDocument(index)}
                  className="shrink-0 text-xl text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="flex w-full flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
        <Button
          type="reset"
          variant="secondary"
          className="w-full sm:w-auto sm:min-w-32"
        >
          Reset Form
        </Button>

        <Button
          type="submit"
          isDisabled={loading}
          className="w-full bg-[#0F4C5C] font-semibold text-white hover:bg-[#0b3d4a] sm:w-auto sm:min-w-48"
        >
          <FaPaperPlane className="text-sm" />
          {loading ? "Submitting..." : "Submit Help Request"}
        </Button>
      </div>
    </Form>
  );
}