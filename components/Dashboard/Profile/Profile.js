"use client";

import { useForm } from "react-hook-form";
import { Award, Globe, Settings } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Heart } from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DashboardProfile = ({ user, stats }) => {
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
    else showSuccessToast("Profile updated successfully.");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white font-serif">
          <Settings className="h-5 w-5" />
          Manage Personal Profile
        </h2>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          Modify your profile identity and review your public wisdom portfolio.
        </p>
      </div>

      {/* Form + Preview */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7 border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Registered Email
              </label>
              <input
                disabled
                value={user?.email}
                className="w-full border-2 border-black dark:border-white/30 bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm text-neutral-500 dark:text-neutral-500 outline-none rounded-none opacity-60"
              />
              <p className="text-[10px] text-neutral-400 font-sans">
                Account email cannot be changed.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Display Name
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
                Avatar Image URL
              </label>
              <input
                {...register("image")}
                placeholder="https://..."
                className="w-full border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm text-black dark:text-white outline-none focus:border-black rounded-none placeholder:text-neutral-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white px-4 py-3 text-[11px] font-black uppercase tracking-widest rounded-none transition-colors disabled:opacity-50"
            >
              {loading ? "UPDATING PROFILE..." : "UPDATE PROFILE"}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-5 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card p-6 flex items-center justify-center">
          <div className="flex flex-col items-center text-center space-y-4">
            <figure className="relative w-40 h-40 rounded-full border-2 border-black dark:border-white overflow-hidden">
              <Image
                src={
                  previewImage ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                }
                alt="preview"
                fill
                className="object-cover rounded-full"
              />
            </figure>
            <div>
              <h3 className="text-lg font-serif font-black text-black dark:text-white">
                {previewName || "Unnamed User"}
              </h3>
              <p className="mt-1 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                {user?.email}
              </p>
            </div>
            <div>
              {user?.isPremium ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
                  <Award className="h-3 w-3" /> Premium Member
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-white text-[9px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                  Standard Account
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-2 border-black dark:border-white">
        <div className="border-b-2 border-black dark:border-white px-6 py-4 bg-editorial-card dark:bg-editorial-dark-card">
          <h3 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black dark:text-white">
            <Globe className="h-4 w-4" /> My Public Insights
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {stats.slice(0, 3).map((stat, index) => (
            <div
              key={index}
              className={`p-5 space-y-2 border-black dark:border-white ${index < stats.length - 1 ? "border-b-2 sm:border-b-0 sm:border-r-2" : ""}`}
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

      {/* Lessons */}
      {stats[3].length > 0 && (
        <div>
          <div className="border-2 border-black dark:border-white px-6 py-4 bg-editorial-card dark:bg-editorial-dark-card mb-3">
            <h3 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black dark:text-white">
              <Globe className="h-4 w-4" /> My Recent Lessons
            </h3>
          </div>
          {stats[3] && (
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr auto-cols-fr gap-6">
              {stats[3].recentlyCreatedLessons.map((lesson, idx) => {
                // Check if blurred/locked
                const isPremium = lesson.accessLevel === "Premium";
                const isViewerPremium =
                  user?.isPremium || user?.role === "admin";
                const isCreator = user?.id === lesson.creatorId;
                const isBlurred = isPremium && !isViewerPremium && !isCreator;

                return (
                  <Link
                    href={isBlurred ? "/pricing" : `/lessons/${lesson._id}`}
                    key={idx}
                    className="group relative flex flex-col justify-between bg-editorial-bg dark:bg-editorial-dark-bg border-2 border-black dark:border-white rounded-none overflow-hidden p-6 text-left hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer"
                  >
                    {/* BLURRED MOCKUP WITH LOCK ELEMENT */}
                    {isBlurred && (
                      <div className="absolute inset-0 bg-editorial-bg/95 dark:bg-editorial-dark-card/95 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black border-2 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
                          <Lock className="w-5 h-5 text-current animate-bounce" />
                        </div>

                        <p className="font-serif font-black text-lg text-black dark:text-white">
                          Premium Lesson Locked
                        </p>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 max-w-[200px] mt-2">
                          Membership log access key requested for this lesson
                          sheet.
                        </p>

                        <button className="mt-5 px-6 py-2 border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[10px] uppercase font-black tracking-widest rounded-none transition-colors cursor-pointer">
                          Unlock with Premium ⭐
                        </button>
                      </div>
                    )}

                    {/* CARD CONTENT */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-black border border-black">
                          {lesson.category}
                        </span>

                        <span
                          className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border border-black dark:border-white/50 ${
                            lesson.accessLevel === "premium"
                              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          }`}
                        >
                          {lesson.accessLevel}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-2xl text-black dark:text-white leading-tight line-clamp-2 hover:underline">
                        {lesson.title}
                      </h3>

                      <div className="flex gap-2 items-center text-[9px] uppercase font-bold tracking-wider text-neutral-500">
                        <span className="inline-block px-1.5 py-0.5 bg-editorial-bg dark:bg-editorial-dark-card border border-black/20">
                          RESONANCE: {lesson.emotionalTone}
                        </span>
                      </div>

                      <p className="text-neutral-500 dark:text-neutral-400 text-sm font-serif leading-relaxed line-clamp-4 italic">
                        &quot;{lesson.description}&quot;
                      </p>
                    </div>

                    {/* FOOTER */}
                    <div>
                      <div className="flex justify-end gap-2 pb-2 text-neutral-500">
                        <span className="flex items-center gap-1 text-[10px]">
                          <Heart className="w-3 h-3 text-red-500 fill-red-500/10" />
                          {lesson.likesCount}
                        </span>

                        <span className="flex items-center gap-1 text-[10px]">
                          <Bookmark className="w-3 h-3 text-emerald-500 fill-emerald-500/10" />
                          {lesson.favouritesCount || 0}
                        </span>
                      </div>

                      <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <figure className="relative w-7 h-7">
                            <Image
                              src={
                                lesson.creatorPhoto ||
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                              }
                              alt={lesson.creatorName}
                              fill
                              className="rounded-full border border-black dark:border-white object-cover"
                            />
                          </figure>

                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 truncate max-w-25">
                              {lesson.creatorName}
                            </p>

                            <p className="text-[9px] font-mono text-neutral-400 flex items-center gap-0.5 uppercase font-bold">
                              <Calendar className="w-2.5 h-2.5" />
                              {new Date(lesson.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <button className="px-4 py-2 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[10px] uppercase font-black tracking-widest transition-all">
                          SEE DETAILS
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;
