import UpgradeButton from "@/components/PricingPage/UpgradeButton/UpgradeButton";
import { auth } from "@/lib/auth";
import { Award } from "lucide-react";
import { CreditCard } from "lucide-react";
import { Layers } from "lucide-react";
import { headers } from "next/headers";
import React from "react";

const PricingPage = async () => {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  const comparisonRows = [
    {
      name: "Max Lessons Creation",
      free: "3 Lessons Only",
      premium: "Unlimited Insights",
    },
    {
      name: "Premium Tags & Access Level",
      free: "Disabled (Free only)",
      premium: "Full Premium Flagging",
    },
    {
      name: "Browse Content Restrictions",
      free: "Blur-masked on Premium files",
      premium: "100% Unrestricted Library",
    },
    {
      name: "Community Profile Badge",
      free: "None (Basic Tier)",
      premium: "Verified Sage ⭐ Badge",
    },
    {
      name: "Ad-free Navigation Engine",
      free: "Standard Sponsorship Ads",
      premium: "Pure Mindful Reflection (Ad-free)",
    },
    {
      name: "Public Priority Feed Boost",
      free: "Normal delivery",
      premium: "Priority Spotlight (Top list)",
    },
    {
      name: "Insight PDF Export Tool",
      free: "Standard View in browser",
      premium: "Professional vector PDF downloads",
    },
    {
      name: "Weekly Analytics Charts",
      free: "Basic totals count",
      premium: "Active Heatmaps & contribution trackers",
    },
  ];
  return (
    <div className="space-y-12 my-20 max-w-4xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white">
          STOA SCHOLAR VENTURE ACCESS
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-black dark:text-white tracking-tight">
          MEMBERSHIP SUBSCRIPTION
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 font-serif italic text-base leading-relaxed">
          &quot;Wisdom should be shared, but some insights take lifetimes to
          refine. Gain unlimited access to premium reflections and verified
          tools for a low one-time support&quot;
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Tier description block 1 */}
        <div className="md:col-span-5 p-6 bg-[#F9F7F2] dark:bg-editorial-dark-card/30 border-2 border-black dark:border-white rounded-none flex flex-col justify-between text-left h-full shadow-none pb-8">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                Default Tier
              </p>
              <h3 className="text-2xl font-serif font-black text-black dark:text-white">
                Basic Account
              </h3>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif italic leading-relaxed">
              &quot;Create initial sheets, browse public findings, and store up
              to three private entries.&quot;
            </p>

            <ul className="space-y-3 text-xs uppercase font-extrabold tracking-wider text-neutral-600 dark:text-neutral-400 pt-2">
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-mono font-black">
                  [✓]
                </span>{" "}
                MAX 3 LESSONS ONLY
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-mono font-black">
                  [✓]
                </span>{" "}
                BASIC PUBLIC LIBRARY
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-mono font-black">
                  [✓]
                </span>{" "}
                STANDARD PROFILE SEARCH
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-black/10 dark:border-white/10 mt-6 text-center text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            STANDARD ACCOUNT ACTIVE
          </div>
        </div>

        {/* Tier payment block 2 */}
        <div className="md:col-span-7 p-8 bg-white dark:bg-[#121212] border-2 border-black dark:border-white/90 rounded-none flex flex-col justify-between text-left h-full shadow-none relative overflow-hidden">
          {/* Accent decoration ribbon */}
          <div className="absolute top-5 right-5 z-0 flex items-center gap-1 px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[9px] font-black uppercase tracking-widest border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
            <Award className="w-3" />
            LIFETIME CREDENTIAL
          </div>

          <div className="space-y-4 z-10 relative">
            <div>
              <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                HIGHEST CONTRIBUTION PLAN
              </p>
              <h3 className="text-3xl font-serif font-black text-black dark:text-white">
                Premium Scribe ⭐
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-serif italic leading-relaxed max-w-sm">
              Unlock a perpetual notebook. File unlimited insights, publish
              masked priority folders, and display the Verification Badge.
            </p>

            <div className="flex items-baseline gap-2 pt-2 border-b-2 border-dashed border-black/30 dark:border-white/30 pb-4">
              <span className="text-3xl sm:text-5xl font-black text-black dark:text-white font-serif">
                ৳1500
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                One-Time Activation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs uppercase font-extrabold tracking-widest text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-mono font-bold">
                  [✓]
                </span>
                <span>UNLIMITED SHEETS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-mono font-bold">
                  [✓]
                </span>
                <span>PREMIUM VISIBILITY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-mono font-bold">
                  [✓]
                </span>
                <span>VERIFIED SAGE LOGO</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black dark:text-white font-mono font-bold">
                  [✓]
                </span>
                <span>UNLIMITED PDF EXPORTS</span>
              </div>
            </div>
          </div>

          <UpgradeButton user={user} />
        </div>
      </div>

      {/* COMPARISON GRID MATRIX OF 6-8 ROWS */}
      <div className="space-y-4 pt-4 text-left">
        <h3 className="text-2xl font-black text-black dark:text-white font-serif flex items-center gap-1.5 border-b-2 border-black dark:border-white pb-3">
          <Layers className="w-5 h-5 text-[#121212] dark:text-white" />
          MEMBER PRIVILEGE MATRIX
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
          Stoic comparison matrices of subscription folders.
        </p>

        <div className="overflow-x-auto rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#121212]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-black text-white dark:bg-white dark:text-black text-[10px] font-black uppercase tracking-widest border-b-2 border-black">
                <th className="p-4 font-black">PRIVILEGES SHEETS</th>
                <th className="p-4 font-black text-center w-40 border-l border-white/20 dark:border-black/20">
                  BASIC
                </th>
                <th className="p-4 font-black text-center w-40 border-l border-white/20 dark:border-black/20">
                  PREMIUM SCRIBE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10 uppercase tracking-wider text-[10px] font-bold text-neutral-700 dark:text-neutral-300">
              {comparisonRows.map((row) => (
                <tr
                  key={row.name}
                  className="hover:bg-neutral-100/50 dark:hover:bg-neutral-800/20 transition-colors"
                >
                  <td className="p-4 font-black font-serif uppercase tracking-normal text-xs text-neutral-900 dark:text-white">
                    {row.name}
                  </td>
                  <td className="p-4 text-center text-neutral-500 font-mono border-l border-black/10 dark:border-white/10">
                    {row.free}
                  </td>
                  <td className="p-4 text-center text-black dark:text-white font-black font-mono border-l border-black/10 dark:border-white/10">
                    {row.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
