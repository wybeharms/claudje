import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — claudje",
  description: "Reset your claudje account password.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
