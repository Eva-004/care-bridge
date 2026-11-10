
"use client";

import { authClient } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHandHoldingHeart, FaUser } from "react-icons/fa";


const ChooseRolePage = () => {
  const userData = authClient.useSession();
    const user = userData.data?.user;
    const router = useRouter();
  const handleRole = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user?.id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "donor",
      }),
    });

    const data = await res.json();
    if(res){
      router.push("/");
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-[#1D2D44] sm:text-4xl">
            Choose Your Role
          </h1>
          <p className="text-sm text-gray-500 sm:text-base">
            How would you like to use CareBridge?
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="flex items-center gap-5 border border-gray-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4F4]">
              <FaUser className="text-3xl text-[#0F4C5C]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#1D2D44]">
                Continue as User
              </h2>
              <p className="text-sm leading-6 text-gray-500">
                Request support when you or someone needs help.
              </p>
            </div>

            <Link
              href="/dashboard/user"
              className="mt-2 w-full bg-[#0F4C5C] font-semibold text-white hover:bg-[#0F4C5C]/90"
            >
              Continue as User
            </Link>
          </Card>

          <Card className="flex items-center gap-5 border border-gray-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1E8]">
              <FaHandHoldingHeart className="text-3xl text-[#E36414]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#1D2D44]">
                Continue as Donor
              </h2>
              <p className="text-sm leading-6 text-gray-500">
                Support people in need through donations.
              </p>
            </div>

            <Button
              onClick={handleRole}
              className="mt-2 w-full bg-[#E36414] font-semibold text-white hover:bg-[#E36414]/90"
            >
              Continue as Donor
            </Button>
          </Card>
        </div>

        <div className="text-center">
          <Link
            href="/dashboard/user"
            className="text-sm font-medium text-gray-500 transition hover:text-[#0F4C5C]"
          >
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRolePage;
