"use client";

import { fetchAdminLessonReportsByLessonId } from "@/lib/fetchData";

const AdminReportedLessonsTableData = ({ rep, setActiveReportReason }) => {
  return (
    <tr
      key={rep._id}
      className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all"
    >
      <td className="p-3">
        <span className="font-bold text-slate-800 dark:text-slate-100 block">
          {rep.lesson.title}
        </span>
        <span className="text-[9.5px] text-slate-400 font-mono block">
          LID: {rep.lessonId}
        </span>
      </td>

      <td className="p-3 text-xs font-mono text-slate-550 max-w-[120px] truncate">
        {rep.user.email}
      </td>

      <td className="p-3 font-semibold text-rose-600 dark:text-rose-450 truncate max-w-[130px]">
        {rep.reason}
      </td>

      <td className="p-3 text-center text-slate-400 font-mono">
        <div className="flex flex-col items-center justify-center">
          <span>{new Date(rep.createdAt).toLocaleTimeString()}</span>
          <span>{new Date(rep.createdAt).toLocaleDateString()}</span>
        </div>
      </td>

      <td className="p-3 text-right space-x-1">
        <button
          onClick={() =>
            fetchAdminLessonReportsByLessonId(rep.lessonId).then((reports) => {
              console.log(reports);
              setActiveReportReason(reports);
            })
          }
          className="px-2 py-1 text-[10.5px] font-bold text-indigo-600 border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 rounded bg-white"
        >
          Audit
        </button>

        <button
          onClick={() => handleReportAction(rep.lessonId, "Ignore")}
          className="px-2 py-1 text-[10.5px] font-semibold text-slate-600 border border-slate-100 dark:border-slate-850 hover:bg-slate-100 rounded"
        >
          Ignore
        </button>

        <button
          onClick={() => handleReportAction(rep.lessonId, "Delete")}
          className="px-2 py-1 text-[10.5px] font-bold text-white bg-rose-500 hover:bg-rose-600 rounded cursor-pointer"
        >
          Block/Wipe
        </button>
      </td>
    </tr>
  );
};

export default AdminReportedLessonsTableData;
