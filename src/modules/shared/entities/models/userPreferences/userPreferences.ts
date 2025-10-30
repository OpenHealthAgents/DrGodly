import { z } from "zod";

export const UserPreferenceSchema = z.object({
  id: z.string(),
  userId: z.string().min(1, "User ID is required"),
  timezone: z.string(),
  dateFormat: z.string(),
  timeFormat: z.enum(["12h", "24h"]),
  country: z.string(),
  currency: z.string(),
  measurementSystem: z.enum(["metric", "imperial"]),
  numberFormat: z.string(),
  weekStart: z.enum(["saturday", "sunday", "monday"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TUserPreference = z.infer<typeof UserPreferenceSchema>;
