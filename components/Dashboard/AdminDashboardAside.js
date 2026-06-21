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

const AdminDashboardAside = ({ user }) => {
  const adminDashboardNavigation = [
    {
      label: "System Overview",
      href: "/admin/overview",
      icon: BarChart,
      key: "overview",
    },
    {
      label: "Manage Users Table",
      href: "/admin/manage-users",
      icon: Users,
      key: "users",
    },
    {
      label: "Manage Lessons",
      href: "/admin/manage-lessons",
      icon: BookOpen,
      key: "lessons",
    },
    {
      label: "Reported Lessons",
      href: "/admin/reported-lessons",
      icon: ShieldAlert,
      key: "reports",
    },
    {
      label: "My Profile",
      href: "/admin/profile",
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
            {user?.role === "admin" && (
              <span className="px-2 py-0.5 bg-rose-600 text-white border border-black text-[8px] font-black uppercase tracking-widest block w-max mt-0.5">
                ADMIN CONTROL
              </span>
            )}
          </div>
        </div>

        {/* Navigation Admin Controls */}
        {adminDashboardNavigation.map((item) => {
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
    </aside>
  );
};

export default AdminDashboardAside;
