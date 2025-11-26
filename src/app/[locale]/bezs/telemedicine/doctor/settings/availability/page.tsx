import DefaultWeeklyAvailability from "@/modules/client/telemedicine/components/doctor/availability/doctorWeeklyAvailability";

function DoctorAvailabilitySettings() {
  return (
    <div>
      <DefaultWeeklyAvailability />
    </div>
  );
}

export default DoctorAvailabilitySettings;

/* 
model DoctorDefaultAvailability {
  id        String   @id @default(uuid())
  doctorId  String
  dayOfWeek Int      // 0-6 (Sun-Sat)
  sessions  Json     // list of time ranges
}


model DoctorDateOverride {
  id        String   @id @default(uuid())
  doctorId  String
  date      Date      // specific date
  isHoliday Boolean   @default(false)
  sessions  Json?     // optional custom sessions
}


{
  date: "2025-11-19",
  isHoliday: false,
  sessions: [
    { from: "09:00", to: "13:00" },
    { from: "15:00", to: "18:00" }
  ]
}

*/
