
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaCheck, FaHeart, FaHome } from "react-icons/fa";

const PaymentSuccessPage = () => {
  const [tranId, setTranId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTranId(params.get("tranId") || "");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white">
              <FaCheck className="text-2xl" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#0F4C5C] sm:text-3xl">
            Payment Successful!
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
            Your donation has been completed successfully.
            Thank you for supporting CareBridge.
          </p>

          <div className="mt-7 w-full rounded-xl bg-[#F8F9FA] p-5">
            <p className="text-sm text-gray-500">
              Transaction ID
            </p>
            <p className="mt-2 break-all text-base font-semibold text-[#0F4C5C]">
              {tranId || "Loading..."}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-green-600">
            <FaHeart />
            <span>Thank you for your kindness!</span>
          </div>

          <Link
            href="/"
            className="mt-8 w-full bg-[#0F4C5C] font-semibold text-white hover:bg-[#0B3B47]"
          >
            <FaHome /> Back to Home
          </Link>
        </div>
      </Card>
    </main>
  );
};

export default PaymentSuccessPage;
