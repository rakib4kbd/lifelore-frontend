import ChartOverview from "@/components/Dashboard/ChartOverview";
import { auth } from "@/lib/auth";
import {
  fetchFavouriteLessonsByUserId,
  fetchLessonCountByCreatorId,
  fetchLessonsByCreatorId,
} from "@/lib/fetchData";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const DashboardOverview = async () => {
  const { user } =
    (await auth.api.getSession({ headers: await headers() })) || {};
  const totalLessonsCreated = await fetchLessonCountByCreatorId(user?.id);
  const savedLessons = await fetchFavouriteLessonsByUserId(user?.id);
  const recentlyCreatedLessons = await fetchLessonsByCreatorId(user?.id);

  const stats = [
    {
      label: "My Archive Total",
      value: totalLessonsCreated.count || 0,
      subtitle: "Written lessons",
      color: "bg-indigo-500/10 dark:bg-indigo-950/20",
    },
    {
      label: "Favorites Library",
      value: savedLessons.length || 0,
      subtitle: "Saved bookmarks",
      color: "bg-emerald-500/10 dark:bg-emerald-950/20",
    },
    {
      label: "Recently Added Lessons",
      value: recentlyCreatedLessons.length || 1,
      subtitle: "Mindful habits",
      color: "bg-amber-500/10 dark:bg-amber-950/20",
    },
  ];

  const importantActions = [
    {
      label: "Create New Lesson",
      navigation: "/dashboard/add-lesson",
    },
    {
      label: "Manage Existing Lessons",
      navigation: "/dashboard/my-lessons",
    },
    {
      label: "View Saved Lessons",
      navigation: "/dashboard/my-favorites",
    },
  ];

  return (
    <div className="space-y-8 p-4">
      {/* Banner */}
      <div className="space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          {`Welcome back, ${user?.name.split(" ")[0]}!`}
        </h2>
        <p className="text-xs text-slate-500">
          Trace your dynamic contributions, manage your drafted files, and check
          on premium locks.
        </p>
      </div>

      {/* Core widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-5 rounded-none border border-editorial-bg dark:border-editorial-bg space-y-2 ${stat.color}`}
          >
            <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest font-mono">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400">{stat.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {importantActions.map((action, index) => (
          <Link
            key={index}
            href={action.navigation}
            className="btn btn-xl p-5 rounded-none border border-editorial-bg dark:border-editorial-bg space-y-2 bg-slate-50 dark:bg-slate-950"
          >
            <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest font-mono">
              {action.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-800 dark:text-white">
                {action.value}
              </span>
              <span className="text-xs text-slate-400">{action.subtitle}</span>
            </div>
          </Link>
        ))}
      </div>
      <ChartOverview
        lessons={recentlyCreatedLessons}
        favouriteLessons={savedLessons}
      />
    </div>
  );
};

export default DashboardOverview;
