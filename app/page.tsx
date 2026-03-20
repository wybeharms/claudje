import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import ReportPreview from "@/components/landing/ReportPreview";
import WhoItsFor from "@/components/landing/WhoItsFor";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="mx-auto max-w-5xl px-6"><div className="h-px bg-border-silver" /></div>
        <HowItWorks />
        <ReportPreview />
        <div className="mx-auto max-w-5xl px-6"><div className="h-px bg-border-silver" /></div>
        <WhoItsFor />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
