"use client";

import { authClient } from "@/lib/auth-client";
import showToast from "@/lib/showToast";
import { Heart } from "lucide-react";
import { Brain } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Share2 } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

const DetailedLessonInteractionButtons = ({ lesson }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleToggleFavorite = async () => {
    if (!user) {
      showToast("Access Restricted. Please login to bookmark.", "error");
      navigateTo("login");
      return;
    }

    try {
      const res = await fetch(`/api/lessons/${lesson._id}/favorite`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.id}` },
      });
      const data = await res.json();
      if (res.ok) {
        setLesson({
          ...lesson,
          isFavorited: data.isFavorited,
          favoritesCount: data.favoritesCount,
        });
        showToast(
          data.isFavorited
            ? "Reflection saved to draft favorites portfolio!"
            : "Reflection removed from bookmarks.",
          "success",
        );
      }
    } catch (e) {
      console.error(e);
    }
  };
  // Handle Reactions increments
  const handleReactionClick = async (reactionType) => {
    if (!user) {
      showToast("Sign in is required to express reactive parameters.", "error");
      navigateTo("login");
      return;
    }

    try {
      const res = await fetch(`/api/lessons/${lessonId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${user.id}` },
      });
      const data = await res.json();
      if (res.ok) {
        setLesson({
          ...lesson,
          likesCount: data.likesCount,
        });
        setSelectedReaction(reactionType);
        showToast(
          `Reacted with "${reactionType}"! Reaction counted.`,
          "success",
        );
      }
    } catch (e) {
      console.error(e);
    }
  };
  // Safe links copy share
  const handleShareClipboard = () => {
    const liveLink = `${window.location.host}/lessons/${lesson._id}`;
    navigator.clipboard.writeText(liveLink);
    showToast("Shareable link copied to clipboard successfully!", "success");
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black dark:border-white py-4">
      {/* Interaction emojis group */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleReactionClick("Inspiring")}
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
          onClick={() => handleReactionClick("Helpful")}
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
          onClick={handleToggleFavorite}
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
          onClick={handleShareClipboard}
          className="p-2.5 border-2 border-black bg-white dark:bg-[#121212] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-none transition-colors cursor-pointer"
          title="Copy share path links"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Flag Report icon */}
        <button
          onClick={() => setShowReportModal(true)}
          className="p-2.5 border-2 border-black bg-white dark:bg-[#121212] text-neutral-400 dark:text-neutral-500 hover:text-rose-600 rounded-none transition-colors cursor-pointer"
          title="Flag as inappropriate"
        >
          <AlertTriangle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DetailedLessonInteractionButtons;
