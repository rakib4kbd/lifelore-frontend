import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DashboardAside from "@/components/Dashboard/DashboardAside";

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
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="">
        <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#1A1A1A] dark:bg-editorial-dark-bg dark:text-editorial-dark-text transition-colors duration-300 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
          <div className="flex mx-auto w-7xl max-w-7xl my-5 justify-between">
            <DashboardAside user={user} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
