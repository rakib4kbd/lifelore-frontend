import fetchUserSession from "@/lib/fetchUserSession";
import { Settings, Shield } from "lucide-react";
import Image from "next/image";

const AdminProfilePage = async () => {
  const user = await fetchUserSession();

  return (
    <div className="space-y-6 p-4 sm:p-6 text-left">
      <div className="border-b-2 border-black dark:border-white pb-4">
        <h2 className="text-xl font-serif font-black text-black dark:text-white flex items-center gap-1.5 uppercase tracking-widest">
          <Settings className="w-5 h-5" />
          Admin Moderator Specifications
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-sans">
          Edit display name, photoroll URLs, and check active moderation counters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <form className="md:col-span-7 space-y-4 border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg p-6">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Account Email Address (Static)
            </label>
            <input
              type="email"
              disabled
              defaultValue={user?.email}
              className="w-full border-2 border-black/30 dark:border-white/30 bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm text-neutral-400 outline-none rounded-none opacity-60"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Moderator Display Name
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              className="w-full border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm text-black dark:text-white outline-none rounded-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Profile Photo URL
            </label>
            <input
              type="url"
              defaultValue={user?.image}
              className="w-full border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card px-4 py-3 text-sm font-mono text-[11px] text-black dark:text-white outline-none rounded-none placeholder:text-neutral-400"
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white px-5 py-3 text-[11px] font-black uppercase tracking-widest rounded-none transition-colors"
          >
            Save Admin Specifications
          </button>
        </form>

        <div className="md:col-span-5 border-2 border-black dark:border-white bg-editorial-card dark:bg-editorial-dark-card p-6 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-20 h-20 rounded-full border-2 border-black dark:border-white overflow-hidden">
            <Image
              src={user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt="Admin"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-serif font-black text-black dark:text-white">{user?.name}</h3>
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">{user?.email}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white text-[9px] font-black uppercase tracking-widest">
            <Shield className="w-3 h-3" /> Level 1 System Concierge
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
