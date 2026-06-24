import AdminUsersTable from "@/components/AdminDashboard/AdminUsersTable";
import { auth } from "@/lib/auth";
import { fetchUsersWithLessonCount } from "@/lib/fetchData";
import getToken from "@/lib/getToken";
import { Users } from "lucide-react";
import { headers } from "next/headers";

const ManageUsers = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  const token = await getToken();
  const usersList = await fetchUsersWithLessonCount(token);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="flex items-center gap-2 text-xl font-serif font-black uppercase tracking-widest text-black dark:text-white">
          <Users className="h-5 w-5" />
          Platform Membership Registry
        </h2>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          Audit users, manage permissions, premium access and moderation actions.
        </p>
      </div>
      <AdminUsersTable usersList={usersList} user={user} />
    </div>
  );
};

export default ManageUsers;
