import {
  fetchMostFavouriteLessons,
  fetchUsersWithLessonCount,
} from "@/lib/fetchData";
import { Users } from "lucide-react";
import { Users2 } from "lucide-react";
import { Zap } from "lucide-react";
import { Bookmark } from "lucide-react";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const MostSavedLessonSection = async () => {
  const loading = false;
  const topSaves = await fetchMostFavouriteLessons();
  const contributors = await fetchUsersWithLessonCount();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-20">
      {/* SECTION 4A: MOST SAVED LESSONS PORTFOLIO (7 Columns) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="text-left space-y-1 border-b-2 border-black dark:border-white pb-3">
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white font-serif flex items-center gap-1.5">
            Most Saved Lessons Registry
            <TrendingUp className="w-5 h-5 text-black dark:text-white" />
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs font-sans">
            Critical life realizations and frameworks stored by global members
            in their Personal Notebooks.
          </p>
        </div>

        {topSaves.length === 0 ? (
          <div className="p-8 rounded-none border-2 border-dashed border-black/20 dark:border-white/20 text-center text-neutral-400">
            No highly saved logs yet.
          </div>
        ) : (
          <div className="space-y-4">
            {topSaves.map((lesson) => (
              <div
                key={lesson._id}
                // onClick={() => navigateTo("lesson-details", { id: lesson.id })}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white dark:bg-[#121212] border-2 border-black dark:border-white/70 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer transition-all gap-4 text-left rounded-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded-none bg-black text-white dark:bg-white dark:text-black text-[9px] font-black tracking-widest uppercase font-mono border border-black">
                      {lesson.category}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400">
                      {lesson.emotionalTone} Resonance
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-serif text-black dark:text-white line-clamp-1 group-hover:underline">
                    {lesson.title}
                  </h4>
                  <p className="text-neutral-650 dark:text-neutral-400 text-xs font-serif italic line-clamp-1 max-w-lg">
                    &quot;{lesson.description}&quot;
                  </p>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto shrink-0 gap-4 border-t sm:border-t-0 border-black/10 dark:border-white/10 pt-3 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 truncate max-w-20">
                      {lesson.creatorName}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F9F7F2] dark:bg-editorial-dark-card text-black dark:text-white text-[9px] font-black uppercase tracking-widest rounded-none border border-black dark:border-white">
                    <Bookmark className="w-3 h-3 text-neutral-700 dark:text-neutral-300 fill-neutral-700/20" />
                    {lesson.favouritesCount}{" "}
                    {lesson.favouritesCount === 1 ? "Save" : "Saves"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 4B: TOP CONTRIBUTORS OF THE WEEK (4 Columns) */}
      <div className="lg:col-span-4 space-y-6">
        <div className="text-left space-y-1 border-b-2 border-black dark:border-white pb-3">
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white font-serif flex items-center gap-1.5">
            <Users2 className="w-5 h-5 text-black dark:text-white" />
            Sages Rank List
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs font-sans">
            Writers with the highest frequency of strategic journals.
          </p>
        </div>

        <div className="p-6 bg-[#F9F7F2] dark:bg-[#181816] border-2 border-black dark:border-white rounded-none shadow-none space-y-4">
          {contributors
            .filter((contrib) => contrib.totalLessons > 0)
            .map((contrib, idx) => (
              <div
                key={contrib.email}
                className="flex items-center justify-between p-3 bg-white dark:bg-[#121212] border border-black dark:border-white/50 rounded-none hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <figure className="w-10 h-10">
                      <Image
                        src={
                          contrib.image ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                        }
                        alt={contrib.name}
                        fill
                        className="w-10 h-10 rounded-full border border-black dark:border-white object-cover"
                      />
                    </figure>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-none bg-black text-white text-[9px] font-black flex items-center justify-center border border-black">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-200 truncate max-w-[125px]">
                      {contrib.name}
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 truncate max-w-[125px]">
                      {contrib.email}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black border border-black font-mono text-[9px] font-black uppercase tracking-widest">
                    <Zap className="w-3 h-3" />
                    {contrib.totalLessons}{" "}
                    {contrib.totalLessons === 1 ? "Lesson" : "Lessons"}
                  </span>
                </div>
              </div>
            ))}

          <div className="bg-white dark:bg-[#121212] p-4 text-center text-[11px] text-neutral-600 dark:text-neutral-400 font-serif italic border border-black/60 leading-relaxed rounded-none">
            &quot;Publish wisdom journals inside your Self Writing Suite to
            claim a prominent listing on the Sage Roll.&quot;
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostSavedLessonSection;
