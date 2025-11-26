"use server";

import {
  CreateDoctorServiceController,
  deleteDoctorServiceController,
  getDoctorServiceController,
  TCreateDoctorServiceControllerOutput,
  TDeleteDoctorServiceControllerOutput,
  TGetDoctorServiceControllerOutput,
} from "@/modules/server/telemedicine/interface-adapters/controllers/doctorService";
import {
  DoctorServiceValidationSchema as CreateDoctorServiceValidationSchema,
  DeleteDoctorServiceValidationSchema,
  GetDoctorServiceValidationSchema,
} from "@/modules/shared/schemas/telemedicine/doctorService/doctorServiceValidationSchema";
import { withMonitoring } from "@/modules/shared/utils/serverActionWithMonitoring";
import { createServerAction } from "zsa";

export const getDoctorServices = createServerAction()
  .input(GetDoctorServiceValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TGetDoctorServiceControllerOutput>(
      "getDoctorServices",
      () => getDoctorServiceController(input),
      {
        operationErrorMessage: "Failed to get service data.",
      }
    );
  });

export const createDoctorService = createServerAction()
  .input(CreateDoctorServiceValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TCreateDoctorServiceControllerOutput>(
      "createDoctorService",
      () => CreateDoctorServiceController(input),
      {
        url: "/bezs/telemedicine/doctor/settings/services",
        revalidatePath: true,
        operationErrorMessage: "Failed to create service.",
      }
    );
  });

export const deleteDoctorService = createServerAction()
  .input(DeleteDoctorServiceValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TDeleteDoctorServiceControllerOutput>(
      "deleteDoctorService",
      () => deleteDoctorServiceController(input),
      {
        url: "/bezs/telemedicine/doctor/settings/services",
        revalidatePath: true,
        operationErrorMessage: "Failed to delete service.",
      }
    );
  });
