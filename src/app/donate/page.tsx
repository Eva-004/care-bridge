import DonateForm from "@/components/donor/DonateForm";
import React from "react";
import { FaHandHoldingHeart } from "react-icons/fa";

const DonatePage = () => {
  return (
    <main className="min-h-screen bg-[#F8F9FA] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F1F3]">
            <FaHandHoldingHeart className="text-xl text-[#0F4C5C]" />
          </div>

          <h1 className="text-2xl font-bold text-[#1D2D44]">
            Make a Donation
          </h1>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
            Your contribution can make a meaningful difference in someone`s
            life. Choose a category and support those who need it.
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <DonateForm />
        </div>
      </div>
    </main>
  );
};

export default DonatePage;