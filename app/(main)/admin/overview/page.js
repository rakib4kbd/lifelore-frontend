import AdminOverviewCharts from "@/components/AdminDashboard/AdminOverviewCharts";
import { fetchAdminStats } from "@/lib/fetchData";
import { Zap } from "lucide-react";
import React from "react";

const DashboardAdminOverviewPage = async () => {
  const adminStats = await fetchAdminStats();

  const mergedData = {};

  adminStats?.userGrowthData?.forEach((item) => {
    if (!item.date) return;

    mergedData[item.date] = {
      date: item.date,
      users: item.users || 0,
      lessons: 0,
    };
  });

  adminStats?.lessonGrowthData?.forEach((item) => {
    if (!item.date) return;

    if (!mergedData[item.date]) {
      mergedData[item.date] = {
        date: item.date,
        users: 0,
        lessons: item.lessons || 0,
      };
    } else {
      mergedData[item.date].lessons = item.lessons || 0;
    }
  });

  const growthData = Object.values(mergedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return (
    <div className="space-y-8 text-left">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          System Global Performance Dashboard
        </h2>
        <p className="text-xs text-slate-400">
          Platform-wide statistics, active sages contributors, and content
          expansion logs.
        </p>
      </div>

      {/* Stats tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total Users
          </p>
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
            {adminStats?.totalUsers || 0}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Public Lessons
          </p>
          <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
            {adminStats?.totalPublicLessons || 0}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Reported Incidents
          </p>
          <p className="text-2xl font-extrabold text-rose-500">
            {adminStats?.totalReportedLessons || 0}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Today's New Logs
          </p>
          <p className="text-2xl font-extrabold text-emerald-500">
            {adminStats?.todayLessonsCount || 0}
          </p>
        </div>
      </div>

      {/* DYNAMIC VISUALIZATION GRAPHS (USER / LESSON GROWTH) */}
      <div className="p-5 border rounded-2xl space-y-4">
        <AdminOverviewCharts growthData={growthData} />
      </div>

      {/* Sages / Most active contributors table list summary */}
      <div className="space-y-4 border-t border-slate-100 dark:border-slate-800/80 pt-6">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
          Spotlight: Platform Active Contributors
        </h4>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {adminStats?.mostActiveContributors?.map((author, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-400 font-bold">
                  #0{index + 1}
                </span>
                <img
                  src={
                    author.photo ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                  }
                  alt={author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {author.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{author.email}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-500/15">
                {author.count} registered inputs
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminOverviewPage;
