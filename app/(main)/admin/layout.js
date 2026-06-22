import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { roleAccess } from "@/lib/roleAccess";
import AdminDashboardAside from "@/components/Dashboard/AdminDashboardAside";

export const metadata = {
  title: "LifeLore — Admin",
  description:
    "LifeLore is a platform for sharing and discovering life experiences.",
};

export default async function AdminLayout({ children }) {
  const { user } = await auth.api.getSession({ headers: await headers() });
  if (!user) redirect("/auth/login");

  await roleAccess("admin");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 md:my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
      <AdminDashboardAside user={user} />
      <div className="flex-1 min-w-0 w-full">{children}</div>
    </div>
  );
}
