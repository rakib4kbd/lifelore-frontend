import Link from "next/link";

const PaymentCancelled = () => {
  return (
    <div className="my-10 px-4 sm:px-0">
      <div className="py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6 border-2 border-black dark:border-white p-8 sm:p-12 bg-editorial-card dark:bg-editorial-dark-card">
        <h2 className="text-5xl font-serif italic text-black dark:text-white">
          Payment Interrupted
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
          The checkout session was not completed. No charge has been recorded.
          You may return and try again whenever you are ready.
        </p>

        <Link
          href="/lessons"
          className="inline-block px-8 py-3 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors"
        >
          Return To Lessons
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
