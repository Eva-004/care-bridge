
import Image from "next/image";
import Link from "next/link";
import { Card } from "@heroui/react";
import {
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiArrowUpRight,
  FiClock,
} from "react-icons/fi";

const helpOptions = [
  {
    icon: FiDollarSign,
    title: "Financial Support",
    description:
      "Help individuals and families with their financial needs.",
    image: "/images/financial-support.jpg",
    imageAlt: "Someone offering financial support to another person",
    link: "/help-seekers",
    action: "Donate Money",
    color: "bg-[#E8F2F5] text-[#0F4C5C]",
  },
  {
    icon: FiPackage,
    title: "Essential Items",
    description:
      "Provide food, clothing, books and other daily essentials.",
    image: "/images/essential-items.jpg",
    imageAlt: "A box filled with donated food and essential supplies",
    link: "/help-seekers",
    action: "Explore Needs",
    color: "bg-[#FFF0E8] text-[#C66B36]",
  },
  {
    icon: FiUsers,
    title: "Community Campaigns",
    description:
      "Join collective efforts and support ongoing causes.",
    image: "/images/community-campaigns.jpg",
    imageAlt: "Volunteers helping people in their community",
    link: "/campaigns",
    action: "View Campaigns",
    color: "bg-[#E8F2F5] text-[#0F4C5C]",
    comingSoon: true,
  },
];

const MoreWaysToHelp = () => {
  return (
    <section className="bg-[#F8F9FA] py-8 w-11/12 mx-auto">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E36414]">
            More Ways to Help
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F4C5C] md:text-4xl">
            Every Kindness Makes an Impact.
          </h2>

          <p className="mt-4 text-base leading-7 text-[#526477]">
            Support people in different ways — through financial aid,
            essential items, or community campaigns.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {helpOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Card
                key={option.title}
                className="group overflow-hidden border border-[#E5E9ED] bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={option.image}
                    alt={option.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {option.comingSoon && (
                    <span className="absolute right-3 top-3 rounded-full bg-[#FFF0E8] px-3 py-1.5 text-xs font-semibold text-[#C66B36]">
                      Coming Soon
                    </span>
                  )}
                </div>

                <Card.Content className="gap-4 p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${option.color}`}
                  >
                    <Icon size={24} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-[#1D2D44]">
                      {option.title}
                    </h3>

                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#64748B]">
                      {option.description}
                    </p>
                  </div>

                  {option.comingSoon ? (
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#C66B36]">
                      <FiClock size={17} />
                      Coming Soon
                    </div>
                  ) : (
                    <Link
                      href={option.link}
                      className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#0F4C5C] transition-colors hover:text-[#E36414]"
                    >
                      {option.action}
                      <FiArrowUpRight size={17} />
                    </Link>
                  )}
                </Card.Content>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoreWaysToHelp;
