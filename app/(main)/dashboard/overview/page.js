import ChartOverview from "@/components/Dashboard/ChartOverview";
import { auth } from "@/lib/auth";
import { fetchFavouriteLessonsByUserId, fetchLessonCountByCreatorId, fetchLessonsByCreatorId } from "@/lib/fetchData";
import { headers } from "next/headers";
import Link from "next/link";

const DashboardOverview = async () => {
  const { user } = (await auth.api.getSession({ headers: await headers() })) || {};
  const totalLessonsCreated = await fetchLessonCountByCreatorId(user?.id);
  const savedLessons = await fetchFavouriteLessonsByUserId(user?.id);
  const recentlyCreatedLessons = await fetchLessonsByCreatorId(user?.id);

  const stats = [
    { label: "My Archive Total", value: totalLessonsCreated.count || 0, subtitle: "lessons written" },
    { label: "Favorites Library", value: savedLessons.length || 0, subtitle: "saved bookmarks" },
    { label: "Recently Added", value: recentlyCreatedLessons.length || 0, subtitle: "recent logs" },
  ];

  const importantActions = [
    { label: "Create New Lesson", navigation: "/dashboard/add-lesson" },
    { label: "Manage My Lessons", navigation: "/dashboard/my-lessons" },
    { label: "View Saved Lessons", navigation: "/dashboard/my-favorites" },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="text-xl sm:text-2xl font-serif font-black text-black dark:text-white tracking-tight">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-sans">
          Trace your dynamic contributions, manage your drafted files, and check on premium locks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-5 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card space-y-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{stat.label}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-black dark:text-white font-serif">{stat.value}</span>
              <span className="text-xs text-neutral-400 font-sans">{stat.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {importantActions.map((action, i) => (
          <Link
            key={i}
            href={action.navigation}
            className="p-5 border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all group"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white group-hover:text-white dark:group-hover:text-black">{action.label}</p>
            <p className="text-[9px] font-mono text-neutral-400 group-hover:text-neutral-300 mt-1 uppercase tracking-wider">→ Open</p>
          </Link>
        ))}
      </div>

      <ChartOverview lessons={recentlyCreatedLessons} favouriteLessons={savedLessons} />
    </div>
  );
};

export default DashboardOverview;
