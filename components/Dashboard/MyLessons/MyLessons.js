"use client";
import { X, Edit, Lock, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyLessonsTableRow from "./MyLessonsTableRow";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

const MyLessons = ({ lessons, user }) => {
  const [loading, setLoading] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const router = useRouter();

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
      router.refresh();
      reset();
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

  return (
    <>
      {/* Filters */}
      {/* <div className="flex flex-wrap items-center gap-4 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card p-4">
        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500">
          <Filter className="h-3.5 w-3.5" /> Filter collection
        </span>
        <select className="border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg px-3 py-1.5 text-xs text-black dark:text-white outline-none rounded-none">
          <option>All Categories</option>
        </select>
        <select className="border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg px-3 py-1.5 text-xs text-black dark:text-white outline-none rounded-none">
          <option>All Visibility</option>
        </select>
      </div> */}

      {loading ? (
        <div className="border-2 border-black dark:border-white py-16 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-black dark:border-white" />
        </div>
      ) : lessons.length === 0 ? (
        <div className="border-2 border-dashed border-black/30 dark:border-white/30 p-10 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-serif italic">
            "No wisdom entries found in your ledger yet."
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border-2 border-black dark:border-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-widest">
                  <th className="px-5 py-4 text-left">Title</th>
                  <th className="px-5 py-4 text-left">Category</th>
                  <th className="px-5 py-4 text-left">Visibility</th>
                  <th className="px-5 py-4 text-left">Access</th>
                  <th className="px-5 py-4 text-left">Stats</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {lessons.map((lesson, index) => (
                  <MyLessonsTableRow
                    key={lesson._id}
                    lesson={lesson}
                    index={index}
                    user={user}
                    setEditingLesson={setEditingLesson}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyLessons;
