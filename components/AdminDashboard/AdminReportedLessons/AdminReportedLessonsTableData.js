"use client";

import { fetchAdminLessonReportsByLessonId } from "@/lib/fetchData";
import { useState } from "react";

const AdminReportedLessonsTableData = ({
  rep,
  setActiveReportReason,
  onHandleReportAction,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIgnoring, setIsIgnoring] = useState(false);

  return (
    <tr className="border-b border-black/10 dark:border-white/10 hover:bg-editorial-card/50 dark:hover:bg-editorial-dark-card/50 transition-colors">
      <td className="p-4">
        <span className="font-bold text-sm text-black dark:text-white block line-clamp-1">
          {rep.lesson.title}
        </span>
        <span className="text-[9px] font-mono text-neutral-400 block">
          LID: {rep.lessonId?.slice(-12)}
        </span>
      </td>
      <td className="p-4 text-[10px] font-mono text-neutral-500 dark:text-neutral-400 max-w-[120px] truncate">
        {rep.user.email}
      </td>
      <td className="p-4 text-[10px] font-bold text-rose-600 dark:text-rose-400 truncate max-w-[130px]">
        {rep.reason}
      </td>
      <td className="p-4 text-center text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
        <div className="flex flex-col items-center">
          <span>{new Date(rep.createdAt).toLocaleTimeString()}</span>
          <span>{new Date(rep.createdAt).toLocaleDateString()}</span>
        </div>
      </td>
      <td className="p-4 text-right space-x-1">
        <button
          onClick={async () => {
            setLoading(true);
            await fetchAdminLessonReportsByLessonId(rep.lessonId).then(
              setActiveReportReason,
            );
            setLoading(false);
          }}
          className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          {loading ? "Loading..." : "Audit"}
        </button>
        <button
          onClick={async () => {
            setIsIgnoring(true);
            await onHandleReportAction(rep.lessonId, "Ignore");
            setIsIgnoring(false);
          }}
          className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border border-black/30 dark:border-white/30 text-neutral-500 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          {isIgnoring ? "Ignoring..." : "Ignore"}
        </button>
        <button
          onClick={async () => {
            setIsDeleting(true);
            await onHandleReportAction(rep.lessonId, "Delete");
            setIsDeleting(false);
          }}
          className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest bg-rose-600 text-white hover:bg-rose-700 border-2 border-rose-600 transition-colors"
        >
          {isDeleting ? "Deleting..." : "Block/Wipe"}
        </button>
      </td>
    </tr>
  );
};

export default AdminReportedLessonsTableData;
