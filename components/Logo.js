import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-4 cursor-pointer">
      <div className="text-xl md:text-2xl font-black tracking-tighter uppercase italic px-4 py-1 border-2 border-black dark:border-white text-editorial-text dark:text-editorial-dark-text bg-editorial-bg dark:bg-transparent">
        LIFELORE
      </div>
      <div className="hidden md:block">
        <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 block tracking-widest uppercase">
          WISDOM JOURNAL
        </span>
      </div>
    </div>
  );
};

export default Logo;
