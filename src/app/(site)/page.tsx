import HeroIntro from "@/components/home/HeroIntro";
import HeroPanels from "@/components/home/HeroPanels";
import Portfolio from "@/components/home/Portfolio";
import Cases from "@/components/home/Cases";
import Counters from "@/components/home/Counters";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroIntro />
      <HeroPanels />
      <Portfolio />
      <Cases />
      <Counters />
      <Process />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
