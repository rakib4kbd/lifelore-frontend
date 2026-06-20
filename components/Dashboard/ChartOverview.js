"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { BookOpen, Heart, CalendarDays } from "lucide-react";

export default function LessonAnalytics({
  lessons = [],
  favouriteLessons = [],
}) {
  const totalLessons = lessons.length;
  const totalFavouriteLessons = favouriteLessons.length;

  // Last 7 days
  const chartData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dailyLessons = lessons.filter((lesson) => {
      if (!lesson.createdAt) return false;

      const createdAt = new Date(lesson.createdAt);

      return createdAt >= date && createdAt < nextDate;
    }).length;

    chartData.push({
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      dailyLessons,
      totalLessons,
      favouriteLessons: totalFavouriteLessons,
    });
  }

  const recentLessons = chartData.reduce(
    (sum, item) => sum + item.dailyLessons,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-zinc-100">
            Lesson Activity
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Weekly creation trend with total and favourite lesson benchmarks
          </p>
        </div>

        <div className="h-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                stroke="#27272a"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#a1a1aa",
                  fontSize: 12,
                }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#a1a1aa",
                  fontSize: 12,
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  border: "1px solid #27272a",
                  borderRadius: "12px",
                  color: "#fafafa",
                }}
                labelStyle={{
                  color: "#fafafa",
                }}
              />

              <Legend
                wrapperStyle={{
                  color: "#fafafa",
                  fontSize: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="dailyLessons"
                name="Daily Created"
                stroke="#fafafa"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#fafafa",
                }}
                activeDot={{
                  r: 6,
                }}
              />

              <Line
                type="monotone"
                dataKey="totalLessons"
                name="Total Lessons"
                stroke="#60a5fa"
                strokeWidth={2}
                strokeDasharray="6 6"
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="favouriteLessons"
                name="Favourite Lessons"
                stroke="#facc15"
                strokeWidth={2}
                strokeDasharray="6 6"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
