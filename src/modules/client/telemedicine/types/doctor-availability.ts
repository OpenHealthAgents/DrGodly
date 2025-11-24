// types/availability.ts
export type TimeRange = {
  from: string; // "09:00" (24h)
  to: string; // "15:30"
};

export type DaySchedule = {
  enabled: boolean;
  sessions: TimeRange[]; // can be empty if not enabled
};

export type WeeklyDefault = Record<number, DaySchedule>; // 0 (Sun) - 6 (Sat)

export type DateOverride = {
  id?: string;
  date: string; // "YYYY-MM-DD"
  isHoliday: boolean;
  sessions?: TimeRange[]; // absent or [] when isHoliday=true
  doctorId?: string;
};
