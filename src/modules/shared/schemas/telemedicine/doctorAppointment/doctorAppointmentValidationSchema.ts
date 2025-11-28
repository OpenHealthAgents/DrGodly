import z from "zod";

export const AppointmentModeEnum = z.enum(["VIRTUAL", "INPERSON"], {
  required_error: "Appointment mode is required.",
});

export const BookAppointmentValidationSchema = z.object({
  patientUserId: z.string({ required_error: "Patient user ID is required." }),
  doctorUserId: z.string({ required_error: "Doctor user ID is required." }),
  orgId: z.string({ required_error: "Organization ID is required." }),
  appointmentDate: z.date({ required_error: "Appointment date is required." }),
  time: z.string({ required_error: "Appointment time is required." }),
  serviceId: z.string({ required_error: "Service ID is required." }),
  appointmentMode: AppointmentModeEnum,
  conversation: z.any().nullable(),
  report: z.any().nullable(),
  note: z.string().nullable(),
});
export type TBookAppointmentValidation = z.infer<
  typeof BookAppointmentValidationSchema
>;
