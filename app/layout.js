import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import FooterSection from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

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

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#1A1A1A] dark:bg-editorial-dark-bg dark:text-editorial-dark-text transition-colors duration-300 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {children}
    </div>
  );
}
