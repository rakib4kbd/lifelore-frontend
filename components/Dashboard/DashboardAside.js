"use client";
import { authClient } from "@/lib/auth-client";
import { Users } from "lucide-react";
import { BarChart } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Settings } from "lucide-react";
import { FileText } from "lucide-react";
import { Award } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Heart } from "lucide-react";
import { ShieldAlert } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardAside = ({ user }) => {
  const dashboardNavigation = [
    {
      label: "Overview",
      href: "/dashboard/overview",
      icon: BarChart,
      key: "overview",
    },
    {
      label: "Log New Lesson",
      href: "/dashboard/add-lesson",
      icon: CirclePlus,
      key: "users",
    },
    {
      label: "My Wisdom Ledger",
      href: "/dashboard/my-lessons",
      icon: FileText,
      key: "moderation",
    },
    {
      label: "My Saved Wisdom",
      href: "/dashboard/my-favorites",
      icon: Heart,
      key: "reports",
    },
    {
      label: "Manage Profile",
      href: "/dashboard/profile",
      icon: Settings,
      key: "profile",
    },
  ];

  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-4 pb-8 pt-2 text-left">
        <div className="p-4 bg-black text-white dark:bg-white dark:text-black rounded-none border-2 border-black flex items-center gap-3 shadow-none">
          <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-black text-black flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-serif font-black text-xs uppercase tracking-tight truncate">
              {user.name}
            </h3>
            {user?.isPremium || user?.role === "admin" ? (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-widest mt-1 border border-black">
                PREMIUM SCRIBE
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black text-[8px] font-black uppercase tracking-widest mt-1">
                BASIC MEMBER
              </span>
            )}
          </div>
        </div>

        {/* Navigation Admin Controls */}
        {dashboardNavigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-left shrink-0 transition-all rounded-none border-2 ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black border-black"
                  : "text-neutral-700 dark:text-neutral-300 border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        {/* Quick Help box */}
        {user && !user.isPremium && user.role !== "admin" && (
          <div className="p-4 rounded-none bg-[#F9F7F2] dark:bg-editorial-dark-card/30 border-2 border-black text-xs hidden md:block space-y-2">
            <h4 className="font-serif font-black text-[#121212] dark:text-white flex items-center gap-1 uppercase tracking-tight text-sm">
              <Award className="w-4 h-4" />
              Upgrade to Premium
            </h4>
            <p className="text-[10px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif italic">
              Unlock unlimited folder slots, premium manuscript badges, and
              priority view list boosts for lifetime.
            </p>
            <Link
              href="/pricing"
              className="btn w-full py-2 border border-black bg-black hover:bg-[#FAF9F6] text-white hover:text-black text-[9px] uppercase font-black tracking-widest transition-colors cursor-pointer"
            >
              Examine Pricing Plans
            </Link>
          </div>
        )}
    </aside>
  );
};

export default DashboardAside;
