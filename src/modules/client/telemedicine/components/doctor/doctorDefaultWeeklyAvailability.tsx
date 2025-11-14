"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function DefaultWeeklyAvailability() {
  const [schedule, setSchedule] = useState(
    weekdays.map(() => ({
      enabled: false,
      sessions: [] as { from: string; to: string }[],
    }))
  );

  const addSession = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].sessions.push({ from: "", to: "" });
    setSchedule(newSchedule);
  };

  const updateSession = (
    dayIndex: number,
    sessionIndex: number,
    key: "from" | "to",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].sessions[sessionIndex][key] = value;
    setSchedule(newSchedule);
  };

  const deleteSession = (dayIndex: number, sessionIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].sessions.splice(sessionIndex, 1);
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold mb-4">
        Default Weekly Availability
      </h2>

      {weekdays.map((day, i) => (
        <div key={i} className="border p-4 rounded-lg space-y-3">
          {/* Day Row */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{day}</h3>

            <Switch
              checked={schedule[i].enabled}
              onCheckedChange={(v) => {
                const newSchedule = [...schedule];
                newSchedule[i].enabled = v;
                setSchedule(newSchedule);
              }}
            />
          </div>

          {/* Time Sessions */}
          {schedule[i].enabled && (
            <div className="space-y-3">
              {schedule[i].sessions.map((session, si) => (
                <div key={si} className="flex items-center gap-3">
                  <Input
                    type="time"
                    className="w-32"
                    value={session.from}
                    onChange={(e) =>
                      updateSession(i, si, "from", e.target.value)
                    }
                  />
                  <span>to</span>
                  <Input
                    type="time"
                    className="w-32"
                    value={session.to}
                    onChange={(e) => updateSession(i, si, "to", e.target.value)}
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteSession(i, si)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button onClick={() => addSession(i)}>+ Add Time Range</Button>
            </div>
          )}
        </div>
      ))}

      <Button
        className="mt-6"
        onClick={() => {
          console.log("Saved:", schedule);
          alert("Default Availability Saved!");
        }}
      >
        Save Default Availability
      </Button>
    </div>
  );
}
