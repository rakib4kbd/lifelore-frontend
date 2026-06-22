import React from "react";
import { fetchAdminLessons } from "@/lib/fetchData";
import AdminManageLessons from "@/components/AdminDashboard/AdminManageLessons";
import fetchUserSession from "@/lib/fetchUserSession";

const ManageLessonsPage = async () => {
  const {
    publicLessonCount,
    privateLessonCount,
    reportedLessonCount,
    allLessons,
  } = (await fetchAdminLessons()) || {
    publicLessonCount: 0,
    privateLessonCount: 0,
    reportedLessonCount: 0,
    allLessons: [],
  };
  const user = await fetchUserSession();

  return (
    <AdminManageLessons
      publicLessonCount={publicLessonCount}
      privateLessonCount={privateLessonCount}
      reportedLessonCount={reportedLessonCount}
      initialLessons={allLessons}
      user={user}
    />
  );
};

export default ManageLessonsPage;
