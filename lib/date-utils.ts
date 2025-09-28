import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isBefore,
  isEqual,
} from "date-fns";

export function getDatesOfThisWeek(weekStartsOn: 0 | 1 = 0): Date[] {
  const now = new Date();

  const start = startOfWeek(now, { weekStartsOn }); // 0 = Sunday, 1 = Monday
  const end = endOfWeek(now, { weekStartsOn });

  return eachDayOfInterval({ start, end });
}

export function getDatesOfThisMonth(): Date[] {
  const now = new Date();

  const start = startOfMonth(now);
  const end = endOfMonth(now);

  return eachDayOfInterval({ start, end });
}

export function isBeforeOrEqual(a: Date, b: Date) {
  return isBefore(a, b) || isEqual(a, b);
}
