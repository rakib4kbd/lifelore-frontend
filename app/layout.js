import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark no-scrollbar`}
    >
      <body className="">
        <div className="min-h-screen flex flex-col bg-editorial-bg text-editorial-text dark:bg-editorial-dark-bg dark:text-editorial-dark-text transition-colors duration-300 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
          {children}
        </div>
      </body>
    </html>
  );
}
