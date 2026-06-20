import { auth } from "@/lib/auth";
import { fetchPublicLessons } from "@/lib/fetchData";
import { Lock } from "lucide-react";
import { Heart } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Filter } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Search } from "lucide-react";
import { Sparkles } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Calendar } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PublicLessonsPage = async () => {
  const loading = false;
  const totalPages = 2;
  const page = 1;
  const { user } =
    (await auth.api.getSession({ headers: await headers() })) || {};
  const lessons = await fetchPublicLessons();
  const total = lessons.length;
  return (
    <div className="space-y-8 my-20 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-left max-w-4xl border-b-2 border-black dark:border-white pb-6 space-y-3">
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-black dark:text-white tracking-tight flex items-center gap-2">
          THE PUBLIC INSIGHTS REGISTRY
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 font-serif italic text-base leading-relaxed">
          &quot;A public ledger of hard-won realizations, tactical work systems,
          and life breakthroughs preserved for other climbing climbers.&quot;
        </p>
      </div>

      <div className="bg-[#F9F7F2] dark:bg-[#181816] border-2 border-black dark:border-white/80 p-6 rounded-none shadow-none space-y-5">
        {/* Form Search input */}
        <form
          // onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search catalog by title, key category, or realization..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-none border-2 border-black bg-white dark:bg-black/40 focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white text-xs font-bold uppercase tracking-wider text-black dark:text-white placeholder:text-neutral-400"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[11px] uppercase tracking-widest font-black rounded-none transition-colors cursor-pointer"
          >
            Find Lessons
          </button>
        </form>

        {/* Filter select fields */}
        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest pt-1">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1 font-bold">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            <select
              // value={category}
              // onChange={(e) => {
              //   setCategory(e.target.value);
              //   setPage(1);
              // }}
              className="py-1.5 px-3 rounded-none border-2 border-black bg-white dark:bg-[#121212] text-black dark:text-white font-black cursor-pointer focus:outline-none text-[10px]"
            >
              {/* {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))} */}
            </select>
          </div>

          {/* Emotional Resonance Filter */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Tone:
            </span>
            <select
              // value={emotionalTone}
              // onChange={(e) => {
              //   setEmotionalTone(e.target.value);
              //   setPage(1);
              // }}
              className="py-1.5 px-3 rounded-none border-2 border-black bg-white dark:bg-[#121212] text-black dark:text-white font-black cursor-pointer focus:outline-none text-[10px]"
            >
              {/* {emotionalTones.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))} */}
            </select>
          </div>

          {/* Sort Controller */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1 font-bold">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Sort:
            </span>
            <select
              // value={sort}
              // onChange={(e) => {
              //   setSort(e.target.value);
              //   setPage(1);
              // }}
              className="py-1.5 px-3 rounded-none border-2 border-black bg-white dark:bg-[#121212] text-black dark:text-white font-black cursor-pointer focus:outline-none text-[10px]"
            >
              {/* {sortOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))} */}
            </select>
          </div>

          <button
            // onClick={clearFilters}
            className="sm:ml-auto text-black dark:text-white border-b-2 border-black dark:border-white pb-0.5 hover:opacity-75 transition-all text-[10px] font-black tracking-widest cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* INFO STATUS */}
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-500 pb-2 border-b border-black/10">
        <span>Available Catalog count: {total} elements</span>
        <span>Standard Pagination / limit 6 per view</span>
      </div>

      {/* PUBLIC LESSONS CARD CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr auto-cols-fr gap-6">
        {lessons.map((lesson, idx) => {
          // Check if blurred/locked
          const isPremium = lesson.accessLevel === "premium";
          const isViewerPremium = user?.isPremium || user?.role === "admin";
          const isCreator = user?.id === lesson.creatorId;
          const isBlurred = isPremium && !isViewerPremium && !isCreator;

          return (
            <Link
              href={isBlurred ? "/pricing" : `lessons/${lesson._id}`}
              key={idx}
              className="group relative flex flex-col justify-between bg-white dark:bg-[#121212] border-2 border-black dark:border-white rounded-none overflow-hidden p-6 text-left hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer"
            >
              {/* BLURRED MOCKUP WITH LOCK ELEMENT */}
              {isBlurred && (
                <div className="absolute inset-0 bg-[#FAF9F6]/95 dark:bg-[#181816]/95 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black border-2 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]">
                    <Lock className="w-5 h-5 text-current animate-bounce" />
                  </div>
                  <p className="font-serif font-black text-lg text-black dark:text-white">
                    Premium Lesson Locked
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 max-w-[200px] mt-2">
                    Membership log access key requested for this lesson sheet.
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-5 px-6 py-2 border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[10px] uppercase font-black tracking-widest rounded-none transition-colors cursor-pointer"
                  >
                    Unlock with Premium ⭐
                  </Link>
                </div>
              )}

              {/* Card Title and Description */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-none bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-black font-mono border border-black">
                    {lesson.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-none text-[9px] font-black uppercase tracking-widest border border-black dark:border-white/50 ${
                      lesson.accessLevel === "premium"
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-black dark:text-white leading-tight line-clamp-2 hover:underline cursor-pointer">
                  {lesson.title}
                </h3>

                {/* Categorized and toned labels */}
                <div className="flex gap-2 items-center text-[9px] uppercase font-bold tracking-wider text-neutral-500">
                  <span className="inline-block px-1.5 py-0.5 bg-[#FAF9F6] dark:bg-[#181816] border border-black/20">
                    RESONANCE: {lesson.emotionalTone}
                  </span>
                </div>

                <p className="text-neutral-655 dark:text-neutral-400 text-sm font-serif leading-relaxed line-clamp-4 italic">
                  &quot;{lesson.description}&quot;
                </p>
              </div>
              {/* Footer Creator Details */}
              <div>
                <div className="flex justify-end gap-2 pb-2 text-neutral-500">
                  <span className="flex items-center gap-1 text-[10px]">
                    <Heart className="w-3 h-3 text-red-500 fill-red-500/10" />
                    {lesson.likesCount}
                  </span>
                  <span className="flex items-center gap-1 text-[10px]">
                    <Bookmark className="w-3 h-3 text-emerald-500 fill-emerald-500/10" />
                    {lesson.favouritesCount || 0}
                  </span>
                </div>
                <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between z-0">
                  <div className="flex items-center gap-2">
                    <figure className="relative w-7 h-7">
                      <Image
                        src={
                          lesson.creatorPhoto ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                        }
                        alt={lesson.creatorName}
                        fill
                        className="w-7 h-7 rounded-full border border-black dark:border-white object-cover"
                      />
                    </figure>
                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 truncate max-w-25">
                        {lesson.creatorName}
                      </p>
                      <p className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 flex items-center gap-0.5 uppercase font-bold">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button className="btn px-4 py-2 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[10px] uppercase font-black tracking-widest rounded-none transition-all cursor-pointer">
                    SEE DETAILS
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ONE-PAGE PAGINATION COMPONENT CONTROLS */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            // onClick={() => setPage((p) => Math.max(p - 1, 1))}
            // disabled={page === 1}
            className="p-2.5 border-2 border-black dark:border-white bg-[#FAF9F6] dark:bg-[#181816] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:bg-black rounded-none text-black dark:text-white transition-colors disabled:opacity-35 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#121212] dark:text-white bg-[#FAF9F6] dark:bg-[#181816] px-4 py-2 border-2 border-black">
            SHEET {page} OF {totalPages}
          </span>

          <button
            // onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            // disabled={page === totalPages}
            className="p-2.5 border-2 border-black dark:border-white bg-[#FAF9F6] dark:bg-[#181816] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:bg-black rounded-none text-black dark:text-white transition-colors disabled:opacity-35 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicLessonsPage;
