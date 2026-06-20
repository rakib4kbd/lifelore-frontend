import { fetchLessonsByCreatorId } from "@/lib/fetchData";
import fetchUserSession from "@/lib/fetchUserSession";
import { BookOpen } from "lucide-react";
import { Trash2 } from "lucide-react";
import React from "react";

const ManageLessonsPage = async () => {
  const user = await fetchUserSession();
  const loading = false;
  const pubCount = 0;
  const privCount = 0;
  const lessons = await fetchLessonsByCreatorId(user.id);
  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
          <BookOpen className="w-5 h-5 text-indigo-505" />
          Platform Lesson Moderation Hub
        </h2>
        <p className="text-xs text-slate-500">
          Feature outstanding reflections dynamically, review files, or
          permanently delete inappropriate posts.
        </p>
      </div>

      {/* Counters summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 flex items-center justify-between text-xs transition-colors">
          <span className="text-slate-400">Total Public Feeds Live:</span>
          <span className="font-bold text-indigo-600 font-mono">
            {pubCount} lessons
          </span>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 flex items-center justify-between text-xs transition-colors">
          <span className="text-slate-400">Private Vault Files Reserved:</span>
          <span className="font-bold text-slate-600 font-mono">
            {privCount} lessons
          </span>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto" />
        </div>
      ) : (
        /* TABLE */
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-901">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-[9px] font-mono uppercase text-slate-400 tracking-widest">
                <th className="p-3">Wisdom Item</th>
                <th className="p-3">Author</th>
                <th className="p-3">Featured Spot</th>
                <th className="p-3">Audit Review</th>
                <th className="p-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {lessons.map((lesson) => (
                <tr
                  key={lesson.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all"
                >
                  <td className="p-3">
                    <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {lesson.title}
                    </p>
                    <span className="text-[10px] text-slate-400 tracking-tight block">
                      {lesson.category} · {lesson.accessLevel} ·{" "}
                      {lesson.visibility}
                    </span>
                  </td>

                  <td className="p-3 text-slate-500 font-medium truncate max-w-[100px]">
                    {lesson.creatorName}
                  </td>

                  {/* Toggle homepage Featured status */}
                  <td className="p-3">
                    <button
                      //   onClick={() =>
                      //     handleToggleFeatured(lesson.id, lesson.isFeatured)
                      //   }
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9.5px] font-bold rounded-lg border-2 uppercase font-mono cursor-pointer transition-colors ${
                        lesson.isFeatured
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/25"
                          : "bg-slate-50 text-slate-400 border-slate-150"
                      }`}
                    >
                      {lesson.isFeatured ? "Featured ⭐" : "Regular"}
                    </button>
                  </td>

                  {/* Reviewed status toggle */}
                  <td className="p-3">
                    <button
                      //   onClick={() =>
                      //     handleToggleReviewed(lesson.id, lesson.isReviewed)
                      //   }
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9.5px] font-bold rounded-lg border-2 uppercase font-mono cursor-pointer transition-colors ${
                        lesson.isReviewed
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/25"
                          : "bg-slate-50 text-slate-400 border-slate-150"
                      }`}
                    >
                      {lesson.isReviewed ? "Reviewed" : "Draft"}
                    </button>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      //   onClick={() =>
                      //     handleDeleteLesson(lesson.id, lesson.title)
                      //   }
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/25 rounded-lg border border-slate-100"
                      title="Delete inappropriate lesson"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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

export default ManageLessonsPage;
