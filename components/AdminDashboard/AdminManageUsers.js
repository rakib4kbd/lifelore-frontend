"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import showSuccessToast from "@/lib/showSuccessToast";
import showAlertToast from "@/lib/showAlertToast";
import { authClient } from "@/lib/auth-client";

const AdminManageUsers = ({ user, target, index }) => {
  const [current, setCurrent] = useState(target);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  const patchUser = async (fields, successMsg) => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/${current._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fields),
        },
      );
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setCurrent((prev) => ({ ...prev, ...fields, ...data }));
      showSuccessToast(successMsg);
    } catch {
      showAlertToast("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = async () => {
    if (current._id === user?.id) return;
    const nextRole = current.role === "admin" ? "user" : "admin";
    await patchUser(
      { role: nextRole },
      nextRole === "admin" ? "Promoted to Admin" : "Demoted to User",
    );
  };

  const handlePlanToggle = async () => {
    if (current._id === user?.id) return;
    const nextPlan = !current.isPremium;
    await patchUser(
      { isPremium: nextPlan },
      nextPlan ? "Upgraded to Premium" : "Downgraded to Free",
    );
  };

  const handleDelete = async () => {
    if (current._id === user?.id) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmed) return;
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/${current._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok) throw new Error("Delete failed");
      setDeleted(true);
      showSuccessToast("User deleted");
    } catch {
      showAlertToast("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr
      className={`border-b border-black/10 dark:border-white/10 ${index % 2 === 0 ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg" : "bg-white dark:bg-editorial-dark-card"}`}
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={
              current.image ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
            }
            alt={current.name}
            className="h-8 w-8 rounded-full object-cover border border-black dark:border-white"
          />
          <div>
            <div className="font-bold text-sm text-black dark:text-white">
              {current.name}
            </div>
            <p className="text-[10px] font-mono text-neutral-400">
              ID: {current._id?.slice(-8)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-4">
        <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
          {current.email}
        </span>
      </td>
      <td className="px-5 py-4">
        <button
          onClick={handleRoleToggle}
          disabled={loading || current._id === user?.id}
          className={`border-2 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
            current.role === "admin"
              ? "border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              : "border-black dark:border-white text-neutral-600 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          }`}
        >
          {current.role === "admin" ? "Admin" : "User"}
        </button>
      </td>
      <td className="px-5 py-4">
        <button
          onClick={handlePlanToggle}
          disabled={loading || current._id === user?.id}
          className={`border-2 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
            current.isPremium
              ? "border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white hover:border-amber-500"
              : "border-black dark:border-white text-neutral-600 dark:text-neutral-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          }`}
        >
          {current.isPremium ? "Premium" : "Free"}
        </button>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="text-xs font-mono font-black text-black dark:text-white">
          {current.totalLessons || 0}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            disabled={loading || current._id === user?.id}
            className="border-2 border-black dark:border-white px-3 py-1.5 text-neutral-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminManageUsers;
