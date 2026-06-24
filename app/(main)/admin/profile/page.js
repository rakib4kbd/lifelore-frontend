import AdminProfile from "@/components/AdminDashboard/AdminProfile";
import { fetchAdminStats } from "@/lib/fetchData";
import fetchUserSession from "@/lib/fetchUserSession";
import getToken from "@/lib/getToken";

const AdminProfilePage = async () => {
  const user = await fetchUserSession();
  const token = await getToken();
  const adminStats = await fetchAdminStats(token);

  const stats = [
    {
      label: "Platform Users",
      value: adminStats?.totalUsers || 0,
      subtitle: "Registered members",
    },
    {
      label: "Reported Lessons",
      value: adminStats?.totalReportedLessons || 0,
      subtitle: "Pending review",
    },
    {
      label: "Public Lessons",
      value: adminStats?.totalPublicLessons || 0,
      subtitle: "Active content",
    },
  ];

  return (
    <div>
      <AdminProfile user={user} stats={stats} />
    </div>
  );
};

export default AdminProfilePage;
