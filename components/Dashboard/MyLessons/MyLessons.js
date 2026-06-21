"use client";
import { X } from "lucide-react";
import { Edit } from "lucide-react";
import { Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import MyLessonsTableRow from "./MyLessonsTableRow";
import { Filter } from "lucide-react";
import { useForm } from "react-hook-form";

const MyLessons = ({ lessons, user }) => {
  const [loading, setLoading] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);

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
    console.log(data);
    // Update lesson here
  };

  return (
    <>
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
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl text-left space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="font-bold text-base text-slate-800 dark:text-white flex items-center gap-1.5">
                <Edit className="w-5 h-5 text-indigo-500" />
                Modify Logged Wisdom
              </h3>
              <button
                onClick={() => setEditingLesson(null)}
                className="text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                  Title
                </label>

                <input
                  {...register("title", {
                    required: "Title is required",
                  })}
                  className="w-full border border-zinc-800 bg-black px-4 py-3 text-zinc-200 outline-none focus:border-zinc-600"
                />

                {errors.title && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                    Category
                  </label>

                  <select
                    {...register("category")}
                    className="w-full border border-zinc-800 bg-black px-4 py-3 text-zinc-200 outline-none focus:border-zinc-600"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                    Emotional Tone
                  </label>

                  <select
                    {...register("emotionalTone")}
                    className="w-full border border-zinc-800 bg-black px-4 py-3 text-zinc-200 outline-none focus:border-zinc-600"
                  >
                    {emotionalTones.map((tone) => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                  Description
                </label>

                <textarea
                  rows={6}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full border border-zinc-800 bg-black p-4 text-zinc-200 outline-none focus:border-zinc-600"
                />

                {errors.description && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-500">
                    Visibility
                  </label>

                  <select
                    {...register("visibility")}
                    className="w-full border border-zinc-800 bg-black px-4 py-3 text-zinc-200 outline-none focus:border-zinc-600"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-wide">
                    Access Level
                    {!user?.isPremium && (
                      <Lock className="h-4 w-4 text-amber-500" />
                    )}
                  </label>

                  <select
                    disabled={!user?.isPremium && user?.role !== "admin"}
                    {...register("accessLevel")}
                    className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="Free">
                      Free (Accessible to all visitors)
                    </option>

                    {(user?.isPremium || user?.role === "admin") && (
                      <option value="Premium">Premium ⭐ (Members only)</option>
                    )}
                  </select>

                  {!user?.isPremium && user?.role !== "admin" && (
                    <p className="text-xs text-amber-500">
                      🔒 Upgrade to Premium to create Premium-only lessons.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
                <button
                  type="button"
                  className="border border-zinc-800 px-5 py-2 text-zinc-400 hover:border-zinc-600 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-white px-5 py-2 font-medium text-black hover:bg-zinc-200"
                >
                  Save Changes
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
