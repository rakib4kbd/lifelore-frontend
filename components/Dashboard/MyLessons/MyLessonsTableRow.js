"use client";
import { ThumbsUp } from "lucide-react";
import { Edit } from "lucide-react";
import { Globe } from "lucide-react";
import { Lock } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Star } from "lucide-react";
import React, { useState } from "react";

const MyLessonsTableRow = ({ lesson, index }) => {
  const [visibility, setVisibility] = useState(lesson.visibility);
  return (
    <tr
      key={lesson._id}
      className={`border-b border-black/10 dark:border-white/10 ${
        index % 2 === 0
          ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg"
          : "bg-white dark:bg-editorial-dark-card"
      }`}
    >
      {/* Title */}
      <td className="px-5 py-4">
        <div className="font-bold text-black dark:text-white">
          {lesson.title}
        </div>

        <p className="mt-1 text-[11px] text-zinc-500">
          Created {new Date(lesson.createdAt).toLocaleDateString()}
        </p>
      </td>

      {/* Category */}
      <td className="px-5 py-4">
        <span className="rounded-none border border-zinc-700 px-2.5 py-1 text-[10px] font-medium text-zinc-300">
          {lesson.category}
        </span>
      </td>

      {/* Visibility */}
      <td className="px-5 py-4">
        <span
          onClick={() => {
            setVisibility((prev) => (prev === "Public" ? "Private" : "Public"));
          }}
          className={`inline-flex items-center gap-1 rounded-none border px-2.5 py-1 text-[10px] font-medium ${
            visibility === "Public"
              ? "border-emerald-600 text-emerald-500"
              : "border-zinc-700 text-zinc-400"
          }`}
        >
          {visibility === "Public" ? (
            <Globe className="h-3 w-3" />
          ) : (
            <Lock className="h-3 w-3" />
          )}
          {visibility}
        </span>
      </td>

      {/* Access */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1 rounded-none border px-2.5 py-1 text-[10px] font-medium ${
            lesson.accessLevel === "Premium"
              ? "border-amber-500 text-amber-500"
              : "border-zinc-700 text-zinc-400"
          }`}
        >
          <Lock className="h-3 w-3" />
          {lesson.accessLevel}
        </span>
      </td>

      {/* Stats */}
      <td className="px-5 py-4">
        <div className="space-y-1 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-3.5 w-3.5" />
            {lesson.likesCount || 0}
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5" />
            {lesson.favoritesCount || 0}
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button className="rounded-none border border-zinc-800 px-3 py-1.5 text-[11px] font-medium text-zinc-300 transition hover:bg-zinc-900">
            <Edit className="h-3.5 w-3.5" />
          </button>

          <button className="rounded-none border border-zinc-800 px-3 py-1.5 text-[11px] font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-red-400">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyLessonsTableRow;
