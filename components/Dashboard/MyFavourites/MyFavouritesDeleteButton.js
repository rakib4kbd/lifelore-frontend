"use client";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";
import { useRouter } from "next/navigation";
import React from "react";

const MyFavouritesDeleteButton = ({ userId, lessonId }) => {
  const router = useRouter();
  const handleRemove = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/favourite/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, lessonId }),
      },
    );
    if (!res.ok) {
      showAlertToast("Failed to remove from favourites");
    } else {
      showSuccessToast("Lesson removed from favourites");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="rounded-none border border-zinc-800 px-3 py-1.5 text-[11px] font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
    >
      Remove
    </button>
  );
};

export default MyFavouritesDeleteButton;
