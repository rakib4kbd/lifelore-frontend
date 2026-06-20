"use client";

import React, { useState } from "react";
import { BookOpen, Trash2 } from "lucide-react";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";

const AdminManageLessons = ({
  publicLessonCount,
  privateLessonCount,
  reportedLessonCount,
  initialLessons,
}) => {
  const [lessons, setLessons] = useState(initialLessons || []);
  const [loading, setLoading] = useState(false);

  const handleToggleFeatured = async (lessonId, currentValue) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/admin/lessons/${lessonId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isFeatured: !currentValue,
          }),
        },
      );

      if (!res.ok) {
        throw new Error();
      }

      setLessons((prev) =>
        prev.map((lesson) =>
          lesson._id === lessonId
            ? {
                ...lesson,
                isFeatured: !currentValue,
              }
            : lesson,
        ),
      );

      showSuccessToast(
        `${!currentValue ? "Added to Featured" : "Removed from Featured List"} `,
      );
    } catch (error) {
      showAlertToast("Failed to update featured status");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReviewed = async (lessonId, currentValue) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/admin/lessons/${lessonId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isReviewed: !currentValue,
          }),
        },
      );

      if (!res.ok) {
        throw new Error();
      }

      setLessons((prev) =>
        prev.map((lesson) =>
          lesson._id === lessonId
            ? {
                ...lesson,
                isReviewed: !currentValue,
              }
            : lesson,
        ),
      );

      showSuccessToast(
        `${!currentValue ? "Lesson marked as reviewed" : "Lesson marked as not reviewed"} `,
      );
    } catch (error) {
      showAlertToast("Failed to update review status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId, title) => {
    const confirmed = window.confirm(`Delete "${title}" permanently?`);

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/${lessonId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error();
      }

      setLessons((prev) => prev.filter((lesson) => lesson._id !== lessonId));

      showSuccessToast("Lesson deleted successfully");
    } catch (error) {
      showAlertToast("Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };

  const lessonStats = [
    { label: "Public Lessons", count: publicLessonCount },
    { label: "Private Lessons", count: privateLessonCount },
    { label: "Reported Lessons", count: reportedLessonCount },
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {lessonStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 flex items-center justify-between text-xs"
          >
            <span className="text-slate-400">{stat.label}:</span>

            <span className="font-bold text-indigo-600 font-mono">
              {stat.count} lessons
            </span>
          </div>
        ))}
      </div>

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

                <td className="p-3">
                  <button
                    onClick={() =>
                      handleToggleFeatured(lesson._id, lesson.isFeatured)
                    }
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9.5px] font-bold rounded-lg border-2 uppercase font-mono transition-colors ${
                      lesson.isFeatured
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/25"
                        : "bg-slate-50 text-slate-400 border-slate-150"
                    }`}
                  >
                    {lesson.isFeatured ? "Featured ⭐" : "Regular"}
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      handleToggleReviewed(lesson._id, lesson.isReviewed)
                    }
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9.5px] font-bold rounded-lg border-2 uppercase font-mono transition-colors ${
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
                    onClick={() => handleDeleteLesson(lesson._id, lesson.title)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/25 rounded-lg border border-slate-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}

            {lessons.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-400">
                  No lessons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageLessons;
