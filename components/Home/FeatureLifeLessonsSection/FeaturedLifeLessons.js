import { fetchFeaturedLessons } from "@/lib/fetchLessons";
import { Bookmark } from "lucide-react";
import { Heart } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const FeaturedLifeLessons = async () => {
  const featured = await fetchFeaturedLessons();
  console.log(featured);
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-end border-b border-black/40 dark:border-white/40 pb-3">
        <div className="text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white font-serif">
            Featured Editorial Scribe Selections
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-normal">
            Public archives reviewed by editors for structural value and
            outstanding mental models.
          </p>
        </div>
        <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-black dark:text-white border-b-2 border-black dark:border-white pb-0.5 hover:opacity-70 transition-all cursor-pointer shrink-0">
          Review All Lessons
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {featured.length === 0 ? (
        <div className="p-8 rounded-none border-2 border-dashed border-black/30 dark:border-white/30 text-center text-neutral-400 dark:text-neutral-650 text-sm">
          No lessons marked as featured yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((lesson) => (
            <div
              key={lesson._id}
              className="group relative cursor-pointer p-6 rounded-none bg-white dark:bg-[#121212] border-2 border-black dark:border-white/70 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded-none bg-black text-white dark:bg-white dark:text-black border border-black text-[9px] uppercase tracking-widest font-black font-mono">
                    {lesson.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-none text-[9px] font-black uppercase tracking-widest border border-black dark:border-white/50 ${
                      lesson.accessLevel === "Premium"
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-black dark:text-white leading-tight group-hover:underline">
                  {lesson.title}
                </h3>
                <p className="text-neutral-650 dark:text-neutral-400 text-xs leading-relaxed line-clamp-3 font-serif italic">
                  "{lesson.description}"
                </p>
              </div>

              <div className="border-t border-black/10 dark:border-white/10 mt-6 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <figure className="relative w-7 h-7">
                    <Image
                      src={
                        lesson.creatorPhoto ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                      }
                      alt={lesson.creatorName}
                      fill
                      className="w-6 h-6 rounded-full border border-black dark:border-white object-cover"
                    />
                  </figure>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 truncate max-w-[120px]">
                    {lesson.creatorName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-neutral-500">
                  <span className="flex items-center gap-1 text-[10px]">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500/10" />
                    {lesson.likesCount}
                  </span>
                  <span className="flex items-center gap-1 text-[10px]">
                    <Bookmark className="w-3 h-3 text-emerald-500 fill-emerald-500/10" />
                    {lesson.favoritesCount || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedLifeLessons;
