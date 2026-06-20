"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Moon, ChevronDown } from "lucide-react";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import showToast from "@/lib/showAlertToast";
import { Award } from "lucide-react";
import { Shield } from "lucide-react";

export default function Navbar() {
  const { data, isPending } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const { data, error } = await signOut();
    router.push("/auth/login");
    if (error) {
      showAlertToast("Error occurred while logging out:", error);
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    {
      label: "Home",
      navigation: "/",
      isPrivate: false,
    },
    {
      label: "Add Lesson",
      navigation: "/dashboard/add-lesson",
      isPrivate: true,
    },
    {
      label: "My Lessons",
      navigation: "/dashboard/my-lessons",
      isPrivate: true,
    },
    {
      label: "Public Lessons",
      navigation: "/lessons",
      isPrivate: false,
    },
  ];

  const filteredLinks = navLinks.filter((link) => {
    if (link.isPrivate && !user) return false;

    if (link.freeOnly && user.isPremium) {
      return false;
    }

    return true;
  });

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-editorial-dark-bg border-b border-black dark:border-white/50 transition-colors">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="text-xl md:text-2xl font-semibold tracking-tighter uppercase italic px-4 py-1 border-2 border-black dark:border-white text-black dark:text-white bg-white dark:bg-transparent">
              LIFELORE
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 block tracking-widest uppercase">
                WISDOM JOURNAL
              </span>
            </div>
          </div>
        </Link>

        {/* Center Navigation */}
        <div className="hidden items-center gap-4 lg:flex">
          {filteredLinks.map((link) => (
            <Link
              key={link.label}
              href={link.navigation}
              className={`flex items-center gap-1 py-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                pathname === link.navigation
                  ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Show Upgrade only for non-premium non-admin users */}
          {user && !user.isPremium && user.role !== "admin" && (
            <Link
              href="/pricing"
              className="flex items-center gap-1 py-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer text-warning"
            >
              <Award className="w-3.5 h-3.5" />
              Upgrade
            </Link>
          )}

          {/* Show Premium Edition for premium users and admins */}
          {user && (user.isPremium || user.role === "admin") && (
            <div className="flex items-center gap-1 px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[9px] font-black uppercase tracking-wider border border-black dark:border-white">
              <Award className="w-3 h-3" />
              Premium Edition
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center border border-zinc-700 text-zinc-300 hover:text-white">
            <Moon size={18} />
          </button>

          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-editorial-text/85 dark:text-editorial-dark-text/85 hover:text-black dark:hover:text-white cursor-pointer"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="px-6 py-2 border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[11px] uppercase tracking-widest font-black transition-colors cursor-pointer"
              >
                Join Lifelore
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full border border-black dark:border-white p-0.5 overflow-hidden relative">
                  <Image
                    src={
                      user.image ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                    }
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                    fill
                  />
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white truncate max-w-[120px]">
                    {user.name}
                  </div>
                  <div className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono uppercase">
                    {user.role}
                  </div>
                </div>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-none bg-[#F9F7F2] dark:bg-[#181816] border-2 border-black dark:border-white shadow-none overflow-hidden z-20">
                    <div className="p-4 border-b border-black dark:border-white/50 bg-[#F5F2EA] dark:bg-[#20201d]">
                      <p className="text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 dark:text-[#faf9f6]/60">
                        Logged in as
                      </p>
                      <p className="text-sm font-serif italic text-black dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => {
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        My Profile
                      </Link>

                      <Link
                        href="/dashboard/overview"
                        onClick={() => {
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard Overview
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          href="/admin/overview"
                          onClick={() => {
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          Admin Dashboard
                        </Link>
                      )}

                      <hr className="border-black dark:border-white/50 my-1" />

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
