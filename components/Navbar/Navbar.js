"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, ChevronDown } from "lucide-react";

export default function Navbar({ user }) {
  const pathname = usePathname();

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
      navigation: "/public-lessons",
      isPrivate: false,
    },
    {
      label: "Pricing",
      navigation: "/pricing",
      isPrivate: true,
      freeOnly: true,
    },
  ];

  const filteredLinks = navLinks.filter((link) => {
    if (link.isPrivate && !user) return false;

    if (link.freeOnly && user?.plan !== "FREE") {
      return false;
    }

    return true;
  });

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-editorial-dark-bg border-b border-black dark:border-white/50 transition-colors">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="text-xl md:text-2xl font-black tracking-tighter uppercase italic px-4 py-1 border-2 border-black dark:border-white text-black dark:text-white bg-white dark:bg-transparent">
            LIFELORE
          </div>
          <div className="hidden md:block">
            <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 block tracking-widest uppercase">
              WISDOM JOURNAL
            </span>
          </div>
        </Link>

        {/* Center Navigation */}
        <div className="hidden items-center gap-10 lg:flex">
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
                className="px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]/85 dark:text-[#faf9f6]/85 hover:text-black dark:hover:text-white cursor-pointer"
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
            <div className="relative group">
              <button className="flex items-center gap-2">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-white">
                    {user.name.charAt(0)}
                  </div>
                )}

                <ChevronDown size={16} className="text-white" />
              </button>

              <div className="invisible absolute right-0 top-12 w-60 rounded-md border border-zinc-800 bg-zinc-950 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                <div className="border-b border-zinc-800 p-4">
                  <p className="font-semibold text-white">{user.name}</p>
                </div>

                <div className="py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
                  >
                    Profile
                  </Link>

                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900"
                  >
                    Dashboard
                  </Link>

                  <button className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-900">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
