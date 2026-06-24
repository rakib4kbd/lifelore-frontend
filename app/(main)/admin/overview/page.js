import AdminOverviewCharts from "@/components/AdminDashboard/AdminOverviewCharts";
import { fetchAdminStats } from "@/lib/fetchData";
import getToken from "@/lib/getToken";
import { Zap } from "lucide-react";

const DashboardAdminOverviewPage = async () => {
  const token = await getToken();
  const adminStats = await fetchAdminStats(token);

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
    if (!mergedData[item.date])
      mergedData[item.date] = {
        date: item.date,
        users: 0,
        lessons: item.lessons || 0,
      };
    else mergedData[item.date].lessons = item.lessons || 0;
  });
  const growthData = Object.values(mergedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const tiles = [
    {
      label: "Total Users",
      value: adminStats?.totalUsers || 0,
      color: "text-black dark:text-white",
    },
    {
      label: "Public Lessons",
      value: adminStats?.totalPublicLessons || 0,
      color: "text-black dark:text-white",
    },
    {
      label: "Reported Incidents",
      value: adminStats?.totalReportedLessons || 0,
      color: "text-rose-600 dark:text-rose-400",
    },
    {
      label: "Today's New Logs",
      value: adminStats?.todayLessonsCount || 0,
      color: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6 text-left">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="text-xl font-serif font-black text-black dark:text-white uppercase tracking-widest">
          System Global Performance Dashboard
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-sans">
          Platform-wide statistics, active sages contributors, and content
          expansion logs.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t, i) => (
          <div
            key={i}
            className="p-4 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card space-y-1"
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {t.label}
            </p>
            <p className={`text-3xl font-black font-serif ${t.color}`}>
              {t.value}
            </p>
          </div>
        ))}
      </div>

      <div className="border-2 border-black dark:border-white p-5 space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-3">
          Growth Analytics
        </h3>
        <AdminOverviewCharts growthData={growthData} />
      </div>

      <div className="space-y-4 border-t-2 border-black dark:border-white pt-6">
        <h4 className="text-sm font-black uppercase tracking-widest text-black dark:text-white flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
          Spotlight: Platform Active Contributors
        </h4>
        <div className="border-2 border-black dark:border-white divide-y divide-black/10 dark:divide-white/10">
          {adminStats?.mostActiveContributors?.map((author, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 ${index % 2 === 0 ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg" : "bg-white dark:bg-editorial-dark-card"}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-black text-neutral-400 w-6">
                  #{index + 1}
                </span>
                <img
                  src={
                    author.photo ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                  }
                  alt={author.name}
                  className="w-8 h-8 rounded-full object-cover border border-black dark:border-white"
                />
                <div>
                  <p className="text-xs font-black text-black dark:text-white">
                    {author.name}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-400">
                    {author.email}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
                <Zap className="w-3 h-3" />
                {author.count} inputs
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminOverviewPage;
