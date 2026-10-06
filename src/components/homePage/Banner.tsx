import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiUsers } from "react-icons/fi";
import { HiOutlineHandRaised } from "react-icons/hi2";

const Banner = () => {
  return (
    <section className="bg-[#F8F9FA] w-11/12 mx-auto py-4">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-0.5 w-8 bg-[#E36414]" />
            <p className="text-sm font-medium uppercase tracking-wide text-[#0F4C5C]">
              Together We Can Make A Difference
            </p>
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-tight text-[#0F4C5C] md:text-5xl">
            Helping People,
            <br />
            Making a Difference
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-[#1D2D44]/75">
            CareBridge brings people who need help together with those who are ready to help, creating a simple way to support others and make a difference.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/get-help"
              className="flex items-center gap-2 rounded-lg bg-[#FB8B24] px-6 py-3 font-medium text-white transition hover:bg-[#E36414]"
            >
              Get Help
              <FiArrowRight />
            </Link>

            <Link
              href="/help-requests"
              className="flex items-center gap-2 rounded-lg border border-[#0F4C5C] px-6 py-3 font-medium text-[#0F4C5C] transition hover:bg-[#0F4C5C] hover:text-white"
            >
              Explore Help Requests
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[40%_10%_40%_10%]">
            <Image
              src="/images/banner.png"
              alt="People helping each other"
              width={700}
              height={500}
              className="h-[300px] w-full object-cover md:h-[400px]"
            />
          </div>

          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0F4C5C] shadow-md">
            <HiOutlineHandRaised className="text-xl text-[#E36414]" />
            Your Support Matters
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-4 md:p-7">
        <div className="flex items-center gap-3">
          <FiUsers className="text-3xl text-[#0F4C5C]" />
          <div>
            <h3 className="font-bold text-[#0F4C5C]">1,250+</h3>
            <p className="text-sm text-[#1D2D44]/60">People Helped</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiHeart className="text-3xl text-[#E36414]" />
          <div>
            <h3 className="font-bold text-[#0F4C5C]">850+</h3>
            <p className="text-sm text-[#1D2D44]/60">Help Requests</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HiOutlineHandRaised className="text-3xl text-[#0F4C5C]" />
          <div>
            <h3 className="font-bold text-[#0F4C5C]">320+</h3>
            <p className="text-sm text-[#1D2D44]/60">Successful Donations</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FiHeart className="text-3xl text-[#E36414]" />
          <div>
            <h3 className="font-bold text-[#0F4C5C]">100%</h3>
            <p className="text-sm text-[#1D2D44]/60">Verified Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;