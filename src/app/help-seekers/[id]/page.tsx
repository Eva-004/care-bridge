
"use client";

import RequestAttachment from "@/components/helpRequests/RequestAttachment";
import { Card } from "@heroui/react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaUserCircle,
  FaPhone,
  FaCalendarAlt,
  FaFileAlt,
  FaCapsules,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaExclamationCircle,
} from "react-icons/fa";


const HelpSeekerDetailsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-6">

        <Link
          href="/help-seekers"
          className="inline-flex items-center gap-2 rounded-full border border-[#DCE8EA] bg-white px-5 py-3 text-sm font-medium text-[#0F4C5C] transition hover:bg-[#EFF6F6]"
        >
          <FaArrowLeft />
          Back to Seekers
        </Link>

        <Card className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">

          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#E5F2F2]">
                <FaUserCircle className="text-6xl text-[#0F4C5C]" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-[#1D2D44] sm:text-3xl">
                  Charle Janson
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 sm:text-base">
                  <span className="flex items-center gap-2">
                    <FaPhone className="text-[#0F4C5C]" />
                    01712345432
                  </span>

                  <span className="hidden h-5 w-px bg-gray-300 sm:block" />

                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-[#0F4C5C]" />
                    03 Nov, 2026
                  </span>
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold capitalize text-red-600">
              <FaExclamationCircle />
              Critical
            </span>
          </div>

          <div className="space-y-6 py-6">

            <section>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4F4]">
                  <FaFileAlt className="text-lg text-[#0F4C5C]" />
                </div>

                <h2 className="text-lg font-bold text-[#1D2D44]">
                  Description
                </h2>
              </div>

              <p className="pl-1 text-sm leading-7 text-gray-600 sm:pl-[52px] sm:text-base">
                My father is suffering from a serious illness and needs
                regular medication. We cannot afford to buy all the
                necessary medicines. I am requesting direct medicine
                support.
              </p>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-5 rounded-xl bg-[#F3F7F8] p-5">
                <FaCapsules className="shrink-0 text-4xl text-[#0F4C5C]" />

                <div>
                  <p className="text-sm text-gray-500">Support Type</p>
                  <h3 className="mt-1 text-lg font-bold text-[#1D2D44]">
                    In-kind
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-xl bg-[#F3F7F8] p-5">
                <FaBoxOpen className="shrink-0 text-4xl text-[#E36414]" />

                <div>
                  <p className="text-sm text-gray-500">Needs</p>
                  <h3 className="mt-1 text-lg font-bold text-[#1D2D44]">
                    Medicine
                  </h3>
                </div>
              </div>
            </section>

            <section className="flex items-center gap-4 border-b border-gray-100 pb-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF1E8]">
                <FaMapMarkerAlt className="text-xl text-[#E36414]" />
              </div>

              <div>
                <h2 className="font-bold text-[#1D2D44]">
                  Location
                </h2>
                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                  Savar, Dhaka
                </p>
              </div>
            </section>

            <RequestAttachment  />

          </div>
        </Card>
      </div>
    </div>
  );
};

export default HelpSeekerDetailsPage;
