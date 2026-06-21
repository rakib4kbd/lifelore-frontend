import { fetchUserById } from "@/lib/fetchData";
import fetchUserSession from "@/lib/fetchUserSession";
import { Heart } from "lucide-react";
import { Award } from "lucide-react";
import { Lock } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PublicProfilePage = async ({ params }) => {
  const user = await fetchUserSession();
  const { id } = await params;
  const profile = await fetchUserById(id);
  if (profile.message) {
    return <div>{profile.message}</div>;
  }

  return (
    <>
      <div className="flex mx-auto my-10">
        <div className="flex gap-5">
          <div className="lg:col-span-7 rounded-none border border-zinc-800 bg-zinc-950 p-6 max-w-7xl min-w-2xl">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wide text-zinc-400">
                  Registered Email
                </label>

                <input
                  disabled
                  value={profile.email}
                  className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-500 outline-none"
                />

                <p className="text-xs text-zinc-500">
                  Account email cannot be changed.
                </p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wide text-zinc-400">
                  Display Name
                </label>

                <p
                  className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-700"
                  defaultValue={profile.name}
                >
                  {profile.name}
                </p>
              </div>

              {/* Avatar */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wide text-zinc-400">
                  Avatar Image URL
                </label>

                <input
                  className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 outline-none transition focus:border-zinc-700"
                  value={profile.image}
                />
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="lg:col-span-5 rounded-none border border-zinc-800 bg-zinc-950 p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={
                  profile.image ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                }
                alt="preview"
                className="h-24 w-24 rounded-full object-cover ring-1 ring-zinc-800"
              />

              <h3 className="mt-4 text-lg font-bold text-white">
                {profile.name || "Unnamed User"}
              </h3>

              <p className="mt-1 text-xs text-zinc-500">{user?.email}</p>

              <div className="mt-4">
                {user?.isPremium ? (
                  <span className="inline-flex items-center gap-2 rounded-none border border-amber-500 px-3 py-1 text-xs text-amber-500">
                    <Award className="h-3.5 w-3.5" />
                    Premium Member
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-none border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
                    Standard Account
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center mx-auto">
        {profile.lessons.length == 0 && <>No lessons found.</>}
        {profile.lessons.map((lesson, idx) => {
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
    </>
  );
};

export default PublicProfilePage;
