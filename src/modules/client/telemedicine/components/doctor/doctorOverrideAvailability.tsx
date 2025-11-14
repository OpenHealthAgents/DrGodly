"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { format } from "date-fns";

export default function DateOverrideAvailability({ defaultWeekly }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isHoliday, setIsHoliday] = useState(false);
  const [sessions, setSessions] = useState<{ from: string; to: string }[]>([]);

  // Load default sessions when clicking a date if no override exists
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);

    const weekday = date.getDay();
    const defaults = defaultWeekly[weekday]?.sessions ?? [];

    setIsHoliday(false);
    setSessions(defaults);
  };

  const addSession = () => {
    setSessions([...sessions, { from: "", to: "" }]);
  };

  const updateSession = (index: number, key: "from" | "to", value: string) => {
    const newSessions = [...sessions];
    newSessions[index][key] = value;
    setSessions(newSessions);
  };

  const deleteSession = (index: number) => {
    const newSessions = [...sessions];
    newSessions.splice(index, 1);
    setSessions(newSessions);
  };

  const saveOverride = () => {
    if (!selectedDate) return;

    const override = {
      date: format(selectedDate, "yyyy-MM-dd"),
      isHoliday,
      sessions: isHoliday ? [] : sessions,
    };

    console.log("Override saved: ", override);

    alert("Override saved!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Calendar */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Select a Date</h2>

        <Calendar
          mode="single"
          selected={selectedDate ?? undefined}
          onSelect={(day) => handleSelectDate(day as Date)}
          className="rounded-md border"
        />
      </div>

      {/* Right Side Panel */}
      {selectedDate && (
        <div className="border p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-medium">
            Override for {format(selectedDate, "PPP")}
          </h2>

          {/* Holiday Toggle */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Mark this day as holiday</span>
            <Switch checked={isHoliday} onCheckedChange={setIsHoliday} />
          </div>

          {/* Time Sessions */}
          {!isHoliday && (
            <div className="space-y-4">
              {sessions.map((session, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Input
                    type="time"
                    className="w-32"
                    value={session.from}
                    onChange={(e) => updateSession(i, "from", e.target.value)}
                  />

                  <span>to</span>

                  <Input
                    type="time"
                    className="w-32"
                    value={session.to}
                    onChange={(e) => updateSession(i, "to", e.target.value)}
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteSession(i)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button onClick={addSession}>+ Add Time Range</Button>
            </div>
          )}

          {/* Save Button */}
          <Button className="w-full" onClick={saveOverride}>
            Save Override
          </Button>
        </div>
      )}
    </div>
  );
}
