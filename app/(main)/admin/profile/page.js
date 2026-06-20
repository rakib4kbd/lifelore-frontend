import fetchUserSession from "@/lib/fetchUserSession";
import { Settings } from "lucide-react";
import React from "react";

const AdminProfilePage = async () => {
  const user = await fetchUserSession();
  const loading = false;
  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-bold text-slate-850 dark:text-white flex items-center gap-1.5">
          <Settings className="w-5 h-5 text-indigo-500" />
          Admin Moderator Specifications
        </h2>
        <p className="text-xs text-slate-500">
          Edit display name, photoroll URLs, and check active moderation
          counters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
        {/* FORM */}
        <form
          //   onSubmit={handleUpdate}
          className="md:col-span-7 space-y-4 text-xs"
        >
          <div className="space-y-1">
            <label className="font-semibold text-slate-550">
              Account Email Address (Static)
            </label>
            <input
              type="email"
              disabled
              className="w-full border p-2.5 bg-slate-100 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-550">
              Moderator Display Name
            </label>
            <input
              type="text"
              required
              //   onChange={(e) => setName(e.target.value)}
              className="w-full border p-2.5 rounded-lg text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-550">
              Profile Photo URL
            </label>
            <input
              type="url"
              required
              //   onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border p-2.5 rounded-lg text-sm font-mono text-[11px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-bold"
          >
            {loading ? "Saving configs..." : "Save Admin specifications"}
          </button>
        </form>

        {/* DETAILS PANEL PREVIEW */}
        <div className="md:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center space-y-4">
          <img
            src={
              user?.photoURL ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
            }
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover border-4 border-amber-500/20"
          />
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {user?.name}
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              {user?.email}
            </span>
          </div>

          <span className="px-3 py-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/25 rounded-md">
            🛡️ LEVEL 1 SYSTEM CONCIERGE
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
