import z from "zod";

const IdSchema = z.object({
  appointmentId: z
    .string({ invalid_type_error: "AppointmentId must be a string" })
    .min(1, "AppointmentId is required"),
  userId: z
    .string({ invalid_type_error: "UserId must be a string" })
    .min(1, "UserId is required"),
  orgId: z
    .string({ invalid_type_error: "Organization ID must be a string" })
    .min(1, "Organization ID is required"),
});

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

export const GetAppointmentValidationSchema = IdSchema.pick({
  userId: true,
  orgId: true,
});
