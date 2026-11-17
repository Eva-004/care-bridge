
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
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4 py-8">
      <Card className="w-full max-w-md rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center gap-5 p-6 text-center sm:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
              <FaCheck className="text-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0F4C5C]">
              Payment Successful!
            </h1>
            <p className="text-sm leading-6 text-gray-500">
              Your donation has been completed successfully. Thank you for
              supporting CareBridge.
            </p>
          </div>

          <div className="w-full rounded-xl bg-[#F8F9FA] p-4">
            <p className="text-xs text-gray-500">Transaction ID</p>
            <p className="mt-1 break-all text-sm font-semibold text-[#0F4C5C]">
              {tranId || "Loading..."}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-green-600">
            <FaHeart />
            <span>Thank you for your kindness!</span>
          </div>

          <Link
            href="/"
            className="w-full bg-[#0F4C5C] font-semibold text-white"
            
          >
           <FaHome /> Back to Home
          </Link>
        </div>
      </Card>
    </main>
  );
};

export default PaymentSuccessPage;
