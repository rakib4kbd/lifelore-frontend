import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardAside from "@/components/Dashboard/DashboardAside";
import { redirect } from "next/navigation";

export const metadata = {
  title: "LifeLore — Dashboard",
  description: "LifeLore is a platform for sharing and discovering life experiences.",
};

export default async function DashboardLayout({ children }) {
  const { user } = (await auth.api.getSession({ headers: await headers() })) || {};
  if (!user) redirect("/auth/login");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 md:my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
      <DashboardAside user={user} />
      <div className="flex-1 min-w-0 w-full">{children}</div>
    </div>
  );
}
