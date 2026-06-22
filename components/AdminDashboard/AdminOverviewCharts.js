"use client";

import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const AdminOverviewCharts = ({ growthData }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={growthData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <CartesianGrid stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, opacity: 0.6 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, opacity: 0.6 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--color-editorial-card)", border: "2px solid #1a1a1a", borderRadius: 0, fontSize: 11 }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }} />
          <Line type="monotone" dataKey="users" name="Users" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="lessons" name="Lessons" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminOverviewCharts;
