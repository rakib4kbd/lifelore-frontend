"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Lock } from "lucide-react";

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
      creatorImage: user?.image,
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white">
          <PlusCircle className="h-5 w-5" />
          Deposit Mindful Wisdom Log
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Capture lessons learned from mistakes, relationship breakthroughs, or
          work philosophies securely.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-none border border-zinc-800 bg-zinc-950 p-6">
        <form onSubmit={handleSubmit(handleCreateSubmit)} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-xs text-zinc-400 uppercase tracking-wide">
              Lesson Topic Title
            </label>

            <input
              type="text"
              placeholder="e.g. Rejecting the Hustle Culture"
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-700"
            />

            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Category + Tone */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs text-zinc-400 uppercase tracking-wide">
                Lesson Category
              </label>

              <select
                {...register("category")}
                className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-zinc-700"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-zinc-400 uppercase tracking-wide">
                Emotional Tone
              </label>

              <select
                {...register("emotionalTone")}
                className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-zinc-700"
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
            <label className="block text-xs text-zinc-400 uppercase tracking-wide">
              Full Insight Story
            </label>

            <p className="text-xs text-zinc-500">
              Explain the background, trigger, mistake made and the actionable
              takeaway.
            </p>

            <textarea
              rows={6}
              placeholder="Introduce the situation, explain what occurred, the exact realization, and how it redirects future action..."
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-700"
            />

            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Visibility + Access */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs text-zinc-400 uppercase tracking-wide">
                Draft Visibility
              </label>

              <select
                {...register("visibility")}
                className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 outline-none transition focus:border-zinc-700"
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
                <option value="Free">Free (Accessible to all visitors)</option>

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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-none border border-zinc-800 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200 transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "RECORDING WISDOM..." : "REGISTER INSIGHT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
