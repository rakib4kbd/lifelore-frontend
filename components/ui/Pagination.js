"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onPageChange, totalItems, pageSize }) => {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t-2 border-black dark:border-white pt-4 mt-4">
      <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
        {from}–{to} of {totalItems}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-3 py-1 border-2 border-black dark:border-white text-[10px] font-black uppercase tracking-widest text-black dark:text-white">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
