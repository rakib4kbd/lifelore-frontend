import AdminReportedLessons from "@/components/AdminDashboard/AdminReportedLessons/AdminReportedLessons";
import AdminReportedLessonsTableData from "@/components/AdminDashboard/AdminReportedLessons/AdminReportedLessonsTableData";
import { fetchAdminLessonReports } from "@/lib/fetchData";
import React from "react";

const ReportedLessons = async () => {
  const loading = false;
  const reports = await fetchAdminLessonReports();

  return <AdminReportedLessons loading={loading} reports={reports} />;
};

export default ReportedLessons;
