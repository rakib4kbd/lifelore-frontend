"use client";

import { useForm } from "react-hook-form";
import { Shield, Settings, Globe } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";
import Image from "next/image";
import { useState } from "react";

const AdminProfile = ({ user, stats }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: user?.name || "", image: user?.image || "" },
  });

  const previewName = watch("name");
  const previewImage = watch("image");

  const onSubmit = async (formData) => {
    setLoading(true);
    const { error } = await authClient.updateUser({
      name: formData.name,
      image: formData.image,
    });
    setLoading(false);
    if (error) showAlertToast(`Error updating profile: ${error.message}`);
    else showSuccessToast("Admin profile updated successfully.");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white font-serif">
          <Settings className="h-5 w-5" />
          Admin Moderator Specifications
        </h2>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          Edit display name, photoroll URLs, and check active moderation
          counters.
        </p>
      </div>

      {/* Form + Preview */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Account Email Address (Static)
              </label>
              <input
                disabled
                value={user?.email}
                className="w-full border-2 border-black/30 dark:border-white/30 bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm text-neutral-400 outline-none rounded-none opacity-60"
              />
              <p className="text-[10px] text-neutral-400 font-sans">
                Account email cannot be changed.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Moderator Display Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm text-black dark:text-white outline-none focus:border-black rounded-none"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Profile Photo URL
              </label>
              <input
                {...register("image")}
                placeholder="https://..."
                className="w-full border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm font-mono text-[11px] text-black dark:text-white outline-none focus:border-black rounded-none placeholder:text-neutral-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white px-5 py-3 text-[11px] font-black uppercase tracking-widest rounded-none transition-colors disabled:opacity-50"
            >
              {loading ? "SAVING..." : "Save Admin Specifications"}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-5 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card p-6 flex flex-col items-center justify-center text-center space-y-4">
          <figure className="relative w-32 h-32 rounded-full border-2 border-black dark:border-white overflow-hidden">
            <Image
              src={
                previewImage ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
              }
              alt="Admin"
              fill
              className="object-cover"
            />
          </figure>
          <div>
            <h3 className="font-serif font-black text-lg text-black dark:text-white">
              {previewName || "Unnamed Admin"}
            </h3>
            <p className="mt-1 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
              {user?.email}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
            <Shield className="w-3 h-3" /> Level 1 System Concierge
          </span>
        </div>
      </div>

      {/* Admin Stats */}
      <div className="border-2 border-black dark:border-white">
        <div className="border-b-2 border-black dark:border-white px-6 py-4 bg-editorial-card dark:bg-editorial-dark-card">
          <h3 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black dark:text-white">
            <Globe className="h-4 w-4" /> Moderation Overview
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {stats.slice(0, 3).map((stat, index) => (
            <div
              key={index}
              className={`p-5 space-y-2 border-black dark:border-white ${index < 2 ? "border-b-2 sm:border-b-0 sm:border-r-2" : ""}`}
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-black dark:text-white font-serif">
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-400 font-sans">
                  {stat.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
