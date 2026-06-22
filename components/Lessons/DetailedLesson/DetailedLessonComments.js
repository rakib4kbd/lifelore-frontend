"use client";

import { useForm } from "react-hook-form";
import { MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DetailedLessonComments = ({ lesson, user, comments }) => {
  const [localComment, setLocalComment] = useState(comments);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    if (!user) return;

    const commentData = {
      lessonId: lesson._id,
      userId: user.id,
      text: data.text,
      createdAt: new Date().toISOString(),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      },
    );
    if (res.ok) {
      const result = await res.json();
      const newComment = result.comment;
      setLocalComment((prev) => [newComment, ...prev]);
      reset();
    }
  };

  const text = watch("text");

  const handleDeleteComment = async (commentId) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (res.ok) {
      setLocalComment((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );
    }
  };

  return (
    <div>
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-black text-black dark:text-white font-serif tracking-tight border-b-2 border-black dark:border-white pb-3 flex items-center gap-2 uppercase">
          <MessageCircle className="w-5 h-5" />
          REFLECTIVE DIALOGUES ({localComment.length})
        </h3>

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1">
            <input
              type="text"
              disabled={!user}
              placeholder={
                user
                  ? "Write your respectful reflective response feedback..."
                  : "Register/sign in to join the conversation..."
              }
              className="w-full border-2 border-black bg-editorial-card dark:bg-editorial-dark-card p-3 text-xs font-bold tracking-wider text-editorial-text dark:text-editorial-dark-text focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
              {...register("text", {
                required: "Comment is required",
                minLength: {
                  value: 3,
                  message: "Comment must be at least 3 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Comment cannot exceed 500 characters",
                },
              })}
            />

            {errors.text && (
              <p className="mt-1 text-xs text-red-500">{errors.text.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!user || isSubmitting}
            className="px-6 py-3 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-xs font-black uppercase tracking-widest rounded-none transition-colors cursor-pointer shrink-0 disabled:opacity-50 flex gap-2 items-center"
          >
            <span>{isSubmitting ? "SENDING..." : "SEND"}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Comments */}
        {localComment.length === 0 ? (
          <p className="text-xs text-neutral-450 italic text-center py-6 border border-dashed border-black/30 dark:border-white/30 font-serif">
            &quot;No reflective feedback recorded yet. Be the first
            contributor.&quot;
          </p>
        ) : (
          <div className="space-y-4">
            {localComment.map((comment) => (
              <div
                key={comment._id}
                className="p-4 rounded-none border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card/30 text-xs space-y-2 text-left relative group"
              >
                <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <figure className="w-5 h-5 relative">
                      <Image
                        src={
                          comment.userImage ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                        }
                        alt=""
                        fill
                        className="w-5 h-5 rounded-full object-cover border border-black"
                      />
                    </figure>
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
                      onClick={() => {
                        console.log(comment._id);
                        handleDeleteComment(comment._id);
                      }}
                      className="p-1 rounded text-neutral-400 hover:text-rose-600 transition-colors opacity-100"
                      title="Deport comment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 font-serif text-sm leading-relaxed whitespace-pre-wrap pl-2 italic">
                  &quot;{comment.text}&quot;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedLessonComments;
