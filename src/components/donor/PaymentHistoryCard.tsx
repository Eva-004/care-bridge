
import { Card } from "@heroui/react";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";

export interface Payment {
  _id: string;
  donationId: string;
  tranId: string;
  amount: number;
  currency: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  paymentMethod: string;
  bankTranId?: string;
  createdAt: string;
}

interface PaymentHistoryCardProps {
  payment: Payment;
}

const PaymentHistoryCard = ({ payment }: PaymentHistoryCardProps) => {
  const status = {
    SUCCESS: {
      label: "Successful",
      icon: <FiCheckCircle />,
      color: "text-green-600 bg-green-50",
    },
    PENDING: {
      label: "Pending",
      icon: <FiClock />,
      color: "text-amber-600 bg-amber-50",
    },
    FAILED: {
      label: "Failed",
      icon: <FiXCircle />,
      color: "text-red-600 bg-red-50",
    },
  }[payment.status];

  return (
    <Card shadow-sm className="border border-gray-100">
      <div className="gap-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F4C5C]/10 text-xl text-[#0F4C5C]">
              <FiCreditCard />
            </div>

            <div>
              <p className="text-xs text-gray-500">Payment Amount</p>
              <h3 className="text-xl font-bold text-[#1D2D44]">
                {payment.currency === "BDT" ? "৳" : payment.currency}{" "}
                {payment.amount.toLocaleString("en-BD")}
              </h3>
            </div>
          </div>

          <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.color}`}>
            {status.icon}
            {status.label}
          </span>
        </div>

        <div className="border-t border-dashed border-gray-200" />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Transaction ID</span>
            <span className="break-all text-right font-medium text-[#1D2D44]">
              {payment.tranId}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium text-[#1D2D44]">
              {payment.paymentMethod.replace("-", " ")}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Bank Transaction ID</span>
            <span className="break-all text-right font-medium text-[#1D2D44]">
              {payment.bankTranId || "Not available"}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="flex items-center gap-2 text-gray-500">
              <FiCalendar /> Date
            </span>
            <span className="font-medium text-[#1D2D44]">
              {new Date(payment.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-400">
            Donation ID: {payment.donationId.slice(-8)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PaymentHistoryCard;
