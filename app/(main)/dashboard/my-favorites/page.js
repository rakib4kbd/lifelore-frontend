import MyFavouritesDeleteButton from "@/components/Dashboard/MyFavourites/MyFavouritesDeleteButton";
import MyFavouriteLessonsTable from "@/components/Dashboard/MyFavourites/MyFavouritesLessonsTable";
import { auth } from "@/lib/auth";
import { fetchFavouriteLessonsByUserId } from "@/lib/fetchData";
import { Filter, Heart } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const MyFavouritePage = async () => {
  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
  ];
  const emotionalTones = ["Motivational", "Sad", "Realization", "Gratitude"];

  const { user } =
    (await auth.api.getSession({ headers: await headers() })) || {};

  if (!user) {
    return (
      <div className="p-6">
        <div className="border-2 border-dashed border-black/30 dark:border-white/30 p-8 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400 font-serif italic">
            Please sign in to view your saved lessons.
          </p>
        </div>
      </div>
    );
  }

  const favouriteLessons = await fetchFavouriteLessonsByUserId(user?.id);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="flex items-center gap-2 text-xl font-serif font-black uppercase tracking-widest text-black dark:text-white">
          <Heart className="h-5 w-5" /> My Saved Wisdom Portfolios
        </h2>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
          Trace wisdom and rules you bookmarked for routine mindful reflection.
        </p>
      </div>

      <MyFavouriteLessonsTable
        favouriteLessons={favouriteLessons}
        userId={user?.id}
      />
    </div>
  );
};

export default MyFavouritePage;
