import { redirect } from "next/navigation";

const DashboardPage = async () => {
  redirect("/dashboard/overview");
};

export default DashboardPage;
