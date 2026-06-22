import AdminManageUsers from "@/components/AdminDashboard/AdminManageUsers";
import { auth } from "@/lib/auth";
import { fetchUsersWithLessonCount } from "@/lib/fetchData";
import { Users } from "lucide-react";
import { headers } from "next/headers";

const ManageUsers = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  const usersList = await fetchUsersWithLessonCount();

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

      <div className="overflow-hidden border-2 border-black dark:border-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black dark:border-white bg-black text-[10px] font-black uppercase tracking-widest text-white dark:bg-white dark:text-black">
                <th className="px-5 py-4 text-left">User</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-left">Role</th>
                <th className="px-5 py-4 text-left">Plan</th>
                <th className="px-5 py-4 text-center">Lessons</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((target, index) => (
                <AdminManageUsers key={target._id} user={user} target={target} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
