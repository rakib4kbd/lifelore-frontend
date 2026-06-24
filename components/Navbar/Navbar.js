"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Award, Shield, Sun, Moon } from "lucide-react";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import { LogOut, LayoutDashboard, UserIcon } from "lucide-react";
import { useState } from "react";
import showToast from "@/lib/showAlertToast";
import { useTheme } from "@/components/Providers/ThemeProvider";

export default function Navbar() {
  const { data, isPending } = useSession();
  const user = data?.user;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    const { data, error } = await signOut();
    router.push("/auth/login");
    if (error) {
      showToast("Error occurred while logging out:", error);
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", navigation: "/", isPrivate: false },
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
    { label: "Public Lessons", navigation: "/lessons", isPrivate: false },
  ];

  const filteredLinks = navLinks.filter((link) => {
    if (link.isPrivate && !user) return false;
    return true;
  });

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-editorial-dark-bg border-b border-black dark:border-white/50 transition-colors">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="text-lg md:text-2xl font-black tracking-tighter uppercase italic px-3 md:px-4 py-1 border-2 border-black dark:border-white text-black dark:text-white bg-white dark:bg-transparent whitespace-nowrap">
            LIFELORE
          </div>
          <div className="hidden md:block">
            <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 block tracking-widest uppercase">
              WISDOM JOURNAL
            </span>
          </div>
        </Link>

        {/* Desktop Center Navigation */}
        <div className="hidden md:flex items-center gap-4">
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

          {/* Upgrade for non-premium users */}
          {user && !user.isPremium && user.role !== "admin" && (
            <Link
              href="/pricing"
              className={`flex items-center gap-1 py-1 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                pathname === "/pricing"
                  ? "border-b-2 border-amber-600 text-amber-600 dark:text-amber-400"
                  : "text-amber-600 dark:text-amber-400 hover:underline"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Upgrade
            </Link>
          )}

          {/* Premium badge */}
          {user && (user.isPremium || user.role === "admin") && (
            <div className="flex items-center gap-1 px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[9px] font-black uppercase tracking-wider border border-black dark:border-white">
              <Award className="w-3 h-3" />
              Premium Edition
            </div>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
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
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white truncate max-w-30">
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
                  <div className="absolute right-0 mt-2 w-56 rounded-none bg-[#F9F7F2] dark:bg-editorial-dark-card border-2 border-black dark:border-white shadow-none overflow-hidden z-20">
                    <div className="p-4 border-b border-black dark:border-white/50 bg-[#F5F2EA] dark:bg-[#20201d]">
                      <p className="text-[9px] uppercase tracking-widest text-editorial-text/60 dark:text-editorial-dark-text/60">
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
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        My Profile
                      </Link>

                      <Link
                        href="/dashboard/overview"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-neutral-700 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard Overview
                      </Link>

                      {user.role === "admin" && (
                        <Link
                          href="/admin/overview"
                          onClick={() => setDropdownOpen(false)}
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

        {/* Mobile triggers */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-editorial-dark-bg p-4 flex flex-col gap-1 shadow-lg">
          {filteredLinks.map((link) => (
            <Link
              key={link.label}
              href={link.navigation}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 p-2.5 text-[11px] font-bold uppercase tracking-widest text-left transition-all ${
                pathname === link.navigation
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user && !user.isPremium && user.role !== "admin" && (
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-left"
            >
              <Award className="w-4 h-4" />
              Upgrade to Premium
            </Link>
          )}

          <hr className="my-2 border-black/10 dark:border-white/10" />

          {user ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 p-2">
                <div className="w-10 h-10 rounded-full border border-black dark:border-white overflow-hidden relative shrink-0">
                  <Image
                    src={
                      user.image ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                    }
                    alt={user.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-black dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 text-[11px] font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-left"
              >
                <UserIcon className="w-4 h-4" />
                My Profile
              </Link>

              <Link
                href="/dashboard/overview"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 text-[11px] font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-left"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link
                  href="/admin/overview"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 text-[11px] font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-left"
                >
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 p-2.5 text-[11px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-left"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-center text-[11px] font-black uppercase tracking-widest border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-center text-[11px] font-black uppercase tracking-widest border-2 border-black bg-black text-white dark:bg-white dark:text-black hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors"
              >
                Join Lifelore
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
