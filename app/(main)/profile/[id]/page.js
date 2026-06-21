import { fetchUserById } from "@/lib/fetchData";
import fetchUserSession from "@/lib/fetchUserSession";
import { Heart, Award, Lock, Bookmark, Calendar, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PublicProfilePage = async ({ params }) => {
  const user = await fetchUserSession();
  const { id } = await params;
  const profile = await fetchUserById(id);

  if (profile.message) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 text-center">
        <p className="text-neutral-500 dark:text-neutral-400 font-serif italic text-lg">
          {profile.message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 space-y-12">
      {/* Profile Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b-2 border-black dark:border-white pb-10">
        {/* Avatar + Badge */}
        <div className="md:col-span-3 flex flex-col items-center text-center space-y-4 p-6 bg-editorial-card dark:bg-editorial-dark-card border-2 border-black dark:border-white">
          <div className="relative w-24 h-24 rounded-full border-2 border-black dark:border-white overflow-hidden">
            <Image
              src={
                profile.image ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
              }
              alt={profile.name || "User"}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-serif font-black text-xl text-black dark:text-white">
              {profile.name || "Unnamed User"}
            </h3>
            <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-1">
              {profile.email}
            </p>
          </div>

          <div>
            {profile.isPremium ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
                <Award className="w-3 h-3" />
                Premium Member
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black dark:border-white text-[9px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                <UserIcon className="w-3 h-3" />
                Standard Account
              </span>
            )}
          </div>
        </div>

        {/* Profile Info Fields */}
        <div className="md:col-span-9 space-y-5 p-6 bg-white dark:bg-editorial-dark-bg border-2 border-black dark:border-white">
          <div className="border-b border-black/10 dark:border-white/10 pb-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
              Registered Email
            </p>
            <p className="text-sm font-serif text-black dark:text-white">
              {profile.email}
            </p>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 font-sans">
              Account email cannot be changed.
            </p>
          </div>

          <div className="border-b border-black/10 dark:border-white/10 pb-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
              Display Name
            </p>
            <p className="text-sm font-serif font-bold text-black dark:text-white">
              {profile.name}
            </p>
          </div>

          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
              Public Lessons
            </p>
            <p className="text-sm font-serif text-black dark:text-white">
              {profile.lessons?.length || 0}{" "}
              {profile.lessons?.length === 1 ? "lesson" : "lessons"} published
            </p>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="space-y-6">
        <div className="border-b border-black/40 dark:border-white/40 pb-3">
          <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white font-serif">
            Published Lessons
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-1">
            Wisdom entries shared publicly by this contributor.
          </p>
        </div>

        {profile.lessons.length === 0 ? (
          <div className="p-8 rounded-none border-2 border-dashed border-black/30 dark:border-white/30 text-center text-neutral-400 dark:text-neutral-500 text-sm font-serif italic">
            &quot;No lessons published yet.&quot;
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.lessons.map((lesson, idx) => {
              const isPremium = lesson.accessLevel === "premium";
              const isViewerPremium = user?.isPremium || user?.role === "admin";
              const isCreator = user?.id === lesson.creatorId;
              const isBlurred = isPremium && !isViewerPremium && !isCreator;

              return (
                <Link
                  href={isBlurred ? "/pricing" : `/lessons/${lesson._id}`}
                  key={idx}
                  className="group relative flex flex-col justify-between bg-editorial-bg dark:bg-editorial-dark-bg border-2 border-black dark:border-white rounded-none overflow-hidden p-6 text-left hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer"
                >
                  {/* Lock overlay for premium */}
                  {isBlurred && (
                    <div className="absolute inset-0 bg-editorial-bg/95 dark:bg-editorial-dark-card/95 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black border-2 border-black flex items-center justify-center mb-4">
                        <Lock className="w-5 h-5 animate-bounce" />
                      </div>
                      <p className="font-serif font-black text-lg text-black dark:text-white">
                        Premium Lesson Locked
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 max-w-[200px] mt-2">
                        Membership required for this lesson.
                      </p>
                      <span className="mt-5 px-6 py-2 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-[10px] uppercase font-black tracking-widest">
                        Unlock with Premium ⭐
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black text-[9px] uppercase tracking-widest font-black border border-black font-mono">
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

                    <h3 className="font-serif font-bold text-xl text-black dark:text-white leading-tight line-clamp-2 group-hover:underline">
                      {lesson.title}
                    </h3>

                    <div className="text-[9px] uppercase font-bold tracking-wider text-neutral-500">
                      <span className="inline-block px-1.5 py-0.5 bg-editorial-bg dark:bg-editorial-dark-card border border-black/20">
                        RESONANCE: {lesson.emotionalTone}
                      </span>
                    </div>

                    <p className="text-neutral-500 dark:text-neutral-400 text-sm font-serif leading-relaxed line-clamp-3 italic">
                      &quot;{lesson.description}&quot;
                    </p>
                  </div>

                  <div className="mt-4">
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
                          <p className="text-[10px] font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 truncate max-w-[100px]">
                            {lesson.creatorName}
                          </p>
                          <p className="text-[9px] font-mono text-neutral-400 flex items-center gap-0.5 uppercase font-bold">
                            <Calendar className="w-2.5 h-2.5" />
                            {new Date(lesson.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="px-4 py-2 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[10px] uppercase font-black tracking-widest transition-all">
                        SEE DETAILS
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfilePage;
