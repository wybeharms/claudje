import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import PortalShell from "@/components/portal/PortalShell";

export const metadata = {
  title: "Portal - claudje",
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role ?? "customer";
  const customerId = session.user.customerId ?? "";

  return (
    <PortalShell
      userName={session.user.name ?? session.user.email ?? "User"}
      userEmail={session.user.email ?? ""}
      defaultCustomerId={customerId}
      role={role}
    >
      {children}
    </PortalShell>
  );
}
