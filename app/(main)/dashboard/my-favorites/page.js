import { auth } from "@/lib/auth";
import { fetchFavouriteLessonsByUserId } from "@/lib/fetchData";
import { Filter, Heart } from "lucide-react";
import { headers } from "next/headers";

const MyFavouritePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="p-6">
        <div className="rounded-none border border-zinc-800 bg-zinc-950 p-8 text-center">
          <p className="text-sm text-zinc-500">
            Please sign in to view your saved lessons.
          </p>
        </div>
      </div>
    );
  }

  const favouriteLessons = await fetchFavouriteLessonsByUserId(user.id);

  const loading = false;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white">
          <Heart className="h-5 w-5" />
          My Saved Wisdom Portfolios
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Trace wisdom and rules you bookmarked for routine mindful reflection.
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
          <option>All Tones</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="rounded-none border border-zinc-800 bg-zinc-950 py-16">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-300" />
        </div>
      ) : favouriteLessons.length === 0 ? (
        /* Empty State */
        <div className="rounded-none border border-dashed border-zinc-800 bg-zinc-950 p-10 text-center">
          <p className="text-sm text-zinc-500">No saved lessons found.</p>
        </div>
      ) : (
        /* Table */
        <div className="overflow-hidden rounded-none border border-zinc-800 bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full table">
              <thead>
                <tr className="border-b-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-5 py-4 text-left">Insight</th>
                  <th className="px-5 py-4 text-left">Category</th>
                  <th className="px-5 py-4 text-left">Tone</th>
                  <th className="px-5 py-4 text-left">Creator</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {favouriteLessons.map((fav, index) => (
                  <tr
                    key={fav._id}
                    className={`border-b border-black/10 dark:border-white/10 ${
                      index % 2 === 0
                        ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg"
                        : "bg-white dark:bg-editorial-dark-card"
                    }`}
                  >
                    {/* Title */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-black dark:text-white">
                        {fav.title}
                      </div>

                      <p className="mt-1 text-[11px] text-zinc-500">
                        Saved {new Date(fav.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="rounded-none border border-zinc-700 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
                        {fav.category}
                      </span>
                    </td>

                    {/* Tone */}
                    <td className="p-4 text-xs text-zinc-400">
                      {fav.emotionalTone}
                    </td>

                    {/* Creator */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            fav.creatorPhoto ||
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                          }
                          alt={fav.creatorName}
                          className="h-7 w-7 rounded-full object-cover ring-1 ring-zinc-800"
                        />

                        <span className="max-w-[120px] truncate text-xs text-zinc-300">
                          {fav.creatorName}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button className="rounded-none border border-zinc-800 px-3 py-1.5 text-[11px] font-medium text-zinc-300 transition hover:bg-zinc-900">
                          Details
                        </button>

                        <button className="rounded-none border border-zinc-800 px-3 py-1.5 text-[11px] font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100">
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFavouritePage;
