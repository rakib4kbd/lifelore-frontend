import DashboardProfile from "@/components/Dashboard/Profile/Profile";
import { auth } from "@/lib/auth";
import {
  fetchFavouriteLessonsByUserId,
  fetchLessonCountByCreatorId,
  fetchLessonsByCreatorId,
} from "@/lib/fetchData";
import { headers } from "next/headers";
import React from "react";

const DashboardSettings = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
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
      value: recentlyCreatedLessons.length || 0,
      subtitle: "Mindful habits",
      color: "bg-amber-500/10 dark:bg-amber-950/20",
    },
    { recentlyCreatedLessons: recentlyCreatedLessons },
  ];
  return (
    <div>
      <DashboardProfile user={user} stats={stats} />
    </div>
  );
};

export default DashboardSettings;
