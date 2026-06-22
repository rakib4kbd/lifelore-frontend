import { fetchFeaturedLessons } from "@/lib/fetchData";
import { Bookmark, Calendar, Lock, Heart, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedLifeLessons = async ({ user }) => {
  const featured = await fetchFeaturedLessons();
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap justify-between items-end gap-3 border-b border-black/40 dark:border-white/40 pb-3">
        <div className="text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white font-serif">
            Featured Editorial Scribe Selections
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm leading-normal">
            Public archives reviewed by editors for structural value and outstanding mental models.
          </p>
        </div>
        <Link
          href="/lessons"
          className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-black dark:text-white border-b-2 border-black dark:border-white pb-0.5 hover:opacity-70 transition-all shrink-0"
        >
          Review All Lessons
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {featured.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-black/30 dark:border-white/30 text-center text-neutral-400 text-sm font-serif italic">
          No lessons marked as featured yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((lesson, idx) => {
            const isPremium = lesson.accessLevel === "premium";
            const isViewerPremium = user?.isPremium || user?.role === "admin";
            const isCreator = user?.id === lesson.creatorId;
            const isBlurred = isPremium && !isViewerPremium && !isCreator;

            return (
              <Link
                href={isBlurred ? "/pricing" : `/lessons/${lesson._id}`}
                key={idx}
                className="group relative flex flex-col bg-editorial-bg dark:bg-editorial-dark-bg border-2 border-black dark:border-white overflow-hidden p-6 text-left hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer"
              >
                {isBlurred && (
                  <div className="absolute inset-0 bg-editorial-bg/95 dark:bg-editorial-dark-card/95 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black border-2 border-black flex items-center justify-center mb-4">
                      <Lock className="w-5 h-5 animate-bounce" />
                    </div>
                    <p className="font-serif font-black text-lg text-black dark:text-white">Premium Lesson Locked</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 max-w-[200px] mt-2">
                      Membership log access key requested for this lesson sheet.
                    </p>
                    <span className="mt-5 px-6 py-2 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase font-black tracking-widest">
                      Unlock with Premium ⭐
                    </span>
                  </div>
                )}

                <div className="flex flex-col justify-between flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-black font-mono border border-black shrink-0">
                        {lesson.category}
                      </span>
                      <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest border border-black dark:border-white/50 shrink-0 ${lesson.accessLevel === "premium" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"}`}>
                        {lesson.accessLevel}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-black dark:text-white leading-tight line-clamp-2 group-hover:underline">
                      {lesson.title}
                    </h3>

                    <div className="flex gap-2 items-center text-[9px] uppercase font-bold tracking-wider text-neutral-500">
                      <span className="inline-block px-1.5 py-0.5 bg-editorial-bg dark:bg-editorial-dark-card border border-black/20">
                        RESONANCE: {lesson.emotionalTone}
                      </span>
                    </div>

                    <p className="text-neutral-500 dark:text-neutral-400 text-sm font-serif leading-relaxed line-clamp-4 italic">
                      &quot;{lesson.description}&quot;
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-end gap-2 pb-2 text-neutral-500">
                      <span className="flex items-center gap-1 text-[10px]">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500/10" />{lesson.likesCount}
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Bookmark className="w-3 h-3 text-emerald-500 fill-emerald-500/10" />{lesson.favouritesCount || 0}
                      </span>
                    </div>
                    <div className="border-t border-black/10 dark:border-white/10 pt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <figure className="relative w-7 h-7 shrink-0">
                          <Image
                            src={lesson.creatorPhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                            alt={lesson.creatorName}
                            fill
                            className="rounded-full border border-black dark:border-white object-cover"
                          />
                        </figure>
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 truncate">
                            {lesson.creatorName}
                          </p>
                          <p className="text-[9px] font-mono text-neutral-400 flex items-center gap-0.5 uppercase font-bold">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(lesson.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 px-3 py-1.5 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase font-black tracking-widest">
                        SEE DETAILS
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedLifeLessons;
