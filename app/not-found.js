import Link from "next/link";

const NotFound = () => {
  return (
    <div className="my-10 py-24 text-center max-w-xl mx-auto space-y-6 border-2 border-black dark:border-white p-12 bg-[#F9F7F2] dark:bg-[#181816]">
      <h2 className="text-5xl font-serif italic text-black dark:text-white">
        Path Misplaced
      </h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
        We wandered beyond the cataloged ledger lines. Every lesson has its
        correct room; return to safety below.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors"
      >
        Return Home Perimeter
      </Link>
    </div>
  );
};

export default NotFound;
