"use client";

import { useForm } from "react-hook-form";
import { Award, Globe, Settings } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";
import Image from "next/image";

const DashboardProfile = ({ user, stats }) => {
  const loading = false;
  const loadingLessons = false;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      image: user?.image || "",
    },
  });

  const previewName = watch("name");
  const previewImage = watch("image");

  const onSubmit = async (formData) => {
    {
      const { error } = await authClient.updateUser({
        name: formData.name,
        image: formData.image,
      });
      if (error) {
        showAlertToast(`Error updating profile: ${error.message}`);
      } else {
        showSuccessToast("Profile updated successfully.");
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white">
          <Settings className="h-5 w-5" />
          Manage Personal Profile
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Modify your profile identity and review your public wisdom portfolio.
        </p>
      </div>

      {/* Form + Preview */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7 rounded-none border border-zinc-800 bg-zinc-950 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wide text-zinc-400">
                Registered Email
              </label>

              <input
                disabled
                value={user?.email}
                className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-500 outline-none"
              />

              <p className="text-xs text-zinc-500">
                Account email cannot be changed.
              </p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wide text-zinc-400">
                Display Name
              </label>

              <input
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-700"
              />

              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Avatar */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wide text-zinc-400">
                Avatar Image URL
              </label>

              <input
                {...register("image")}
                placeholder="https://..."
                className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-700"
              />

              {errors.image && (
                <p className="text-xs text-red-500">{errors.image.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-none border border-zinc-800 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200 transition hover:bg-zinc-900 disabled:opacity-50"
            >
              {loading ? "UPDATING PROFILE..." : "UPDATE PROFILE"}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-5 rounded-none border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex flex-col items-center text-center">
            <figure className="relative w-20 h-20">
              <Image
                src={
                  previewImage ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                }
                alt="preview"
                fill
                className="h-24 w-24 rounded-full object-cover ring-1 ring-zinc-800"
              />
            </figure>

            <h3 className="mt-4 text-lg font-bold text-white">
              {previewName || "Unnamed User"}
            </h3>

            <p className="mt-1 text-xs text-zinc-500">{user?.email}</p>

            <div className="mt-4">
              {user?.isPremium ? (
                <span className="inline-flex items-center gap-2 rounded-none border border-amber-500 px-3 py-1 text-xs text-amber-500">
                  <Award className="h-3.5 w-3.5" />
                  Premium Member
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-none border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                  Standard Account
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Public Lessons */}
      <div className="rounded-none border border-zinc-800 bg-zinc-950">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white">
            <Globe className="h-4 w-4" />
            My Public Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-5 rounded-none border border-editorial-bg dark:border-editorial-bg space-y-2 ${stat.color}`}
            >
              <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest font-mono">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400">{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
