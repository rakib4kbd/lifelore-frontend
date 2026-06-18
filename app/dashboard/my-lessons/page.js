import { auth } from "@/lib/auth";
import { fetchLessonsByCreatorId } from "@/lib/fetchLessons";
import { Layers } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Star } from "lucide-react";
import { Globe } from "lucide-react";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Lock } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const MyLessons = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  if (!user) {
    redirect("/auth/login");
  }

  console.log("my_lessons_user", user);
  const lessons = await fetchLessonsByCreatorId(user?.id);
  console.log("my_lessons", lessons);
  return (
    <div className="max-w-7xl min-w-5xl mx-auto rounded-none border-2 border-black dark:border-white bg-[#FAF9F6] dark:bg-editorial-dark-bg p-2">
      <div className="border-b-4 border-black dark:border-white px-6 py-5">
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white">
          <Layers className="w-5 h-5" />
          My Wisdom Ledger
        </h2>

        <p className="mt-2 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Review, update and manage your registered lessons.
        </p>
      </div>

      {!lessons ? (
        <div className="py-20 flex justify-center">
          <div className="h-10 w-10 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="p-12 text-center">
          <p className="font-black uppercase tracking-widest text-sm text-slate-500">
            No Lessons Found
          </p>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Your ledger is empty. Create your first lesson.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table">
            <thead>
              <tr className="border-b-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase tracking-[0.2em]">
                <th className="px-5 py-4 text-left">Title</th>
                <th className="px-5 py-4 text-left">Category</th>
                <th className="px-5 py-4 text-left">Visibility</th>
                <th className="px-5 py-4 text-left">Access</th>
                <th className="px-5 py-4 text-left">Stats</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson, index) => (
                <tr
                  key={lesson._id}
                  className={`border-b border-black/10 dark:border-white/10 ${
                    index % 2 === 0
                      ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg"
                      : "bg-white dark:bg-editorial-dark-card"
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="font-bold text-black dark:text-white">
                      {lesson.title}
                    </div>

                    <div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="border-2 border-black dark:border-white px-2 py-1 text-[10px] font-black uppercase">
                      {lesson.category}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      className={`px-3 py-1 border-2 text-[10px] font-black uppercase tracking-wide transition-colors ${
                        lesson.visibility === "Public"
                          ? "border-emerald-600 text-emerald-600"
                          : "border-slate-500 text-slate-500"
                      }`}
                    >
                      <Globe className="inline w-3 h-3 mr-1" />
                      {lesson.visibility}
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      className={`px-3 py-1 border-2 text-[10px] font-black uppercase tracking-wide transition-colors ${
                        lesson.accessLevel === "Premium"
                          ? "border-amber-500 text-amber-500"
                          : "border-slate-500 text-slate-500"
                      }`}
                    >
                      <Lock className="inline w-3 h-3 mr-1" />
                      {lesson.accessLevel}
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-xs font-mono space-y-1">
                      <div className="flex items-center gap-1">
                        {lesson.likesCount || 0}
                        <ThumbsUp className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1">
                        {lesson.favoritesCount || 0}
                        <Star className="w-4 h-4" />
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button className="p-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLessons;
