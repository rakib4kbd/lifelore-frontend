import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-[#FAF9F6] dark:bg-[#121212] border-t-2 border-black dark:border-white text-neutral-800 dark:text-neutral-300 py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Col 1 Brand */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="text-xl font-black tracking-tighter uppercase italic px-3 py-1 border-2 border-black dark:border-white text-black dark:text-white bg-white dark:bg-transparent">
              LIFELORE
            </div>
          </Link>
          <p className="text-xs font-serif italic leading-relaxed text-neutral-600 dark:text-neutral-400">
            &quot;A library of collective realizations, strategic mindsets, and
            lessons distilled from human failures, preserved for future seeking
            souls.&quot;
          </p>
        </div>

        {/* Col 2 Quick Links */}
        <div className="font-sans">
          <h3 className="text-neutral-900 dark:text-white text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b border-black/10 dark:border-white/10 font-sans">
            Directory
          </h3>
          <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <li>
              <Link
                href="/"
                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                ARCHIVAL CAROUSEL
              </Link>
            </li>
            <li>
              <Link
                href="/lessons"
                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                INSIGHTS REGISTRY
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                MEMBERSHIP PLANS
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="hover:text-black dark:hover:text-white transition-colors cursor-pointer text-left"
              >
                SELF WRITING ROOM
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3 Legal/Terms */}
        <div className="font-sans">
          <h3 className="text-neutral-900 dark:text-white text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b border-black/10 dark:border-white/10 font-sans">
            Governance
          </h3>
          <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <li>
              <Link
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors block"
              >
                RECORDING CHARTER
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors block"
              >
                PRIVACY LOGICS
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors block"
              >
                ACCEPTABLE TERMS
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-black dark:hover:text-white transition-colors block"
              >
                EDITORIAL AUDITS
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4 Contact & Social */}
        <div className="space-y-4 font-sans">
          <div>
            <h3 className="text-neutral-900 dark:text-white text-xs font-bold tracking-widest uppercase mb-4 pb-2 border-b border-black/10 dark:border-white/10 font-sans">
              Correspondence
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif leading-relaxed">
              wisdom@digitallifelessons.org
              <br />
              Stoa Square, Editorial Hub v4
            </p>
          </div>

          {/* Social Links matching layout styles */}
          <div className="flex gap-4 text-[10px] uppercase font-bold tracking-widest">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              FACEBOOK
            </Link>
            <Link
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              X.COM
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              LINKEDIN
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-black/15 dark:border-white/15 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-bold text-neutral-500">
        <p>© 2026 LIFELORE SYSTEM INC. PRESERVING EXPERIENCE DAILY.</p>
        <p className="font-sans mt-4 md:mt-0">
          CRAFTED IN PURSUIT OF TRUTH AND PRINT EXCELLENCE
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
