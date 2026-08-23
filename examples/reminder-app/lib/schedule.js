import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loadRoster() {
  const filePath = path.join(process.cwd(), "data", "roster.json");
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export function dateInTimeZone(date, timeZone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function addDays(date, days) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function getTomorrow(timeZone) {
  return dateInTimeZone(addDays(new Date(), 1), timeZone);
}

export function getToday(timeZone) {
  return dateInTimeZone(new Date(), timeZone);
}

export function formatEntryDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function entriesForDate(roster, isoDate) {
  return roster.entries
    .filter((e) => e.date === isoDate)
    .sort((a, b) => a.time.localeCompare(b.time));
}
