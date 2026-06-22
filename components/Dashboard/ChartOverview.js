"use client";

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { BookOpen, Heart } from "lucide-react";

export default function LessonAnalytics({ lessons = [], favouriteLessons = [] }) {
  const totalLessons = lessons.length;
  const totalFavouriteLessons = favouriteLessons.length;

  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const dailyLessons = lessons.filter((l) => {
      if (!l.createdAt) return false;
      const c = new Date(l.createdAt);
      return c >= date && c < nextDate;
    }).length;
    chartData.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      dailyLessons, totalLessons, favouriteLessons: totalFavouriteLessons,
    });
  }

  return (
    <div className="space-y-6">
      <div className="border-2 border-black dark:border-white bg-editorial-bg dark:bg-editorial-dark-bg p-6">
        <div className="mb-6 border-b border-black/10 dark:border-white/10 pb-4">
          <h2 className="text-lg font-serif font-black text-black dark:text-white uppercase tracking-tight">
            Lesson Activity
          </h2>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
            Weekly creation trend with total and favourite lesson benchmarks
          </p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="currentColor" strokeOpacity={0.1} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.5 }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.5 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--color-editorial-card)", border: "2px solid #1a1a1a", borderRadius: 0, color: "#1a1a1a", fontSize: 11 }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }} />
              <Line type="monotone" dataKey="dailyLessons" name="Daily Created" stroke="#1a1a1a" strokeWidth={2.5} dot={{ r: 3, fill: "#1a1a1a" }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="totalLessons" name="Total Lessons" stroke="#2563eb" strokeWidth={2} strokeDasharray="6 4" dot={false} />
              <Line type="monotone" dataKey="favouriteLessons" name="Favourites" stroke="#d97706" strokeWidth={2} strokeDasharray="6 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
