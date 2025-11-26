import { z } from "zod";

// --- Enums ---
export const AppointmentStatusEnum = z.enum([
  "PENDING",
  "SCHEDULED",
  "CANCELLED",
  "COMPLETED",
  "INPROGRESS",
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
  id: z.string(),
  orgId: z.string(),
  userId: z.string().nullable(),
  doctorId: z.number(),
  registrationNumber: z.string().nullable(),
  registrationProvider: z.string().nullable(),
  isCompleted: z.boolean(),
  isABDMDoctorProfile: z.boolean(),
  personal: DoctorPersonalSchema.nullable(),
});

const PatientSchema = z.object({
  id: z.string(),
  orgId: z.string(),
  userId: z.string(),
  patientId: z.number(),
  isCompleted: z.boolean(),
  isABHAPatientProfile: z.boolean(),
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
  doctorId: z.string(),
  patientId: z.string(),
  appointmentDate: z.date(),
  appointmentMode: AppointmentModeEnum,
  price: z.string(),
  virtualRoomId: z.string().nullable(),
  reason: z.string().nullable(),
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
  created_at: z.date(),
  updated_at: z.date(),
  doctor: DoctorSchema,
  patient: PatientSchema,
});
export type TAppointment = z.infer<typeof AppointmentSchema>;

// --- If it’s an array of appointments ---
export const AppointmentsSchema = z.array(AppointmentSchema);
export type TAppointments = z.infer<typeof AppointmentsSchema>;

export const BookAppointmentSchema = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  orgId: z.string(),
  appointmentDate: z.date(),
  time: z.string(),
  status: AppointmentStatusEnum,
  type: z.string(),
  price: z.string(),
  appointmentMode: AppointmentModeEnum,
  virtualRoomId: z.string().nullable(),
});
export type TBookAppointment = z.infer<typeof BookAppointmentSchema>;
