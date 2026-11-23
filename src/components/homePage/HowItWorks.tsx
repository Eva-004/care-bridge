
import { Card } from "@heroui/react";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
} from "react-icons/hi2";

const steps = [
  {
    icon: HiOutlineClipboardDocumentList,
    number: "01",
    title: "Share Your Need",
    description:
      "Create a help request with your needs, details and supporting documents.",
    color: "bg-[#E8F2F5] text-[#0F4C5C]",
  },
  {
    icon: HiOutlineMagnifyingGlass,
    number: "02",
    title: "Find the Right Support",
    description:
      "Donors explore requests and choose the people or needs they want to support.",
    color: "bg-[#FFF0E8] text-[#C66B36]",
  },
  {
    icon: HiOutlineHeart,
    number: "03",
    title: "Make a Difference",
    description:
      "Offer financial support or provide essential items to help someone in need.",
    color: "bg-[#E8F2F5] text-[#0F4C5C]",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-8 w-11/12 mx-auto">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E36414]">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F4C5C] md:text-4xl">
            Helping Others Made Simple.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#526477]">
            Getting help or supporting someone is simple with CareBridge.
            Follow these three steps to make a difference.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.number}
                className="border border-[#E5E9ED] bg-[#F8F9FA] shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#B9D3D9] hover:shadow-md"
              >
                <Card.Content className="gap-5 p-7">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-xl ${step.color}`}
                    >
                      <Icon size={27} />
                    </div>

                    <span className="text-3xl font-bold text-[#DCE5E9]">
                      {step.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#1D2D44]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#64748B]">
                      {step.description}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
