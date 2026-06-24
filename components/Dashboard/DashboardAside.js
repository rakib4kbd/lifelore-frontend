"use client";
import {
  BarChart,
  CirclePlus,
  FileText,
  Heart,
  Settings,
  Award,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardAside = ({ user }) => {
  const dashboardNavigation = [
    { label: "Overview", href: "/dashboard/overview", icon: BarChart },
    {
      label: "Log New Lesson",
      href: "/dashboard/add-lesson",
      icon: CirclePlus,
    },
    {
      label: "My Wisdom Ledger",
      href: "/dashboard/my-lessons",
      icon: FileText,
    },
    { label: "My Saved Wisdom", href: "/dashboard/my-favorites", icon: Heart },
    { label: "Manage Profile", href: "/dashboard/profile", icon: Settings },
  ];

  const pathname = usePathname();

  return (
    <aside className="w-full md:w-56 shrink-0 text-left md:sticky md:top-24 md:self-start">
      {/* User card */}
      <div className="p-4 bg-black text-white dark:bg-white dark:text-black border-2 border-black flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-black text-black flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="overflow-hidden">
          <h3 className="font-serif font-black text-xs uppercase tracking-tight truncate">
            {user?.name}
          </h3>
          {user?.isPremium || user?.role === "admin" ? (
            <span className="inline-flex px-2 py-0.5 bg-amber-500 text-black text-[8px] font-black uppercase tracking-widest mt-0.5 border border-black">
              PREMIUM SCRIBE
            </span>
          ) : (
            <span className="inline-flex px-2 py-0.5 bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black text-[8px] font-black uppercase tracking-widest mt-0.5">
              BASIC MEMBER
            </span>
          )}
        </div>
      </div>

      {/* Nav — horizontal scroll on mobile, vertical on md+ */}
      <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {dashboardNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap shrink-0 transition-all border-2 ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                  : "text-neutral-700 dark:text-neutral-300 border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline md:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade box — desktop only */}
      {user && !user.isPremium && user.role !== "admin" && (
        <div className="p-4 bg-editorial-card dark:bg-editorial-dark-card border-2 border-black mt-4 text-xs hidden md:block space-y-2">
          <h4 className="font-serif font-black text-black dark:text-white flex items-center gap-1 uppercase tracking-tight text-sm">
            <Award className="w-4 h-4" /> Upgrade to Premium
          </h4>
          <p className="text-[10px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif italic">
            Unlock unlimited folder slots, premium manuscript badges, and
            priority view list boosts for lifetime.
          </p>
          <Link
            href="/pricing"
            className="block w-full py-2 text-center border-2 border-black bg-black hover:bg-editorial-bg text-white hover:text-black text-[9px] uppercase font-black tracking-widest transition-colors"
          >
            Examine Pricing Plans
          </Link>
        </div>
      )}
    </aside>
  );
};

export default DashboardAside;
