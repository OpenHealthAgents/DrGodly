import { z } from "zod";

// --- Enums ---
export const AppointmentStatusEnum = z.enum([
  "PENDING",
  "SCHEDULED",
  "CANCELLED",
  "COMPLETED",
  "INPROGRESS",
  "RESCHEDULED",
]);

export const AppointmentModeEnum = z.enum(["VIRTUAL", "INPERSON"]);

export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

// --- Personal Info Schemas ---
const DoctorPersonalSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  fullName: z.string(),
  gender: z.string().optional(), // assuming may come as string
});

const PatientPersonalSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  name: z.string(),
  gender: GenderEnum.optional(),
});

// --- Doctor and Patient Schemas ---
const DoctorSchema = z.object({
  orgId: z.string(),
  userId: z.string().nullable(),
  personal: DoctorPersonalSchema.nullable(),
});

const PatientSchema = z.object({
  orgId: z.string(),
  userId: z.string(),
  personal: PatientPersonalSchema.nullable(),
});

// --- Main Appointment Schema ---
export const AppointmentSchema = z.object({
  id: z.number(),
  orgId: z.string(),
  type: z.string(),
  status: AppointmentStatusEnum,
  time: z.string(),
  note: z.string().nullable(),
  appointmentDate: z.date(),
  appointmentMode: AppointmentModeEnum,
  price: z.number().positive().nullable(),
  priceCurrency: z.string().nullable(),
  virtualRoomId: z.string().nullable(),
  cancelReason: z.string().nullable(),
  conversation: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.record(z.any()),
    z.array(z.any()),
    z.null(),
  ]),
  report: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.record(z.any()),
    z.array(z.any()),
    z.null(),
  ]),
  createdAt: z.date(),
  updatedAt: z.date(),
  doctor: DoctorSchema,
  patient: PatientSchema,
});
export type TAppointment = z.infer<typeof AppointmentSchema>;

// --- If it’s an array of appointments ---
export const AppointmentsSchema = z.array(AppointmentSchema);
export type TAppointments = z.infer<typeof AppointmentsSchema>;

export const BookAppointmentSchema = z.object({
  userId: z.string(),
  patientId: z.string(),
  doctorId: z.string(),
  orgId: z.string(),
  appointmentDate: z.date(),
  time: z.string(),
  status: AppointmentStatusEnum,
  type: z.string(),
  price: z.number().positive().nullable(),
  priceCurrency: z.string().nullable(),
  appointmentMode: AppointmentModeEnum,
  virtualRoomId: z.string().nullable(),
  conversation: z.any().nullable(),
  report: z.any().nullable(),
  note: z.string().nullable(),
});
export type TBookAppointment = z.infer<typeof BookAppointmentSchema>;

export const BookAppointmentUseCaseSchema = BookAppointmentSchema.omit({
  patientId: true,
  doctorId: true,
  virtualRoomId: true,
  status: true,
  type: true,
  price: true,
  priceCurrency: true,
  userId: true,
}).extend(
  z.object({
    patientUserId: z.string(),
    doctorUserId: z.string(),
    serviceId: z.string(),
  }).shape
);
export type TBookAppointmentUseCase = z.infer<
  typeof BookAppointmentUseCaseSchema
>;
