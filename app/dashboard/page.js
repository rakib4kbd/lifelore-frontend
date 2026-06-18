import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  if (!user) {
    redirect("/login");
  }
  redirect("/dashboard/overview");
};

export default DashboardPage;
