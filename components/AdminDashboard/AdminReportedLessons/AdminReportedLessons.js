"use client";
import { AlertTriangle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 10;
import AdminReportedLessonsTableData from "./AdminReportedLessonsTableData";
import showSuccessToast from "@/lib/showSuccessToast";
import showAlertToast from "@/lib/showAlertToast";
import { authClient } from "@/lib/auth-client";

const AdminReportedLessons = () => {
  const [activeReportReason, setActiveReportReason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(reports.length / PAGE_SIZE);
  const pagedReports = reports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/report`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!res.ok) {
        showAlertToast("Failed to load reports");
        return;
      }
      const data = await res.json();
      setReports(data);
    } catch {
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
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      if (action === "Delete") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/${lessonId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          setActiveReportReason(null);
          showSuccessToast("Lesson deleted successfully.");
          await fetchReports();
        } else showAlertToast("Failed to delete lesson.");
      }
      if (action === "Ignore") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/report/${lessonId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          setActiveReportReason(null);
          showSuccessToast("Report ignored successfully.");
          await fetchReports();
        } else showAlertToast("Failed to ignore report.");
      }
    } catch (err) {
      console.error("Report action failed:", err);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="text-xl font-serif font-black text-black dark:text-white flex items-center gap-1.5 uppercase tracking-widest">
          <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />{" "}
          Incident Flagged Content Ledger
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-sans">
          Audit user-made complaints, dissect reasons with reporter info, and
          take cleanup actions.
        </p>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="loading" />
        </div>
      ) : reports.length === 0 ? (
        <p className="p-8 border-2 border-dashed border-black/30 dark:border-white/30 text-center text-neutral-400 font-serif italic text-sm">
          &quot;Excellent! Your reported moderation logs queue is completely
          empty.&quot;
        </p>
      ) : (
        <div className="overflow-x-auto border-2 border-black dark:border-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-black text-white dark:bg-white dark:text-black border-b-2 border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
                <th className="p-4">Lesson Topic Title</th>
                <th className="p-4">Reporter Email</th>
                <th className="p-4">Issue Reason</th>
                <th className="p-4 text-center">Time</th>
                <th className="p-4 text-right">Moderations</th>
              </tr>
            </thead>
            <tbody>
              {pagedReports.map((rep) => (
                <AdminReportedLessonsTableData
                  key={rep._id}
                  rep={rep}
                  setActiveReportReason={setActiveReportReason}
                  setReports={setReports}
                  onHandleReportAction={onHandleReportAction}
                  setParentLoading={setLoading}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={(p) => { setPage(p); setActiveReportReason(null); }} totalItems={reports.length} pageSize={PAGE_SIZE} />

      {activeReportReason && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-editorial-bg dark:bg-editorial-dark-bg border-4 border-black dark:border-white w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b-2 border-black dark:border-white shrink-0">
              <h3 className="font-serif font-black text-sm uppercase tracking-widest text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 animate-pulse" /> Report Case
                Detail
              </h3>
              <button
                onClick={() => setActiveReportReason(null)}
                className="text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {activeReportReason.map((report) => (
                <div
                  key={report._id}
                  className="border-2 border-black dark:border-white p-4 space-y-3 bg-editorial-card dark:bg-editorial-dark-card"
                >
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">
                      Reporter
                    </p>
                    <p className="font-serif font-black text-black dark:text-white">
                      {report.userInfo?.name}
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500">
                      {report.userInfo?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">
                      Report Reason
                    </p>
                    <div className="p-3 border-2 border-rose-400 bg-rose-50 dark:bg-rose-950/20">
                      <p className="text-rose-700 dark:text-rose-300 font-bold text-xs">
                        {report.reason}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1">
                      Reported At
                    </p>
                    <p className="font-mono text-xs text-neutral-600 dark:text-neutral-300">
                      {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t-2 border-black dark:border-white flex justify-end gap-2 shrink-0">
              <button
                onClick={() => setActiveReportReason(null)}
                className="px-4 py-2 text-[11px] font-black uppercase tracking-widest border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Close Audit
              </button>
              <button
                onClick={() =>
                  onHandleReportAction(activeReportReason[0]?.lessonId, "Ignore")
                }
                className="px-4 py-2 text-[11px] font-black uppercase tracking-widest border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Ignore
              </button>
              <button
                onClick={() =>
                  onHandleReportAction(activeReportReason[0].lessonId, "Delete")
                }
                className="px-4 py-2 text-[11px] font-black uppercase tracking-widest bg-rose-600 text-white border-2 border-rose-600 hover:bg-rose-700 transition-colors"
              >
                Destroy Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportedLessons;
