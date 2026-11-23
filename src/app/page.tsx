import Banner from "@/components/homePage/Banner";
import HowItWorks from "@/components/homePage/HowItWorks";
import MoreWaysToHelp from "@/components/homePage/MoreWaysToHelp";
import WhyCareBridge from "@/components/homePage/WhyCareBridge";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Banner/>
    <HowItWorks/>
    <WhyCareBridge/>
    <MoreWaysToHelp/>
    </>
  );
}
