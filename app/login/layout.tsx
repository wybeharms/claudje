import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In — claudje",
  description: "Log in to your claudje competitor intelligence portal.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
