import { fetchLessonById } from "@/lib/fetchLessons";
import userSession from "@/lib/userSession";
import { Clock } from "lucide-react";
import { Brain } from "lucide-react";
import { Heart } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { Send } from "lucide-react";
import { X } from "lucide-react";
import { Trash2 } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Share2 } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Lock } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import React from "react";

const LessonDetailPage = async ({ params }) => {
  const user = await userSession();
  const { id } = await params;
  const lesson = await fetchLessonById(id);

  const isBlurLocked =
    lesson.accessLevel === "premium" &&
    (!user || (!user?.isPremium && user.role !== "admin"));

  // Estimated reading time formula: standard index length divided by 200 words/min
  const wordsCount = lesson.description.split(/\s+/).length;
  const rawReadTime = Math.ceil(wordsCount / 180);
  const estimatedReadingTime = rawReadTime < 1 ? 1 : rawReadTime;

  const selectedReaction = null;
  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto text-left relative">
      {/* Back button link */}
      <button
        //
        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white transition-all cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Return to Insights Ledger
      </button>
      {/* Title Details Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded-none font-bold text-[9px] uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black border border-black">
            {lesson.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-none font-bold text-[9px] uppercase tracking-widest border border-dashed border-black dark:border-white text-neutral-850 dark:text-neutral-200 bg-[#F9F7F2] dark:bg-editorial-dark-card/30">
            {lesson.emotionalTone} Resonant
          </span>
          <span className="flex items-center gap-1 text-[9px] font-mono uppercase font-black text-neutral-500">
            <Clock className="w-3.5 h-3.5" />
            {estimatedReadingTime} min study cycle
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-black dark:text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>

        {/* Creator profile section */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-b-2 border-black dark:border-white pb-4">
          <div className="flex items-center gap-3">
            <img
              src={
                lesson.creatorPhoto ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
              }
              alt={lesson.creatorName}
              className="w-10 h-10 rounded-full object-cover border border-black dark:border-white"
            />
            <div>
              <p className="font-serif font-black text-sm text-black dark:text-white">
                {lesson.creatorName}
              </p>
              <p className="text-[10px] uppercase font-black tracking-widest text-[#121212] dark:text-white/70">
                Verified Manuscript Contributor
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase font-black text-neutral-500">
            Published:{" "}
            {new Date(lesson.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      {/* CORE DESCRIPTION CONTENT (OR BLUR HOOKS FOR FREE USERS!) */}
      <div className="relative min-h-[180px]">
        {isBlurLocked ? (
          <div>
            {/* Blurry text placeholder */}
            <p className="text-sm sm:text-base text-neutral-300 dark:text-neutral-700 select-none blur-[4px] leading-relaxed font-serif italic pointer-events-none">
              Philosophy is a system of templates built to withstand the chaotic
              storms of normal human conditions. Wisdom tells us we cannot
              control outer factors or global situations, but only our inner
              decisions. By logging these reflections, we establish an armor...
              This content is premium-locked and requires verification.
              Philosophy is a system of templates built to withstand the chaotic
              storms of normal human conditions. Wisdom tells us we cannot
              control outer factors or global situations, but only our inner
              decisions. By logging these reflections, we establish an armor...
              This content is premium-locked and requires verification.
              Philosophy is a system of templates built to withstand the chaotic
              storms of normal human conditions. Wisdom tells us we cannot
              control outer factors or global situations, but only our inner
              decisions. By logging these reflections, we establish an armor...
              This content is premium-locked and requires reflection vectors.
            </p>

            {/* Elegant paywall card */}
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#121212] dark:via-[#121212]/80">
              <div className="p-8 bg-white dark:bg-[#121212] border-2 border-black dark:border-white rounded-none shadow-none text-center max-w-sm space-y-4">
                <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black border-2 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-black text-lg text-black dark:text-white uppercase tracking-tight">
                    Premium Scribe Required
                  </h3>
                  <p className="text-xs font-serif italic text-neutral-600 dark:text-neutral-400 leading-normal">
                    This lesson page is designated for Lifetime Members. Buy
                    once, unlock all manuscripts with standard ৳1500 checkout
                    activation.
                  </p>
                </div>
                <div className="pt-2">
                  <button className="w-full py-3 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-xs font-black uppercase tracking-widest rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2">
                    Examine Premium Upgrade Plans
                  </button>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#121212]/30 dark:text-white/30 mt-2">
                    Zero recurring limits configuration active
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Normal description content displayed cleanly with a stylish drop cap */
          <div className="relative text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed text-sm sm:text-lg whitespace-pre-wrap py-6 border-b border-black/10 dark:border-white/10 italic">
            {lesson.description}
          </div>
        )}
      </div>
      {/* DYNAMIC CLUSTERS OF REACTION BUTTONS, BOOKMARKS, REPORT, AND CLIPBOARD SHARING */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black dark:border-white py-4">
        {/* Interaction emojis group */}
        <div className="flex items-center gap-2">
          <button
            //
            className={`px-4 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 rounded-none transition-all cursor-pointer ${
              selectedReaction === "Inspiring"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white dark:bg-[#121212] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>💡 Inspiring ({lesson.likesCount})</span>
          </button>

          <button
            //
            className={`px-4 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 rounded-none transition-all cursor-pointer ${
              selectedReaction === "Helpful"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white dark:bg-[#121212] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>👍 Helpful</span>
          </button>
        </div>

        {/* Bookmark, Share, and Flags */}
        <div className="flex items-center gap-2">
          {/* Favorite toggle bookmark */}
          <button
            //
            className={`p-2.5 border-2 border-black rounded-none transition-all cursor-pointer ${
              lesson.isFavorited
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white dark:bg-[#121212] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
            title="Bookmark lesson"
          >
            <Heart
              className={`w-4 h-4 ${lesson.isFavorited ? "fill-current" : ""}`}
            />
          </button>

          {/* Share */}
          <button
            //
            className="p-2.5 border-2 border-black bg-white dark:bg-[#121212] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none transition-colors cursor-pointer"
            title="Copy share path links"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Flag Report icon */}
          <button
            className="p-2.5 border-2 border-black bg-white dark:bg-[#121212] text-neutral-400 dark:text-neutral-500 hover:text-rose-600 rounded-none transition-colors cursor-pointer"
            title="Flag as inappropriate"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailPage;
