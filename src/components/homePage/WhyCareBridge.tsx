
import { Card } from "@heroui/react";
import {
  HiOutlineHeart,
  HiOutlineCube,
  HiOutlineDocumentCheck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const reasons = [
  {
    icon: HiOutlineHeart,
    title: "Support Real Needs",
    description:
      "Explore individual help requests and choose where your support can make a difference.",
    color: "bg-[#E8F2F5] text-[#0F4C5C]",
  },
  {
    icon: HiOutlineCube,
    title: "More Than Money",
    description:
      "Support people with financial help, food, clothing and other essential items.",
    color: "bg-[#FFF0E8] text-[#C66B36]",
  },
  {
    icon: HiOutlineDocumentCheck,
    title: "Clear & Detailed Requests",
    description:
      "Understand each person's needs through detailed descriptions and supporting documents.",
    color: "bg-[#E8F2F5] text-[#0F4C5C]",
  },
  {
    icon: HiOutlineUserGroup,
    title: "A Community That Cares",
    description:
      "Connect people through kindness and make helping others a meaningful experience.",
    color: "bg-[#FFF0E8] text-[#C66B36]",
  },
];

const WhyCareBridge = () => {
  return (
    <section className="bg-[#F8F9FA] py-8 w-11/12 mx-auto">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E36414]">
            Why CareBridge
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F4C5C] md:text-4xl">
            Help That Goes Beyond Money.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#526477]">
            Everyone has different needs. CareBridge makes it easier
            to ask for help and support others in ways that truly matter.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <Card
                key={reason.title}
                className="border border-[#E5E9ED] bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#B9D3D9] hover:shadow-md"
              >
                <Card.Content className="gap-4 p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${reason.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[#1D2D44]">
                      {reason.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#64748B]">
                      {reason.description}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#0F4C5C] p-7 sm:flex-row sm:items-center md:p-10">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white">
              Your kindness can make a difference.
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#D8E8EC]">
              Find a need. Choose how to help. Be someone`s reason to smile.
            </p>
          </div>

          <Link
            href="/help-seekers"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#E36414] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#C9520C]"
          >
            Explore Help Requests
            <FiArrowUpRight size={20}/>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyCareBridge;
