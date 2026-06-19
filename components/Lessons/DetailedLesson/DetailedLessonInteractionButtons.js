"use client";

import showSuccessToast from "@/lib/showSuccessToast";
import { Heart } from "lucide-react";
import { X } from "lucide-react";
import { Send } from "lucide-react";
import { MessageCircle } from "lucide-react";
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
  const [showReportModal, setShowReportModal] = useState(false);

  const [reportReason, setReportReason] = useState(
    "Inappropriate content / Hate speech",
  );

  const comments = [
    {
      id: "cmt_001",
      userId: "user_001",
      userName: "Sarah Mitchell",
      userPhoto:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      content:
        "This lesson completely changed how I approach my daily routine. The practical examples made everything easy to understand.",
      createdAt: "2026-06-18T08:30:00Z",
    },
    {
      id: "cmt_002",
      userId: "user_002",
      userName: "James Carter",
      userPhoto:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      content:
        "Really insightful content. I especially liked the section about building consistent habits over time.",
      createdAt: "2026-06-18T12:45:00Z",
    },
    {
      id: "cmt_003",
      userId: "user_003",
      userName: "Ava Johnson",
      userPhoto:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      content:
        "I've watched a lot of personal growth lessons, and this one stands out because of its simplicity and clarity.",
      createdAt: "2026-06-19T06:15:00Z",
    },
    {
      id: "cmt_004",
      userId: "user_004",
      userName: "Michael Brown",
      userPhoto:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      content:
        "The storytelling approach kept me engaged from start to finish. Looking forward to more lessons like this.",
      createdAt: "2026-06-19T10:20:00Z",
    },
    {
      id: "cmt_005",
      userId: "user_005",
      userName: "Emily Davis",
      userPhoto:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      content:
        "I applied one of the techniques mentioned here and noticed immediate improvements in my focus.",
      createdAt: "2026-06-19T14:05:00Z",
    },
    {
      id: "cmt_006",
      userId: "user_006",
      userName: "Daniel Wilson",
      userPhoto:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=150",
      content:
        "Short, actionable, and motivating. Exactly the kind of lesson I needed this week.",
      createdAt: "2026-06-19T18:40:00Z",
    },
    {
      id: "cmt_007",
      userId: "user_007",
      userName: "Olivia Taylor",
      userPhoto:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150",
      content:
        "The examples felt very relatable. It made the concepts much easier to connect with real-life situations.",
      createdAt: "2026-06-20T01:10:00Z",
    },
    {
      id: "cmt_008",
      userId: "user_008",
      userName: "Ethan Anderson",
      userPhoto:
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=150",
      content:
        "Excellent lesson. I shared it with a few friends because the message was genuinely valuable.",
      createdAt: "2026-06-20T03:25:00Z",
    },
  ];

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
      showSuccessToast(data.message);
    }
  };

  // Report submission
  const handleReportSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
    }
  };

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
      {/* ACTIVE COMMENT LOGICAL MODULE */}
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-black text-black dark:text-white font-serif tracking-tight border-b-2 border-black dark:border-white pb-3 flex items-center gap-2 uppercase">
          <MessageCircle className="w-5 h-5" />
          REFLECTIVE DIALOGUES ({comments.length})
        </h3>

        {/* Comment Entry input block */}
        <form
          // onSubmit={handleCommentSubmit}
          className="flex gap-3"
        >
          <input
            type="text"
            required
            // value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={
              user
                ? "Write your respectful reflective response feedback..."
                : "Register/sign in to join the conversation..."
            }
            className="flex-1 border-2 border-black bg-[#FAF9F6] dark:bg-neutral-900 p-3 text-xs font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
          />
          <button
            type="submit"
            className="px-6 py-3 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-xs font-black uppercase tracking-widest rounded-none transition-colors cursor-pointer shrink-0"
          >
            <span>SEND</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Comments feeds output */}
        {comments.length === 0 ? (
          <p className="text-xs text-neutral-450 italic text-center py-6 border border-dashed border-black/30 dark:border-white/30 font-serif">
            "No reflective feedback recorded yet. Be the first contributor."
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-none border-2 border-black dark:border-white bg-[#F9F7F2] dark:bg-editorial-dark-card/30 text-xs space-y-2 text-left relative group"
              >
                <div className="flex justify-between items-center border-b border-[#121212]/10 dark:border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        comment.userPhoto ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                      }
                      alt={comment.userName}
                      className="w-5 h-5 rounded-full object-cover border border-black"
                    />
                    <span className="font-serif font-black text-black dark:text-white text-xs">
                      {comment.userName}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-mono uppercase font-black">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Delete own comment button */}
                  {(user?.id === comment.userId || user?.role === "admin") && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="p-1 rounded text-neutral-400 hover:text-rose-600 transition-colors opacity-100"
                      title="Deport comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 font-serif text-sm leading-relaxed whitespace-pre-wrap pl-2 italic">
                  "{comment.content}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* COMPLAINTS MODAL DISPLAY */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-white dark:bg-[#121212] border-4 border-black dark:border-white p-6 rounded-none max-w-sm w-full shadow-none space-y-4">
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
                "Adherence to community trust rules is non-negotiable. Please
                declare the violation context below to register review."
              </p>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-black dark:text-white block">
                  Reason category
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full border-2 border-black p-2.5 rounded-none bg-white dark:bg-[#121212] dark:text-white font-black uppercase text-[10px]"
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
                  File Complaint
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
