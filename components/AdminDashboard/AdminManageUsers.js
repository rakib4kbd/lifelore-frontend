"use client";

import { useState } from "react";
import { UserLock, Trash2 } from "lucide-react";
import showSuccessToast from "@/lib/showSuccessToast";
import showAlertToast from "@/lib/showAlertToast";

const AdminManageUsers = ({ user, target, index }) => {
  const [current, setCurrent] = useState(target);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  if (deleted) return null;

  const handleRoleToggle = async () => {
    if (current._id === user?.id) return;

    const nextRole = current.role === "admin" ? "user" : "admin";

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/${current._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: nextRole,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed to toggle role");

      const data = await res.json();

      setCurrent((prev) => ({
        ...prev,
        role: data.role ?? nextRole,
      }));

      showSuccessToast(
        `${nextRole === "admin" ? "Promoted to Admin" : "Demoted to User"} `,
      );
    } catch (err) {
      showAlertToast("Role update failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (current._id === user?.id) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/${current._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Delete failed");

      setDeleted(true);
      showSuccessToast("User deleted");
    } catch (err) {
      showAlertToast("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr
      key={current._id}
      className={`border-b border-black/10 dark:border-white/10 ${
        index % 2 === 0
          ? "bg-[#FAF9F6] dark:bg-editorial-dark-bg"
          : "bg-white dark:bg-editorial-dark-card"
      }`}
    >
      {/* User */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src={
              current.photoURL ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
            }
            alt={current.name}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-zinc-800"
          />

          <div>
            <div className="font-bold text-black dark:text-white">
              {current.name}
            </div>
            <p className="text-[11px] text-zinc-500">ID: {current._id}</p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-5 py-4">
        <span className="text-xs text-zinc-400">{current.email}</span>
      </td>

      {/* Role */}
      <td className="px-5 py-4">
        <button
          onClick={handleRoleToggle}
          disabled={loading || current._id === user?.id}
          className={`rounded-none border px-2.5 py-1 text-[10px] font-medium transition ${
            current.role === "admin"
              ? "border-blue-500 text-blue-500"
              : "border-zinc-700 text-zinc-400"
          }`}
        >
          {current.role === "admin" ? "Admin" : "User"}
        </button>
      </td>

      {/* Premium */}
      <td className="px-5 py-4">
        <button
          className={`rounded-none border px-2.5 py-1 text-[10px] font-medium ${
            current.isPremium
              ? "border-amber-500 text-amber-500"
              : "border-zinc-700 text-zinc-400"
          }`}
        >
          {current.isPremium ? "Premium" : "Free"}
        </button>
      </td>

      {/* Lesson Count */}
      <td className="px-5 py-4 text-center">
        <span className="text-xs text-zinc-400">
          {current.totalLessons || 0}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={handleDelete}
            disabled={loading || current._id === user?.id}
            className="rounded-none border border-zinc-800 px-3 py-1.5 text-zinc-400 transition hover:bg-zinc-900 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminManageUsers;
