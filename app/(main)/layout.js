import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import FooterSection from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "LifeLore",
  description: "LifeLore is a platform for sharing and discovering life experiences.",
};

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-editorial-bg text-editorial-text dark:bg-editorial-dark-bg dark:text-editorial-dark-text transition-colors duration-300 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <FooterSection />
      <Toaster
        position="top-right"
        containerStyle={{ top: 100, left: 20, bottom: 20, right: 20 }}
        toastOptions={{
          style: {
            border: "2px solid #ffffff",
            borderRadius: "0px",
            padding: "16px",
            color: "#faf9f6",
            backgroundColor: "#0d0d0d",
          },
        }}
      />
    </div>
  );
}
