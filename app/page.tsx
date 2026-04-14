import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyClaudje from "@/components/landing/WhyClaudje";
import ReportPreview from "@/components/landing/ReportPreview";
import Pricing from "@/components/landing/Pricing";
import BookCall from "@/components/landing/BookCall";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <WhyClaudje />
        <ReportPreview />
        <BookCall />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
