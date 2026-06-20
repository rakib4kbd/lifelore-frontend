import { X } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import React from "react";

const ReportedLessons = () => {
  const loading = false;
  const reports = [
    {
      id: 1,
      lessonTitle: "Sample Lesson Title",
      lessonId: "L001",
      reporterUserEmail: "reporter@example.com",
      reason: "Inappropriate Content",
      timestamp: new Date(),
    },
  ];

  const activeReportReason = null;
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
                <tr
                  key={rep.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all"
                >
                  <td className="p-3">
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">
                      {rep.lessonTitle}
                    </span>
                    <span className="text-[9.5px] text-slate-400 font-mono block">
                      LID: {rep.lessonId}
                    </span>
                  </td>

                  <td className="p-3 text-xs font-mono text-slate-550 max-w-[120px] truncate">
                    {rep.reporterUserEmail}
                  </td>

                  <td className="p-3 font-semibold text-rose-600 dark:text-rose-450 truncate max-w-[130px]">
                    {rep.reason}
                  </td>

                  <td className="p-3 text-center text-slate-400 font-mono">
                    {new Date(rep.timestamp).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-right space-x-1">
                    <button
                      //   onClick={() => setActiveReportReason(rep)}
                      className="px-2 py-1 text-[10.5px] font-bold text-indigo-600 border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 rounded bg-white"
                    >
                      Audit
                    </button>

                    <button
                      //   onClick={() => handleReportAction(rep.id, "Ignore")}
                      className="px-2 py-1 text-[10.5px] font-semibold text-slate-600 border border-slate-100 dark:border-slate-850 hover:bg-slate-100 rounded"
                    >
                      Ignore
                    </button>

                    <button
                      //   onClick={() => handleReportAction(rep.id, "Delete")}
                      className="px-2 py-1 text-[10.5px] font-bold text-white bg-rose-500 hover:bg-rose-600 rounded cursor-pointer"
                    >
                      Block/Wipe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DETAIL MODAL OVERLAY */}
      {activeReportReason && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-45">
          <div className="bg-white dark:bg-slate-900 border border-slate-105 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="font-bold text-sm text-slate-850 dark:text-white uppercase font-mono text-rose-500 flex items-center gap-1">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                Report Case Incident Detail
              </h3>
              <button
                onClick={() => setActiveReportReason(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-0.5">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Report target lesson:
                </p>
                <p className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  {activeReportReason.lessonTitle}
                </p>
                <p className="text-[9px] font-mono text-slate-404">
                  LID ID: {activeReportReason.lessonId}
                </p>
              </div>

              <div className="space-y-0.5">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Lodged Reporter:
                </p>
                <p className="font-mono text-slate-700 dark:text-slate-200">
                  {activeReportReason.reporterUserEmail}
                </p>
                <p className="text-[9px] text-slate-400">
                  UID: {activeReportReason.reporterUserId}
                </p>
              </div>

              <div className="space-y-0.5">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Categorized Infringement Reason:
                </p>
                <p className="p-3 rounded-lg border bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-350 font-bold leading-normal">
                  {activeReportReason.reason}
                </p>
              </div>

              <div className="flex justify-between text-[11px] text-slate-404 py-1">
                <span>Complaint timestamp:</span>
                <span className="font-mono">
                  {new Date(activeReportReason.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 text-xs">
              <button
                // onClick={() => setActiveReportReason(null)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-slate-650"
              >
                Close Audit
              </button>

              <button
                // onClick={() =>
                //   handleReportAction(activeReportReason.id, "Ignore")
                // }
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold"
              >
                Ignore Complaint
              </button>

              <button
                // onClick={() =>
                //   handleReportAction(activeReportReason.id, "Delete")
                // }
                className="px-4 py-2 bg-rose-550 text-white rounded-lg font-bold shadow cursor-pointer"
              >
                Destroy Target lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
