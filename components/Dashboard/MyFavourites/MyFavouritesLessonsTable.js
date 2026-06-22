"use client";

import { useMemo, useState } from "react";
import MyFavouritesDeleteButton from "./MyFavouritesDeleteButton";
import Link from "next/link";
import { Filter } from "lucide-react";

export default function MyFavouriteLessonsTable({ favouriteLessons, userId }) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTone, setSelectedTone] = useState("All Tones");

  const filteredLessons = useMemo(() => {
    return favouriteLessons.filter((lesson) => {
      const categoryMatch =
        selectedCategory === "All Categories" ||
        lesson.category === selectedCategory;

      const toneMatch =
        selectedTone === "All Tones" || lesson.emotionalTone === selectedTone;

      return categoryMatch && toneMatch;
    });
  }, [favouriteLessons, selectedCategory, selectedTone]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card p-4">
        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500">
          <Filter className="h-3.5 w-3.5" /> Filter collection
        </span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg px-3 py-1.5 text-xs"
        >
          <option>All Categories</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Mindset">Mindset</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>

        <select
          value={selectedTone}
          onChange={(e) => setSelectedTone(e.target.value)}
          className="border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg px-3 py-1.5 text-xs"
        >
          <option>All Tones</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
          <option value="Realization">Realization</option>
          <option value="Gratitude">Gratitude</option>
        </select>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="border-2 border-dashed border-black/30 dark:border-white/30 p-10 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-serif italic">
            &quot;No saved lessons found in your collection yet.&quot;
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border-2 border-black dark:border-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-widest">
                  <th className="px-5 py-4 text-left">Insight</th>
                  <th className="px-5 py-4 text-left">Category</th>
                  <th className="px-5 py-4 text-left">Tone</th>
                  <th className="px-5 py-4 text-left">Creator</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map((fav, index) => (
                  <tr
                    key={fav._id}
                    className={`border-b border-black/10 dark:border-white/10 ${index % 2 === 0 ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg" : "bg-white dark:bg-editorial-dark-card"}`}
                  >
                    <td className="px-5 py-4">
                      <div className="font-bold text-sm text-black dark:text-white line-clamp-1">
                        {fav.title}
                      </div>
                      <p className="mt-0.5 text-[10px] font-mono text-neutral-400">
                        {new Date(fav.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="border border-black dark:border-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-black dark:text-white">
                        {fav.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      {fav.emotionalTone}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            fav.creatorPhoto ||
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                          }
                          alt={fav.creatorName}
                          className="h-7 w-7 rounded-full object-cover border border-black dark:border-white"
                        />
                        <span className="max-w-[120px] truncate text-xs font-bold text-black dark:text-white">
                          {fav.creatorName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/lessons/${fav._id}`}
                          className="border-2 border-black dark:border-white px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                          Details
                        </Link>
                        <MyFavouritesDeleteButton
                          userId={userId}
                          lessonId={fav._id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
