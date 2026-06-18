"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Lock } from "lucide-react";
import showToast from "@/lib/showToast";

const AddLesson = ({ user }) => {
  const [loading, setLoading] = useState(false);

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
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "Personal Growth",
      emotionalTone: "Motivational",
      visibility: "Public",
      accessLevel: "Free",
      creatorId: user?.id,
      creatorName: user?.name,
    },
  });

  const handleCreateSubmit = async (formData) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.id}`,
          },
          body: JSON.stringify({
            ...formData,
            accessLevel:
              user?.isPremium || user?.role === "admin"
                ? formData.accessLevel
                : "Free",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to persist lesson.");
      }

      showToast(
        "Wisdom logged successfully in secure cloud ledger!",
        "success",
      );

      reset();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto rounded-none border-2 border-black dark:border-white bg-[#FAF9F6] dark:bg-editorial-dark-bg p-8">
      <div className="space-y-6 text-left">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-black dark:text-white flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Deposit Mindful Wisdom Log
          </h2>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Capture lessons learned from mistakes, relationship breakthroughs,
            or work philosophies securely.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleCreateSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white block">
              Lesson Topic Title
            </label>

            <input
              type="text"
              placeholder="e.g. Rejecting the Hustle Culture"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-editorial-dark-bg text-black dark:text-white px-4 py-3 text-sm focus:outline-none"
            />

            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Category + Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white block">
                Lesson Category
              </label>

              <select
                {...register("category")}
                className="w-full border-2 border-black dark:border-white bg-white dark:bg-editorial-dark-bg text-black dark:text-white px-4 py-3 text-sm focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white block">
                Emotional Tone
              </label>

              <select
                {...register("emotionalTone")}
                className="w-full border-2 border-black dark:border-white bg-white dark:bg-editorial-dark-bg text-black dark:text-white px-4 py-3 text-sm focus:outline-none"
              >
                {emotionalTones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white block">
              Full Insight Story
            </label>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explain the background, trigger, mistake made and the actionable
              takeaway.
            </p>

            <textarea
              rows={6}
              placeholder="Introduce the situation, explain what occurred, the exact realization, and how it redirects future action..."
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border-2 border-black dark:border-white bg-white dark:bg-editorial-dark-bg text-black dark:text-white px-4 py-3 text-sm focus:outline-none"
            />

            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Visibility + Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white block">
                Draft Visibility
              </label>

              <select
                {...register("visibility")}
                className="w-full border-2 border-black dark:border-white bg-white dark:bg-editorial-dark-bg text-black dark:text-white px-4 py-3 text-sm focus:outline-none"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
                Access Level
                {!user?.isPremium && (
                  <Lock className="w-4 h-4 text-amber-500" />
                )}
              </label>

              <select
                disabled={!user?.isPremium && user?.role !== "admin"}
                {...register("accessLevel")}
                className="w-full border-2 border-black dark:border-white bg-white dark:bg-editorial-dark-bg text-black dark:text-white px-4 py-3 text-sm focus:outline-none"
              >
                <option value="Free">Free (Accessible to all visitors)</option>

                {(user?.isPremium || user?.role === "admin") && (
                  <option value="Premium">Premium ⭐ (Members only)</option>
                )}
              </select>

              {!user?.isPremium && user?.role !== "admin" && (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  🔒 Upgrade to Premium to create Premium-only lessons.
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-editorial-dark-bg hover:border-white hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "RECORDING WISDOM..." : "REGISTER INSIGHT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
