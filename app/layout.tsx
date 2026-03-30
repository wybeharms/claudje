import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "claudje — Competitor Intelligence for SMBs",
  description:
    "claudje monitors your competitors' pricing, reviews, web activity, and public filings — and delivers a clear AI-generated report straight to your inbox. Starting at €60/mo.",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://claudje.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "claudje — Competitor Intelligence for SMBs",
    description:
      "Know what your competitors are doing. Every week. AI-powered competitor monitoring starting at €60/mo.",
    type: "website",
    url: "https://claudje.com",
    siteName: "claudje",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "claudje — Competitor Intelligence for SMBs",
    description:
      "Know what your competitors are doing. Every week. AI-powered competitor monitoring starting at €60/mo.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://claudje.com/#organization",
      name: "claudje",
      url: "https://claudje.com",
      logo: "https://claudje.com/favicon.svg",
      email: "info@claudje.com",
      description:
        "AI-powered competitor intelligence service for SMBs. Monitors competitors' pricing, reviews, web activity, and public filings.",
      founder: {
        "@type": "Person",
        name: "Berend Harms",
        jobTitle: "Co-founder",
        sameAs: "https://www.linkedin.com/in/berend-harms-905609209/",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://claudje.com/#website",
      url: "https://claudje.com",
      name: "claudje",
      publisher: { "@id": "https://claudje.com/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://claudje.com/#product",
      name: "claudje",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI-powered competitor intelligence that monitors pricing, reviews, web activity, and public filings — delivered as a weekly report.",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "60",
          priceCurrency: "EUR",
          billingIncrement: 1,
          description:
            "5 competitors monitored, weekly report, pricing intelligence, web monitoring, review tracking",
          url: "https://claudje.com/#pricing",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "100",
          priceCurrency: "EUR",
          billingIncrement: 1,
          description:
            "10 competitors monitored, daily reports, company registry data, LinkedIn tracking, search trend analysis, priority support",
          url: "https://claudje.com/#pricing",
        },
      ],
      provider: { "@id": "https://claudje.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${jakarta.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
