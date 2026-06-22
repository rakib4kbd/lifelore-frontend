"use client";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";
import {
  ThumbsUp,
  Edit,
  BookOpen,
  Globe,
  Lock,
  Trash2,
  Star,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { fetchLessonById } from "@/lib/fetchData";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

const MyLessonsTableRow = ({ lesson, index, user, setEditingLesson }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [visibility, setVisibility] = useState(lesson.visibility);
  const [accessLevel, setAccessLevel] = useState(lesson.accessLevel);

  const handleDelete = async (lessonId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this lesson? This action cannot be undone.",
      )
    )
      return;
    setIsDeleting(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/${lessonId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    );
    setIsDeleting(false);
    if (!res.ok) {
      showAlertToast("Failed to delete lesson.");
      return;
    }
    showSuccessToast("Lesson deleted successfully.");
    router.refresh();
  };

  const handleVisibilityChange = async () => {
    const nextVisibility = visibility === "Public" ? "Private" : "Public";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/visibility/${lesson._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility: nextVisibility }),
      },
    );
    if (!res.ok) {
      showAlertToast("Failed to update lesson visibility.");
      return;
    }
    setVisibility(nextVisibility);
    showSuccessToast(`Lesson visibility updated to ${nextVisibility}.`);
  };

  const handleAccessLevelChange = async () => {
    if (!user.isPremium) {
      showAlertToast("Only premium users can update lesson access level.");
      return;
    }
    const nextAccessLevel = accessLevel === "Premium" ? "Free" : "Premium";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/accessLevel/${lesson._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessLevel: nextAccessLevel }),
      },
    );
    if (!res.ok) {
      showAlertToast("Failed to update lesson access level.");
      return;
    }
    setAccessLevel(nextAccessLevel);
    showSuccessToast(`Lesson access level updated to ${nextAccessLevel}.`);
  };

  const btnClass =
    "border-2 border-black dark:border-white px-3 py-1.5 text-[11px] font-black uppercase tracking-wider transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center";

  return (
    <tr
      className={`border-b border-black/10 dark:border-white/10 ${index % 2 === 0 ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg" : "bg-white dark:bg-editorial-dark-card"}`}
    >
      <td className="px-5 py-4">
        <div className="font-bold text-sm text-black dark:text-white line-clamp-1">
          {lesson.title}
        </div>
        <p className="mt-0.5 text-[10px] font-mono text-neutral-400">
          {new Date(lesson.createdAt).toLocaleDateString()}
        </p>
      </td>

      <td className="px-5 py-4">
        <span className="border border-black dark:border-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black dark:text-white">
          {lesson.category}
        </span>
      </td>

      <td className="px-5 py-4">
        <button
          onClick={handleVisibilityChange}
          className={`inline-flex items-center gap-1 border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
            visibility === "Public"
              ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white"
              : "border-black dark:border-white text-neutral-500 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          }`}
        >
          {visibility === "Public" ? (
            <Globe className="h-3 w-3" />
          ) : (
            <Lock className="h-3 w-3" />
          )}
          {visibility}
        </button>
      </td>

      <td className="px-5 py-4">
        <button
          onClick={handleAccessLevelChange}
          className={`inline-flex items-center gap-1 border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors ${
            accessLevel === "Premium"
              ? "border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white"
              : "border-black dark:border-white text-neutral-500 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          }`}
        >
          <Lock className="h-3 w-3" />
          {accessLevel}
        </button>
      </td>

      <td className="px-5 py-4">
        <div className="space-y-1 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="h-3 w-3" />
            {lesson.likesCount || 0}
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-3 w-3" />
            {lesson.favoritesCount || 0}
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Link href={`/lessons/${lesson._id}`} className={btnClass}>
            <BookOpen className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={async () => {
              try {
                setIsEditing(true);
                const fresh = await fetchLessonById(lesson._id);
                setEditingLesson(fresh);
              } catch {
                setEditingLesson(lesson);
              } finally {
                setIsEditing(false);
              }
            }}
            className={btnClass}
          >
            {isEditing ? (
              <div className="h-3.5 w-3.5 loading" />
            ) : (
              <Edit className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={async () => {
              setIsDeleting(true);
              await handleDelete(lesson._id);
              setIsDeleting(false);
            }}
            className="border-2 border-black dark:border-white px-3 py-1.5 text-neutral-500 dark:text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
          >
            {isDeleting ? (
              <div className="h-3.5 w-3.5 loading" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyLessonsTableRow;
