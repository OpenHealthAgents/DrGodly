"use server";

import {
  bookAppointmentController,
  getAppointmentsForDoctorController,
  getAppointmentsForPatientController,
  TBookAppointmentControllerOutput,
  TGetAppointmentsForDoctorControllerOutput,
  TGetAppointmentsForPatientControllerOutput,
} from "@/modules/server/telemedicine/interface-adapters/controllers/appointment";
import {
  BookAppointmentValidationSchema,
  GetAppointmentValidationSchema,
} from "@/modules/shared/schemas/telemedicine/doctorAppointment/doctorAppointmentValidationSchema";
import { withMonitoring } from "@/modules/shared/utils/serverActionWithMonitoring";
import { createServerAction } from "zsa";

export const bookAppointment = createServerAction()
  .input(BookAppointmentValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TBookAppointmentControllerOutput>(
      "bookAppointment",
      () => bookAppointmentController(input),
      {
        operationErrorMessage: "Failed to book appointment.",
      }
    );
  });

export const getPatientAppointments = createServerAction()
  .input(GetAppointmentValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TGetAppointmentsForPatientControllerOutput>(
      "getPatientAppointments",
      () => getAppointmentsForPatientController(input),
      {
        operationErrorMessage: "Failed to get appointments.",
      }
    );
  });

export const getDoctorAppointments = createServerAction()
  .input(GetAppointmentValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TGetAppointmentsForDoctorControllerOutput>(
      "getDoctorAppointments",
      () => getAppointmentsForDoctorController(input),
      {
        operationErrorMessage: "Failed to get appointments.",
      }
    );
  });
