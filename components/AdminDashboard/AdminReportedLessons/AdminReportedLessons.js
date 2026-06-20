"use client";
import { AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";
import AdminReportedLessonsTableData from "./AdminReportedLessonsTableData";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import showSuccessToast from "@/lib/showSuccessToast";
import showAlertToast from "@/lib/showAlertToast";

const AdminReportedLessons = () => {
  const [activeReportReason, setActiveReportReason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const router = useRouter();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/report`,
      );
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error(error);
      showAlertToast("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const onHandleReportAction = async (lessonId, action) => {
    if (!lessonId) return showAlertToast("Missing lesson configuration ID");

    try {
      if (action === "Delete") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/${lessonId}`,
          {
            method: "DELETE",
          },
        );
        if (res.ok) {
          setActiveReportReason(null);
          showSuccessToast("Lesson deleted successfully.");
          await fetchReports();
        } else {
          showAlertToast("Failed to delete lesson.");
        }
      }
      if (action === "Ignore") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/report/${lessonId}`,
          {
            method: "DELETE",
          },
        );
        if (res.ok) {
          setActiveReportReason(null);
          showSuccessToast("Report ignored successfully.");
          await fetchReports();
        } else {
          showAlertToast("Failed to ignore report.");
        }
      }
    } catch (err) {
      console.error("Report action failed:", err);
    }
  };

  return (
    <div className="space-y-6 text-left relative">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
          <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
          Incident Flagged Content Ledger
        </h2>
        <p className="text-xs text-slate-500">
          Audit user-made complaints, dissect reasons with reporter info, and
          take cleanup actions.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto" />
        </div>
      ) : reports.length === 0 ? (
        <p className="p-8 border border-dashed text-center text-slate-400 bg-slate-50/50 dark:bg-slate-950 text-xs rounded-xl">
          Excellent! Your reported moderation logs queue is completely empty.
        </p>
      ) : (
        /* REPORTS TABLE */
        <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-901 shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 uppercase font-mono text-[9px] text-slate-400 tracking-wider">
                <th className="p-3">Lesson Topic Title</th>
                <th className="p-3">Reporter Email</th>
                <th className="p-3">Issue Reason</th>
                <th className="p-3 text-center">Time</th>
                <th className="p-3 text-right">Moderations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {reports.map((rep) => (
                <AdminReportedLessonsTableData
                  key={rep._id}
                  rep={rep}
                  setActiveReportReason={setActiveReportReason}
                  setReports={setReports}
                  onHandleReportAction={onHandleReportAction}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeReportReason && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <h3 className="font-bold text-sm uppercase font-mono text-rose-500 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                Report Case Incident Detail
              </h3>

              <button
                onClick={() => setActiveReportReason(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {activeReportReason.map((report) => (
                <div
                  key={report._id}
                  className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 space-y-4"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      Reporter
                    </p>

                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {report.userInfo?.name}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      {report.userInfo?.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      Report Reason
                    </p>

                    <div className="mt-1 p-3 rounded-lg border border-rose-100 dark:border-rose-950 bg-rose-50 dark:bg-rose-950/20">
                      <p className="text-rose-700 dark:text-rose-300 font-medium">
                        {report.reason}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      Reported At
                    </p>

                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300">
                      {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 shrink-0">
              <button
                onClick={() => setActiveReportReason(null)}
                className="px-4 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                Close Audit
              </button>

              <button
                onClick={() =>
                  onHandleReportAction(activeReportReason[0]?._id, "Ignore")
                }
                className="px-4 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg font-semibold"
              >
                Ignore Complaint
              </button>

              <button
                onClick={() => {
                  onHandleReportAction(
                    activeReportReason[0].lessonId,
                    "Delete",
                  );
                }}
                className="px-4 py-2 text-xs bg-rose-600 text-white rounded-lg font-bold"
              >
                Destroy Target Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportedLessons;
