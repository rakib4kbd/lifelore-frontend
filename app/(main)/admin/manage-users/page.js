import AdminManageUsers from "@/components/AdminDashboard/AdminManageUsers";
import { auth } from "@/lib/auth";
import { fetchAllUsers, fetchUsersWithLessonCount } from "@/lib/fetchData";
import { Users } from "lucide-react";
import { headers } from "next/headers";

const ManageUsers = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  const loading = false;
  const usersList = await fetchUsersWithLessonCount();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white">
          <Users className="h-5 w-5" />
          Platform Membership Registry
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Audit users, manage permissions, premium access and moderation
          actions.
        </p>
      </div>

      {loading ? (
        <div className="rounded-none border border-zinc-800 bg-zinc-950 py-16">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-300" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-none border border-zinc-800 bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full table">
              <thead>
                <tr className="border-b-2 border-black bg-black text-[10px] uppercase tracking-[0.2em] text-white dark:border-white dark:bg-white dark:text-black">
                  <th className="px-5 py-4 text-left">User</th>
                  <th className="px-5 py-4 text-left">Email</th>
                  <th className="px-5 py-4 text-left">Role</th>
                  <th className="px-5 py-4 text-left">Plan</th>
                  <th className="px-5 py-4 text-center">Lessons</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {usersList.map((target, index) => (
                  <AdminManageUsers
                    key={target._id}
                    user={user}
                    target={target}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
