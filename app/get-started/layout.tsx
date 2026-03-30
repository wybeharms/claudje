import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started — Try claudje Free for 14 Days",
  description:
    "Sign up for claudje and get your first competitor intelligence report within 24 hours. 14-day free trial, no credit card required. Plans from €60/mo.",
  alternates: { canonical: "/get-started" },
  openGraph: {
    title: "Get Started — Try claudje Free for 14 Days",
    description:
      "Sign up and get your first competitor report within 24 hours. 14-day free trial.",
    url: "https://claudje.com/get-started",
  },
};

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
