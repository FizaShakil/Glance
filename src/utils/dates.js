// Lightweight date helpers (no external deps).

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const todayISO = () => toISODate(new Date());

export const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const fromISO = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const formatShort = (iso) => {
  if (!iso) return "";
  const d = fromISO(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const formatLong = (iso) => {
  if (!iso) return "";
  const d = fromISO(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const nightsBetween = (fromISOStr, toISOStr) => {
  const a = fromISO(fromISOStr);
  const b = fromISO(toISOStr);
  if (!a || !b) return 0;
  return Math.round((b - a) / 86400000);
};

export const monthGrid = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    cells.push(new Date(year, month, i));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

export const shiftMonth = (monthDate, delta) => {
  return new Date(monthDate.getFullYear(), monthDate.getMonth() + delta, 1);
};

export const isSameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const isBefore = (a, b) =>
  a && b && a.getTime() < b.getTime();

export const isBetweenInclusive = (day, start, end) =>
  day && start && end && day.getTime() >= start.getTime() && day.getTime() <= end.getTime();

export { WEEKDAYS, MONTHS };