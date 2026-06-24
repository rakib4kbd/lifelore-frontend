"use client";

import { useState } from "react";
import AdminManageUsers from "./AdminManageUsers";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 10;

const AdminUsersTable = ({ usersList, user }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(usersList.length / PAGE_SIZE);
  const paged = usersList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="overflow-hidden border-2 border-black dark:border-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black dark:border-white bg-black text-[10px] font-black uppercase tracking-widest text-white dark:bg-white dark:text-black">
                <th className="px-5 py-4 text-left">User</th>
                <th className="px-5 py-4 text-left">Email</th>
                <th className="px-5 py-4 text-left">Role</th>
                <th className="px-5 py-4 text-left">Plan</th>
                <th className="px-5 py-4 text-center">Lessons</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((target, index) => (
                <AdminManageUsers key={target._id} user={user} target={target} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} totalItems={usersList.length} pageSize={PAGE_SIZE} />
    </>
  );
};

export default AdminUsersTable;
