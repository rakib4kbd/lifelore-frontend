"use client";

import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminOverviewCharts = ({ growthData }) => {
  return (
    <div className="w-full h-[400px] rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={growthData}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" tick={{ fontSize: 12 }} />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="users"
            name="Users"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="lessons"
            name="Lessons"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminOverviewCharts;
