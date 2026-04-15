import type { Metadata } from "next";
import ProductPageContent from "@/components/landing/ProductPageContent";

export const metadata: Metadata = {
  title: "Product — claudje Competitor Intelligence",
  description:
    "See what claudje delivers: weekly competitor reports covering pricing, reviews, advertising, hiring, and more. Managed AI agents do the research, a human analyst reviews every report.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Product — claudje Competitor Intelligence",
    description:
      "Weekly competitor intelligence reports powered by managed AI agents. Pricing, reviews, ads, hiring, and more.",
    url: "https://claudje.com/product",
  },
};

export default function ProductPage() {
  return <ProductPageContent />;
}
