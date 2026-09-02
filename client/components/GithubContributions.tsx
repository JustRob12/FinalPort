"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Github,
  ExternalLink,
  Flame,
  Trophy,
  Calendar,
  GitCommit,
  TrendingUp,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import fallbackData from "@/lib/githubFallback.json";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContributionData {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

const USERNAME = "JustRob12";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function GithubContributions() {
  const [data, setData] = useState<GitHubContributionData>(
    fallbackData as GitHubContributionData
  );
  const [selectedYear, setSelectedYear] = useState<string>("last");
  const [loading, setLoading] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch live GitHub contributions on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchContributions() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${USERNAME}`
        );
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json?.contributions?.length) {
            setData(json);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch live GitHub contributions:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Available years from dataset (sorted desc, e.g. 2026, 2025...)
  const availableYears = useMemo(() => {
    const years = Object.keys(data.total || {})
      .filter((y) => !isNaN(Number(y)))
      .sort((a, b) => Number(b) - Number(a));
    return ["last", ...years];
  }, [data.total]);

  // Filter contributions for the selected year/period
  const currentPeriodDays = useMemo(() => {
    if (!data?.contributions) return [];

    if (selectedYear === "last") {
      // Last 365/371 days
      const sorted = [...data.contributions].sort((a, b) =>
        a.date.localeCompare(b.date)
      );
      // Grab approximately the last 365-371 days ending on last available day
      const lastDays = sorted.slice(-371);
      return lastDays;
    } else {
      return data.contributions.filter((d) => d.date.startsWith(selectedYear));
    }
  }, [data.contributions, selectedYear]);

  // Total contributions in selected period
  const periodTotal = useMemo(() => {
    if (selectedYear === "last") {
      return currentPeriodDays.reduce((acc, curr) => acc + curr.count, 0);
    }
    return data.total?.[selectedYear] ?? currentPeriodDays.reduce((acc, curr) => acc + curr.count, 0);
  }, [currentPeriodDays, data.total, selectedYear]);

  // Calculate statistics: Streaks and most active day
  const stats = useMemo(() => {
    const sorted = [...data.contributions].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    let maxStreak = 0;
    let tempStreak = 0;
    let mostActive = { date: "", count: 0 };

    for (let i = 0; i < sorted.length; i++) {
      const item = sorted[i];
      if (item.count > 0) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
        if (item.count > mostActive.count) {
          mostActive = { date: item.date, count: item.count };
        }
      } else {
        tempStreak = 0;
      }
    }

    // Current Streak calculation
    let currentStreak = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].count > 0) {
        currentStreak++;
      } else {
        // If today is index length - 1 and has 0 count yet, check yesterday
        if (i === sorted.length - 1) continue;
        break;
      }
    }

    // Active days count in current selected period
    const activeDaysCount = currentPeriodDays.filter((d) => d.count > 0).length;

    return {
      maxStreak,
      currentStreak,
      mostActive,
      activeDaysCount,
    };
  }, [data.contributions, currentPeriodDays]);

  // Organize days into 7-day columns (weeks)
  const { weeks, monthLabels } = useMemo(() => {
    if (!currentPeriodDays.length) return { weeks: [], monthLabels: [] };

    const sortedDays = [...currentPeriodDays].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const weeksArr: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    // First date of dataset
    const firstDate = new Date(sortedDays[0].date + "T00:00:00Z");
    const firstDayOfWeek = firstDate.getUTCDay(); // 0 is Sunday

    // Pad beginning of first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (const day of sortedDays) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    }

    // Pad end of last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArr.push(currentWeek);
    }

    // Calculate month labels positions
    const months: { weekIndex: number; label: string }[] = [];
    let lastMonth = -1;

    weeksArr.forEach((week, index) => {
      const firstValidDay = week.find((d) => d !== null);
      if (firstValidDay) {
        const m = new Date(firstValidDay.date + "T00:00:00Z").getUTCMonth();
        if (m !== lastMonth) {
          months.push({ weekIndex: index, label: MONTH_NAMES[m] });
          lastMonth = m;
        }
      }
    });

    return { weeks: weeksArr, monthLabels: months };
  }, [currentPeriodDays]);

  // Black and White Theme Color Classes
  const getCellThemeClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-neutral-300 dark:bg-neutral-700 hover:ring-1 hover:ring-neutral-400 dark:hover:ring-neutral-500";
      case 2:
        return "bg-neutral-500 dark:bg-neutral-500 hover:ring-1 hover:ring-neutral-600 dark:hover:ring-neutral-400";
      case 3:
        return "bg-neutral-700 dark:bg-neutral-300 hover:ring-1 hover:ring-neutral-800 dark:hover:ring-neutral-200";
      case 4:
        return "bg-black dark:bg-white hover:ring-2 hover:ring-black/40 dark:hover:ring-white/40 shadow-2xs";
      case 0:
      default:
        return "bg-neutral-100 dark:bg-[#181818] border border-neutral-200/70 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600";
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00Z");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 dark:border-neutral-800 dark:bg-[#111111] shadow-xs transition-all">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-neutral-800/60 pb-3.5 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
            <Github size={16} strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-black/90 dark:text-white/90">
                GitHub Contributions
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-2 py-0.5 text-[9px] font-bold text-black/70 dark:text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
                @{USERNAME}
              </span>
            </div>
            <p className="text-[11px] text-black/50 dark:text-neutral-400 mt-0.5">
              Code activity, commit history & open-source project contributions
            </p>
          </div>
        </div>

        {/* Action / Profile link */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-black transition-all hover:bg-black hover:text-white dark:border-neutral-800 dark:bg-[#181818] dark:text-white dark:hover:bg-white dark:hover:text-black active:scale-95 shadow-2xs"
          >
            <span>View GitHub Profile</span>
            <ExternalLink size={12} strokeWidth={2} />
          </a>
        </div>
      </div>

      {/* ── Monochromatic Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-neutral-50/70 p-3 dark:border-neutral-900 dark:bg-neutral-900/40">
          <div className="flex items-center justify-between text-black/50 dark:text-white/50 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {selectedYear === "last" ? "Past Year Total" : `${selectedYear} Total`}
            </span>
            <Calendar size={13} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              {periodTotal.toLocaleString()}
            </span>
            <span className="text-[10px] font-semibold text-black/60 dark:text-neutral-400">
              contributions
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-neutral-50/70 p-3 dark:border-neutral-900 dark:bg-neutral-900/40">
          <div className="flex items-center justify-between text-black/50 dark:text-white/50 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Current Streak
            </span>
            <Flame size={13} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              {stats.currentStreak}
            </span>
            <span className="text-[10px] font-semibold text-black/60 dark:text-neutral-400">
              days
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-neutral-50/70 p-3 dark:border-neutral-900 dark:bg-neutral-900/40">
          <div className="flex items-center justify-between text-black/50 dark:text-white/50 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Longest Streak
            </span>
            <Trophy size={13} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              {stats.maxStreak}
            </span>
            <span className="text-[10px] font-semibold text-black/60 dark:text-neutral-400">
              days
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-neutral-50/70 p-3 dark:border-neutral-900 dark:bg-neutral-900/40">
          <div className="flex items-center justify-between text-black/50 dark:text-white/50 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Active Days
            </span>
            <GitCommit size={13} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              {stats.activeDaysCount}
            </span>
            <span className="text-[10px] font-semibold text-black/60 dark:text-neutral-400">
              days
            </span>
          </div>
        </div>
      </div>

      {/* ── Year Selector Filter ── */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {availableYears.map((yr) => {
            const isSelected = selectedYear === yr;
            const label = yr === "last" ? "Last Year" : yr;
            return (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-tight transition-all active:scale-95 ${
                  isSelected
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                    : "bg-neutral-100 text-black/70 hover:bg-neutral-200 dark:bg-neutral-900/80 dark:text-white/70 dark:hover:bg-neutral-800"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {loading && (
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-black/50 dark:text-white/50">
            <RefreshCw size={11} className="animate-spin" />
            <span>Syncing live...</span>
          </div>
        )}
      </div>

      {/* ── Black & White Contribution Calendar Grid ── */}
      <div
        ref={containerRef}
        className="relative overflow-x-auto pb-2 scrollbar-hide no-scrollbar rounded-xl border border-gray-100 bg-neutral-50/40 p-3.5 dark:border-neutral-900 dark:bg-[#0c0c0c]"
      >
        <div className="min-w-[720px] flex flex-col gap-1.5 select-none">
          {/* Month Labels */}
          <div className="flex pl-7 text-[10px] font-semibold text-black/50 dark:text-neutral-400 h-4 relative">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                className="absolute"
                style={{
                  left: `calc(28px + ${m.weekIndex * 14}px)`,
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid Rows: Day labels + Week Columns */}
          <div className="flex gap-2">
            {/* Weekday indicators (Mon, Wed, Fri) */}
            <div className="flex flex-col justify-between text-[9px] font-semibold text-black/40 dark:text-neutral-500 pr-1 h-[95px] pt-1 pb-1">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Matrix of Columns (Weeks) */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dIndex) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${dIndex}`}
                          className="h-[11px] w-[11px] rounded-[2px] opacity-0"
                        />
                      );
                    }

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top - 8,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`h-[11px] w-[11px] rounded-[2px] cursor-pointer transition-all duration-150 hover:scale-130 hover:z-20 ${getCellThemeClass(
                          day.level
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monochromatic Interactive Tooltip */}
        {hoveredDay && (
          <div
            className="fixed pointer-events-none z-[150] -translate-x-1/2 -translate-y-full rounded-md bg-black px-2.5 py-1 text-[11px] font-medium text-white shadow-xl dark:bg-white dark:text-black border border-white/20 dark:border-black/20 animate-in fade-in zoom-in-95 duration-100 whitespace-nowrap"
            style={{
              left: `${hoveredDay.x}px`,
              top: `${hoveredDay.y}px`,
            }}
          >
            <span className="font-bold">
              {hoveredDay.day.count === 0
                ? "No contributions"
                : `${hoveredDay.day.count} contribution${
                    hoveredDay.day.count === 1 ? "" : "s"
                  }`}
            </span>{" "}
            on {formatDate(hoveredDay.day.date)}
          </div>
        )}
      </div>

      {/* ── Footer & Monochromatic Legend ── */}
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-black/60 dark:text-neutral-400 pt-2">
        <div className="flex items-center gap-1.5 text-[10px] font-medium">
          <Sparkles size={12} className="text-black/70 dark:text-white/70" />
          <span>Showing real-time commits, pull requests & repositories</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <div className="h-[10px] w-[10px] rounded-[2px] bg-neutral-100 dark:bg-[#181818] border border-neutral-200/70 dark:border-neutral-800/80" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-neutral-500 dark:bg-neutral-500" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-neutral-700 dark:bg-neutral-300" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-black dark:bg-white" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
