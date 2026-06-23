"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle, Lock } from "lucide-react";
import showSuccessToast from "@/lib/showSuccessToast";
import showAlertToast from "@/lib/showAlertToast";
import { authClient } from "@/lib/auth-client";

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
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      if (!res.ok) throw new Error(data.error || "Failed to persist lesson.");
      showSuccessToast("Wisdom logged successfully in secure cloud ledger!");
      reset();
    } catch (err) {
      showAlertToast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm text-black dark:text-white outline-none focus:border-black rounded-none placeholder:text-neutral-400";
  const labelClass =
    "block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1.5";

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white font-serif">
          <PlusCircle className="h-5 w-5" />
          Deposit Mindful Wisdom Log
        </h2>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          Capture lessons learned from mistakes, relationship breakthroughs, or
          work philosophies securely.
        </p>
      </div>

      <div className="border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg p-6">
        <form onSubmit={handleSubmit(handleCreateSubmit)} className="space-y-5">
          <div>
            <label className={labelClass}>Lesson Topic Title</label>
            <input
              type="text"
              placeholder="e.g. Rejecting the Hustle Culture"
              {...register("title", { required: "Title is required" })}
              className={fieldClass}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Lesson Category</label>
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
            <label className={labelClass}>Full Insight Story</label>
            <p className="text-[10px] text-neutral-400 mb-2 font-sans">
              Explain the background, trigger, mistake made and the actionable
              takeaway.
            </p>
            <textarea
              rows={6}
              placeholder="Introduce the situation, explain what occurred, the exact realization, and how it redirects future action..."
              {...register("description", {
                required: "Description is required",
              })}
              className={fieldClass}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Draft Visibility</label>
              <select {...register("visibility")} className={fieldClass}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div>
              <label className={`${labelClass} flex items-center gap-2`}>
                Access Level
                {!user?.isPremium && (
                  <Lock className="h-3.5 w-3.5 text-amber-500" />
                )}
              </label>
              <select
                disabled={!user?.isPremium && user?.role !== "admin"}
                {...register("accessLevel")}
                className={`${fieldClass} disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <option value="Free">Free (Accessible to all visitors)</option>
                {(user?.isPremium || user?.role === "admin") && (
                  <option value="Premium">Premium ⭐ (Members only)</option>
                )}
              </select>
              {!user?.isPremium && user?.role !== "admin" && (
                <p className="text-[10px] text-amber-500 mt-1 font-bold">
                  🔒 Upgrade to Premium to create Premium-only lessons.
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white px-4 py-3 text-[11px] font-black uppercase tracking-widest rounded-none transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "RECORDING WISDOM..." : "REGISTER INSIGHT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
