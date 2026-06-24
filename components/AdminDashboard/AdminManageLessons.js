"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Trash2 } from "lucide-react";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 10;
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";
import Link from "next/link";
import { Edit } from "lucide-react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { fetchAdminLessons, fetchLessonById } from "@/lib/fetchData";
import { authClient } from "@/lib/auth-client";

const AdminManageLessons = ({
  publicLessonCount,
  privateLessonCount,
  reportedLessonCount,
  initialLessons,
  user,
}) => {
  const [lessons, setLessons] = useState(initialLessons || []);
  const [loading, setLoading] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const totalPages = Math.ceil(lessons.length / PAGE_SIZE);
  const pagedLessons = lessons.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];
  const emotionalTones = ["Motivational", "Sad", "Realization", "Gratitude"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!editingLesson) return;
    reset({
      title: editingLesson.title,
      description: editingLesson.description,
      category: editingLesson.category,
      emotionalTone: editingLesson.emotionalTone,
      visibility: editingLesson.visibility,
      accessLevel: editingLesson.accessLevel,
    });
  }, [editingLesson, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const lessonId = editingLesson?._id;
      if (!lessonId) return;
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/admin/lessons/${lessonId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        console.error("Failed to update lesson");
        return;
      }
      setEditingLesson(null);
      reset();
      setLoading(true);
      setLessons(
        await fetchAdminLessons(token).then((data) => data.allLessons),
      );
      setLoading(false);
    } catch (err) {
      console.error("Error updating lesson:", err);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-card px-4 py-3 text-sm text-black dark:text-white outline-none focus:border-black rounded-none";
  const labelClass =
    "mb-1.5 block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400";

  const handleToggleFeatured = async (lessonId, currentValue) => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/admin/lessons/${lessonId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isFeatured: !currentValue }),
        },
      );
      if (!res.ok) throw new Error();
      setLessons((prev) =>
        prev.map((l) =>
          l._id === lessonId ? { ...l, isFeatured: !currentValue } : l,
        ),
      );
      showSuccessToast(
        !currentValue ? "Added to Featured" : "Removed from Featured List",
      );
    } catch {
      showAlertToast("Failed to update featured status");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReviewed = async (lessonId, currentValue) => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/admin/lessons/${lessonId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isReviewed: !currentValue }),
        },
      );
      if (!res.ok) throw new Error();
      setLessons((prev) =>
        prev.map((l) =>
          l._id === lessonId ? { ...l, isReviewed: !currentValue } : l,
        ),
      );
      showSuccessToast(
        !currentValue
          ? "Lesson marked as reviewed"
          : "Lesson marked as not reviewed",
      );
    } catch {
      showAlertToast("Failed to update review status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId, title) => {
    if (!window.confirm(`Delete "${title}" permanently?`)) return;
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/${lessonId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error();
      setLessons((prev) => prev.filter((l) => l._id !== lessonId));
      showSuccessToast("Lesson deleted successfully");
    } catch {
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
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="text-xl font-serif font-black text-black dark:text-white flex items-center gap-1.5 uppercase tracking-widest">
          <BookOpen className="w-5 h-5" /> Platform Lesson Moderation Hub
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-sans">
          Feature outstanding reflections dynamically, review files, or
          permanently delete inappropriate posts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {lessonStats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card flex items-center justify-between"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {stat.label}
            </span>
            <span className="font-black text-black dark:text-white font-mono text-lg">
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto border-2 border-black dark:border-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-black text-white dark:bg-white dark:text-black border-b-2 border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
              <th className="p-4">Wisdom Item</th>
              <th className="p-4">Author</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Reviewed</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  <div className="loading"></div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {pagedLessons.map((lesson, idx) => (
                <tr
                  key={lesson._id}
                  className={
                    idx % 2 === 0
                      ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg"
                      : "bg-white dark:bg-editorial-dark-card"
                  }
                >
                  <td className="p-4">
                    <p className="font-bold text-black dark:text-white line-clamp-1">
                      {lesson.title}
                    </p>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {lesson.category} · {lesson.accessLevel} ·{" "}
                      {lesson.visibility}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-500 dark:text-neutral-400 font-mono truncate max-w-[100px]">
                    {lesson.creatorName}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleToggleFeatured(lesson._id, lesson.isFeatured)
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-black border-2 uppercase tracking-widest transition-colors ${
                        lesson.isFeatured
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-500"
                          : "border-black dark:border-white text-neutral-500 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                      }`}
                    >
                      {lesson.isFeatured ? "Featured ⭐" : "Regular"}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleToggleReviewed(lesson._id, lesson.isReviewed)
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-black border-2 uppercase tracking-widest transition-colors ${
                        lesson.isReviewed
                          ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-500"
                          : "border-black dark:border-white text-neutral-500 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                      }`}
                    >
                      {lesson.isReviewed ? "Reviewed" : "Draft"}
                    </button>
                  </td>
                  <td className="p-4 text-right flex gap-2">
                    <Link
                      href={`/lessons/${lesson._id}`}
                      className="p-1.5 border-2 border-black dark:border-white hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      className="p-1.5 border-2 border-black dark:border-white text-orange-400 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
                      onClick={async () => {
                        try {
                          const fresh = await fetchLessonById(lesson._id);
                          setEditingLesson(fresh);
                        } catch {
                          setEditingLesson(lesson);
                        }
                      }}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteLesson(lesson._id, lesson.title)
                      }
                      className="p-1.5 border-2 border-black dark:border-white text-rose-500 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {lessons.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-neutral-400 font-serif italic"
                  >
                    "No lessons found."
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {editingLesson && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-40">
          <div className="bg-editorial-bg dark:bg-editorial-dark-bg border-4 border-black dark:border-white p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto text-left space-y-4">
            <div className="flex justify-between items-center border-b-2 border-black dark:border-white pb-3">
              <h3 className="font-serif font-black text-base uppercase tracking-widest text-black dark:text-white flex items-center gap-1.5">
                <Edit className="w-5 h-5" /> Modify Logged Wisdom
              </h3>
              <button
                onClick={() => setEditingLesson(null)}
                className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  {...register("title", { required: "Title is required" })}
                  className={fieldClass}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Category</label>
                  <select {...register("category")} className={fieldClass}>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Emotional Tone</label>
                  <select {...register("emotionalTone")} className={fieldClass}>
                    {emotionalTones.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={5}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={fieldClass}
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Visibility</label>
                  <select {...register("visibility")} className={fieldClass}>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                <div>
                  <label className={`${labelClass} flex items-center gap-2`}>
                    Access Level{" "}
                    {!user?.isPremium && (
                      <Lock className="h-3.5 w-3.5 text-amber-500" />
                    )}
                  </label>
                  <select
                    disabled={!user?.isPremium && user?.role !== "admin"}
                    {...register("accessLevel")}
                    className={`${fieldClass} disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <option value="Free">Free</option>
                    {(user?.isPremium || user?.role === "admin") && (
                      <option value="Premium">Premium ⭐</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t-2 border-black/10 dark:border-white/10 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="border-2 border-black dark:border-white px-5 py-2 text-[11px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-colors"
                >
                  {loading ? (
                    <div className="w-35 h-5 flex items-center justify-center">
                      <div className="loading"></div>
                    </div>
                  ) : (
                    <div className="w-35 h-5 flex items-center justify-center">
                      Save Changes
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={lessons.length} pageSize={PAGE_SIZE} />
    </div>
  );
};

export default AdminManageLessons;
