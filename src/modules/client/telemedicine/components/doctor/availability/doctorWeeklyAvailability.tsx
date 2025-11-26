"use client";

import { useState } from "react";
import { DayRow } from "./dayRow";
import { Button } from "@/components/ui/button";
import { DaySchedule } from "../../../types/doctor-availability";
import { generateId } from "../../../utils";
import { Save, CalendarClock, Info, Copy } from "lucide-react";

const INITIAL_SCHEDULE: DaySchedule[] = [
  { id: "sunday", label: "Sunday", isEnabled: false, slots: [] },
  {
    id: "monday",
    label: "Monday",
    isEnabled: true,
    slots: [{ id: "1", start: "09:00", end: "17:00" }],
  },
  {
    id: "tuesday",
    label: "Tuesday",
    isEnabled: true,
    slots: [{ id: "2", start: "09:00", end: "17:00" }],
  },
  {
    id: "wednesday",
    label: "Wednesday",
    isEnabled: true,
    slots: [{ id: "3", start: "09:00", end: "17:00" }],
  },
  {
    id: "thursday",
    label: "Thursday",
    isEnabled: true,
    slots: [{ id: "4", start: "09:00", end: "17:00" }],
  },
  {
    id: "friday",
    label: "Friday",
    isEnabled: true,
    slots: [{ id: "5", start: "09:00", end: "15:00" }],
  },
  { id: "saturday", label: "Saturday", isEnabled: false, slots: [] },
];

export default function DefaultWeeklyAvailability() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateDay = (updatedDay: DaySchedule) => {
    setSchedule((prev) =>
      prev.map((day) => (day.id === updatedDay.id ? updatedDay : day))
    );
  };

  const handleCopyToAll = (sourceDayId: string) => {
    const sourceDay = schedule.find((d) => d.id === sourceDayId);
    if (!sourceDay) return;

    if (
      confirm(
        `Are you sure you want to copy ${sourceDay.label}'s schedule to all other days?`
      )
    ) {
      setSchedule((prev) =>
        prev.map((day) => {
          if (day.id === sourceDay.id) return day;
          // Create deep copies of slots with new IDs
          const newSlots = sourceDay.slots.map((s) => ({
            ...s,
            id: generateId(),
          }));
          return {
            ...day,
            isEnabled: sourceDay.isEnabled,
            slots: newSlots,
          };
        })
      );
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Availability saved successfully!");
    }, 1000);
  };

  // Calculate stats for the header
  const totalActiveHours = schedule.reduce((acc, day) => {
    if (!day.isEnabled) return acc;
    return acc + day.slots.length; // Simply counting slots for visual summary
  }, 0);

  return (
    <div>
      {/* Main Container */}
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <CalendarClock className="h-8 w-8 text-primary-600" />
              Weekly Availability
            </h1>
            <p className="mt-2 text-muted-foreground">
              Set your recurring weekly schedule. This will be used as your
              default availability for new appointment slots.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-sm font-medium text-muted-foreground">
              Status
            </span>
            <div className="text-nowrap flex items-center gap-2 text-primary bg-primary/10 px-3 border border-primary/20 py-1 rounded-full text-sm font-medium mt-1">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              {totalActiveHours > 0 ? "Accepting Appointments" : "Unavailable"}
            </div>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          {/* Info Banner */}
          <div className="bg-primary/10 border-b border-primary/20 px-6 py-3 flex gap-3 items-start">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-primary">
              <strong>Tip:</strong> You can copy a day&apos;s schedule to the
              rest of the week by clicking the copy icon{" "}
              <Copy className="inline h-3 w-3 align-[-2px]" /> next to the first
              time slot.
            </p>
          </div>

          <div className="p-6 space-y-4">
            {schedule.map((day) => (
              <DayRow
                key={day.id}
                day={day}
                onUpdate={handleUpdateDay}
                onCopyToAll={() => handleCopyToAll(day.id)}
              />
            ))}
          </div>

          {/* Footer Action */}
          <div className="bg-muted px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground text-center sm:text-left">
              All times are in your local timezone.
            </span>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto"
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Schedule
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
