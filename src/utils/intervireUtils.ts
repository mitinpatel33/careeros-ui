import { useEffect, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

/** Pulls a readable message out of an RTK Query error. */
export const getErrorMessage = (error: unknown): string => {
  const e = error as
    | { data?: { message?: string }; error?: string }
    | undefined;
  return (
    e?.data?.message ?? e?.error ?? "Something went wrong. Please try again."
  );
};

export const timeAgo = (iso: string): string => {
  const diffSec = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diffSec) >= secs)
      return rtf.format(Math.round(diffSec / secs), unit);
  }
  return "just now";
};

export const statusColor = (status: string): string =>
  ({ Completed: "#13b981", Practiced: "#3279f6", "In Progress": "#8a4de8" })[
    status
  ] ?? "#3279f6";
