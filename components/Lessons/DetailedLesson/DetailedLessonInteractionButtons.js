"use client";

import showSuccessToast from "@/lib/showSuccessToast";
import { Heart } from "lucide-react";
import { X } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import { Share2 } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const DetailedLessonInteractionButtons = ({ lesson, user }) => {
  const [isFavorite, setIsFavorite] = useState(
    lesson.favourites?.includes(user?.id),
  );
  const [isLiked, setIsLiked] = useState(lesson.likes?.includes(user?.id));
  const [likeCount, setLikeCount] = useState(lesson.likesCount || 0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [submittingReport, setSubmittingReport] = useState(false);

  const [reportReason, setReportReason] = useState(
    "Inappropriate content / Hate speech",
  );

  const handleToggleFavorite = async () => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/favourite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId: lesson._id, userId: user.id }),
      },
    );

    if (res.ok) {
      setIsFavorite(!isFavorite);
      const data = await res.json();
      showSuccessToast(data.message);
    }
  };

  // Report submission
  const handleReportSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmittingReport(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            lessonId: lesson._id,
            userId: user.id,
            reason: reportReason,
          }),
        },
      );
      if (res.ok) {
        showSuccessToast(
          "Incident report categorized under review. Admins notified.",
          "success",
        );
        setShowReportModal(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingReport(false);
    }
  };

  const handleToogleLike = async () => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lessonId: lesson._id, userId: user.id }),
      },
    );

    if (res.ok) {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      const data = await res.json();
      showSuccessToast(data.message);
    }
  };
  // Safe links copy share
  const handleShareClipboard = () => {
    const liveLink = `${window.location.host}/lessons/${lesson._id}`;
    navigator.clipboard.writeText(liveLink);
    showSuccessToast(
      "Shareable link copied to clipboard successfully!",
      "success",
    );
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
              : "bg-editorial-card dark:bg-editorial-dark-card text-editorial-text dark:text-editorial-dark-text hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
              : "bg-editorial-card dark:bg-editorial-dark-card text-editorial-text dark:text-editorial-dark-text hover:bg-neutral-100 dark:hover:bg-neutral-800"
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

      {/* COMPLAINTS MODAL DISPLAY */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-editorial-bg dark:bg-editorial-dark-bg border-4 border-black dark:border-white p-6 rounded-none max-w-sm w-full shadow-none space-y-4">
            <div className="flex justify-between items-center border-b pb-2 border-black/10 dark:border-white/10">
              <h3 className="font-serif font-black text-rose-600 dark:text-rose-400 uppercase text-xs flex items-center gap-1.5 leading-none">
                <AlertTriangle className="w-4 h-4 animate-pulse" />
                Inappropriate Content
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
              <p className="text-neutral-600 dark:text-neutral-400 font-serif italic text-xs leading-normal">
                &quot;Adherence to community trust rules is non-negotiable.
                Please declare the violation context below to register
                review.&quot;
              </p>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-black dark:text-white block">
                  Reason category
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full border-2 border-black p-2.5 rounded-none bg-editorial-card dark:bg-editorial-dark-card dark:text-editorial-dark-text font-black uppercase text-[10px]"
                >
                  <option value="Inappropriate content / Hate speech">
                    Inappropriate content / Hate speech
                  </option>
                  <option value="Plagiarism / Stolen insights rights">
                    Plagiarism / Stolen insights rights
                  </option>
                  <option value="Spam / Advertisements campaign links">
                    Spam / Advertisements campaign links
                  </option>
                  <option value="Harassment / Toxicity targeting members">
                    Harassment / Toxicity targeting members
                  </option>
                </select>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 border border-black font-black uppercase tracking-widest text-[9px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white font-black uppercase tracking-widest text-[9px] border border-black"
                >
                  {submittingReport ? "Submitting ..." : "File Complaint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedLessonInteractionButtons;
