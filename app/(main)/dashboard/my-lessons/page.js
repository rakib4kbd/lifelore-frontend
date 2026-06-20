import MyLessonsTableRow from "@/components/Dashboard/MyLessons/MyLessonsTableRow";
import { auth } from "@/lib/auth";
import { fetchLessonsByCreatorId } from "@/lib/fetchData";
import {
  Layers,
  ThumbsUp,
  Star,
  Globe,
  Edit,
  Trash2,
  Lock,
  Filter,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyLessons = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/auth/login");
  }

  const lessons = await fetchLessonsByCreatorId(user.id);

  const loading = false;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white">
          <Layers className="h-5 w-5" />
          My Wisdom Ledger
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Review, edit and manage your published wisdom lessons.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-none border border-zinc-800 bg-zinc-950 p-4">
        <span className="flex items-center gap-2 text-xs text-zinc-500">
          <Filter className="h-3.5 w-3.5" />
          Filter collection
        </span>

        <select className="rounded-none border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 outline-none transition focus:border-zinc-700">
          <option>All Categories</option>
        </select>

        <select className="rounded-none border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 outline-none transition focus:border-zinc-700">
          <option>All Visibility</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="rounded-none border border-zinc-800 bg-zinc-950 py-16">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-300" />
        </div>
      ) : lessons.length === 0 ? (
        /* Empty State */
        <div className="rounded-none border border-dashed border-zinc-800 bg-zinc-950 p-10 text-center">
          <p className="text-sm text-zinc-500">No lessons found.</p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-none border border-zinc-800 bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full table">
              <thead>
                <tr className="border-b-2 border-black bg-black text-[10px] uppercase tracking-[0.2em] text-white dark:border-white dark:bg-white dark:text-black">
                  <th className="px-5 py-4 text-left">Title</th>
                  <th className="px-5 py-4 text-left">Category</th>
                  <th className="px-5 py-4 text-left">Visibility</th>
                  <th className="px-5 py-4 text-left">Access</th>
                  <th className="px-5 py-4 text-left">Stats</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {lessons.map((lesson, index) => (
                  <MyLessonsTableRow
                    key={lesson._id}
                    lesson={lesson}
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

export default MyLessons;
