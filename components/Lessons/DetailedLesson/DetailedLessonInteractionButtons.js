"use client";

import showToast from "@/lib/showToast";
import { Heart } from "lucide-react";
import { Brain } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Share2 } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const DetailedLessonInteractionButtons = ({ lesson, user }) => {
  const [isFavorite, setIsFavorite] = useState(
    lesson.favourites?.includes(user?.id),
  );
  const [isLiked, setIsLiked] = useState(lesson.likes?.includes(user?.id));
  const [likeCount, setLikeCount] = useState(lesson.likesCount || 0);

  const handleToggleFavorite = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/favourite`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson._id, userId: user.id }),
      },
    );

    if (res.ok) {
      setIsFavorite(!isFavorite);
      const data = await res.json();
      showToast(data.message);
    }
  };

  // Handle Reactions increments
  const handleToogleLike = async (reactionType) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson._id, userId: user.id }),
      },
    );

    if (res.ok) {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      const data = await res.json();
      showToast(data.message);
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
          onClick={() => handleToogleLike()}
          className={`px-4 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 rounded-none transition-all cursor-pointer ${
            isLiked
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-white dark:bg-[#121212] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
        >
          <span className="w-3.5 h-3.5">{likeCount}</span>
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bookmark, Share, and Flags */}
      <div className="flex items-center gap-2">
        {/* Favorite toggle bookmark */}
        <button
          onClick={handleToggleFavorite}
          className={`p-2.5 border-2 border-black rounded-none transition-all cursor-pointer ${
            isFavorite
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-white dark:bg-[#121212] text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
          title="Bookmark lesson"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
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
