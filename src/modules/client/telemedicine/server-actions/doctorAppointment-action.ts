"use server";

import {
  bookAppointmentController,
  TBookAppointmentControllerOutput,
} from "@/modules/server/telemedicine/interface-adapters/controllers/appointment";
import { BookAppointmentValidationSchema } from "@/modules/shared/schemas/telemedicine/doctorAppointment/doctorAppointmentValidationSchema";
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
