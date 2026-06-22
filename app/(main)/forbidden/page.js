import Link from "next/link";
import { ShieldAlert } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="my-10 px-4 sm:px-0">
      <div className="py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6 border-2 border-black dark:border-white p-8 sm:p-12 bg-editorial-card dark:bg-editorial-dark-card">
        <div className="w-16 h-16 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-5xl font-serif italic text-black dark:text-white">
          Access Denied
        </h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          403 Forbidden
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
          You do not have the required permissions to access this section of the archive.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-black text-xs uppercase tracking-widest hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
