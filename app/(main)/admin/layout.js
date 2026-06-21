import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardAside from "@/components/Dashboard/DashboardAside";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { roleAccess } from "@/lib/roleAccess";
import AdminDashboardAside from "@/components/Dashboard/AdminDashboardAside";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LifeLore",
  description:
    "LifeLore is a platform for sharing and discovering life experiences.",
};

export default async function RootLayout({ children }) {
  const { user } = await auth.api.getSession({ headers: await headers() });
  if (!user) {
    redirect("/auth/login");
  }

  await roleAccess("admin");

  return (
    <div className="min-h-screen flex flex-col bg-editorial-bg text-editorial-text dark:bg-editorial-dark-bg dark:text-editorial-dark-text transition-colors duration-300 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="flex flex-col md:flex-row mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-8 gap-6">
        <AdminDashboardAside user={user} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
