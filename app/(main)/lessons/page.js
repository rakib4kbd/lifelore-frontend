"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Lock,
  Heart,
  ArrowUpDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Bookmark,
  Calendar,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const LIMIT = 2;

const PublicLessonsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session } = useSession();
  const user = session?.user;

  // -------------------------
  // STATE
  // -------------------------
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [tone, setTone] = useState(searchParams.get("tone") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const categoriesList = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
  ];

  const tonesList = ["Realization", "Motivational", "Gratitude"];

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      search: search || "",
      category: category || "",
      tone: tone || "",
      sort: sort || "newest",
    },
  });

  const [lessonsData, setLessonsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const lessons = lessonsData?.data || [];
  const total = lessonsData?.pagination?.total || 0;
  const totalPages = lessonsData?.pagination?.pages || 1;

  // -------------------------
  // FETCH DATA
  // -------------------------
  const fetchLessons = useCallback(async () => {
    setLoading(true);

    const params = new URLSearchParams();

    // Trim whitespace and remove internal spaces from all filters
    if (search && search.trim()) {
      params.set("search", search.trim().replace(/\s+/g, " "));
    }
    if (category && category.trim()) {
      params.set("category", category.trim());
    }
    if (tone && tone.trim()) {
      params.set("tone", tone.trim());
    }
    if (sort) params.set("sort", sort);

    params.set("page", String(page));
    params.set("limit", String(LIMIT));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/public?${params.toString()}`,
    );
    const data = await res.json();

    setLessonsData(data);
    setLoading(false);
  }, [search, category, tone, sort, page]);

  // fetch categories and tones from backend
  // (removed dynamic filter fetching; lists are static)

  // -------------------------
  // AUTO FETCH ON CHANGE
  // -------------------------
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!mounted) return;
      await fetchLessons();
    };
    load();
    return () => {
      mounted = false;
    };
  }, [fetchLessons]);

  // categories and tones are intentionally static to match design

  const onFormSubmit = async (values) => {
    // update local states and reset page, then fetch
    setSearch(values.search || "");
    setCategory(values.category || "");
    setTone(values.tone || "");
    setSort(values.sort || "newest");
    setPage(1);
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="space-y-8 my-20 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-left max-w-4xl border-b-2 border-black dark:border-white pb-6 space-y-3">
        <h1 className="text-4xl sm:text-5xl font-serif font-black">
          THE PUBLIC INSIGHTS REGISTRY
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 font-serif italic">
          Public knowledge archive
        </p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="bg-[#F9F7F2] dark:bg-[#181816] border-2 border-black p-6 space-y-5">
        {/* SEARCH */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              {...register("search")}
              value={search}
              onChange={(e) => {
                const newValue = e.target.value;
                setSearch(newValue);
                setValue("search", newValue);
              }}
              placeholder="Search lessons..."
              className="w-full pl-10 py-3 border-2 border-black"
            />
          </div>

          <button className="px-6 border-2 border-black bg-black text-white">
            Search
          </button>
        </form>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase">
          {/* CATEGORY */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <select
              value={category}
              onChange={(e) => {
                const newValue = e.target.value;
                setCategory(newValue);
                setValue("category", newValue);
                setPage(1);
                // Fetch will be triggered by useEffect when category state changes
              }}
              className="border-2 border-black px-2 py-1"
            >
              <option value="">All Categories</option>
              {categoriesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* TONE */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <select
              value={tone}
              onChange={(e) => {
                const newValue = e.target.value;
                setTone(newValue);
                setValue("tone", newValue);
                setPage(1);
                // Fetch will be triggered by useEffect when tone state changes
              }}
              className="border-2 border-black px-2 py-1"
            >
              <option value="">All Tones</option>
              {tonesList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* SORT */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            <select
              value={sort}
              onChange={(e) => {
                const newValue = e.target.value;
                setSort(newValue);
                setValue("sort", newValue);
                setPage(1);
                // Fetch will be triggered by useEffect when sort state changes
              }}
              className="border-2 border-black px-2 py-1"
            >
              <option value="newest">Newest</option>
              <option value="most_saved">Most Saved</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("");
              setTone("");
              setSort("newest");
              setPage(1);
              setValue("search", "");
              setValue("category", "");
              setValue("tone", "");
              setValue("sort", "newest");
            }}
            className="ml-auto underline"
          >
            Reset
          </button>
        </div>
      </div>

      {/* INFO / STATUS */}
      <div className="flex items-center justify-between text-xs font-bold uppercase border-b pb-2">
        <div>Total: {total}</div>
        <div>
          Showing page {page} of {totalPages}
        </div>
      </div>

      {/* LOADING */}
      {loading && <p className="text-sm">Loading...</p>}

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr auto-cols-fr gap-6">
        {lessons.map((lesson, idx) => {
          // Check if blurred/locked
          const isPremium = lesson.accessLevel === "premium";
          const isViewerPremium = user?.isPremium || user?.role === "admin";
          const isCreator = user?.id === lesson.creatorId;
          const isBlurred = isPremium && !isViewerPremium && !isCreator;

          return (
            <Link
              href={isBlurred ? "/pricing" : `/lessons/${lesson._id}`}
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

              {/* CARD CONTENT */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-black border border-black">
                    {lesson.category}
                  </span>

                  <span
                    className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border border-black dark:border-white/50 ${
                      lesson.accessLevel === "premium"
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-black dark:text-white leading-tight line-clamp-2 hover:underline">
                  {lesson.title}
                </h3>

                <div className="flex gap-2 items-center text-[9px] uppercase font-bold tracking-wider text-neutral-500">
                  <span className="inline-block px-1.5 py-0.5 bg-[#FAF9F6] dark:bg-[#181816] border border-black/20">
                    RESONANCE: {lesson.emotionalTone}
                  </span>
                </div>

                <p className="text-neutral-500 dark:text-neutral-400 text-sm font-serif leading-relaxed line-clamp-4 italic">
                  &quot;{lesson.description}&quot;
                </p>
              </div>

              {/* FOOTER */}
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

                <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <figure className="relative w-7 h-7">
                      <Image
                        src={
                          lesson.creatorPhoto ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                        }
                        alt={lesson.creatorName}
                        fill
                        className="rounded-full border border-black dark:border-white object-cover"
                      />
                    </figure>

                    <div className="text-left">
                      <p className="text-[10px] font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 truncate max-w-25">
                        {lesson.creatorName}
                      </p>

                      <p className="text-[9px] font-mono text-neutral-400 flex items-center gap-0.5 uppercase font-bold">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button className="px-4 py-2 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[10px] uppercase font-black tracking-widest transition-all">
                    SEE DETAILS
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* PAGINATION */}
      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="p-2 border-2 border-black bg-white disabled:opacity-50"
          >
            <ChevronLeft />
          </button>

          <span className="px-4 py-2 border-2 border-black bg-white">
            PAGE {page} OF {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="p-2 border-2 border-black bg-white disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicLessonsPage;
