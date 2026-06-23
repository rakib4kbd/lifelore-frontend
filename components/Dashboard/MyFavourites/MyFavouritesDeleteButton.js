"use client";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MyFavouritesDeleteButton = ({ userId, lessonId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleRemove = async () => {
    setLoading(true);
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/favourite/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, lessonId }),
      },
    );
    setLoading(false);
    if (!res.ok) showAlertToast("Failed to remove from favourites");
    else {
      showSuccessToast("Lesson removed from favourites");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="border-2 border-black dark:border-white px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all rounded-none"
    >
      {loading ? "Removing..." : "Remove"}
    </button>
  );
};

export default MyFavouritesDeleteButton;
