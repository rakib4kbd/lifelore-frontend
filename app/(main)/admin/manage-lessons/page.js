import React from "react";
import { fetchAdminLessons } from "@/lib/fetchData";
import AdminManageLessons from "@/components/AdminDashboard/AdminManageLessons";

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

  return (
    <AdminManageLessons
      publicLessonCount={publicLessonCount}
      privateLessonCount={privateLessonCount}
      reportedLessonCount={reportedLessonCount}
      initialLessons={allLessons}
    />
  );
};

export default ManageLessonsPage;
