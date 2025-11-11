"use server";

import {
  createDoctorInitialProfileController,
  getAllDoctorsDataController,
  getDoctorDataByIdController,
  deleteDoctorProfileController,
  createorUpdateDoctorPersonalDetailsController,
} from "@/modules/server/telemedicine/interface-adapters/controllers/doctorProfile";
import {
  TDoctor,
  TDoctorDatas,
  TDoctorInitialProfile,
} from "@/modules/shared/entities/models/telemedicine/doctorProfile";
import {
  getAllDoctorSchema,
  CreateDoctorInitialProfileSchema,
  DeleteDoctorProfileSchema,
  DoctorProfileCreateOrUpdateValidationSchema,
} from "@/modules/shared/schemas/telemedicine/doctorProfile/doctorProfileValidationSchema";
import { withMonitoring } from "@/modules/shared/utils/serverActionWithMonitoring";
import { createServerAction } from "zsa";

export const getAllDoctorsData = createServerAction()
  .input(getAllDoctorSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TDoctorDatas>(
      "getAllDoctorsData",
      () => getAllDoctorsDataController(input),
      {
        operationErrorMessage: "Failed to get doctor datas.",
      }
    );
  });

export const createDoctorInitialProfile = createServerAction()
  .input(CreateDoctorInitialProfileSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TDoctorInitialProfile>(
      "createDoctorInitialProfile",
      () => createDoctorInitialProfileController(input),
      {
        url: "/bezs/telemedicine/admin/manage-doctors",
        revalidatePath: true,
        operationErrorMessage: "Failed to create initial doctor profile.",
      }
    );
  });

export const deleteDoctorProfile = createServerAction()
  .input(DeleteDoctorProfileSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TDoctorInitialProfile>(
      "deleteDoctorProfile",
      () => deleteDoctorProfileController(input),
      {
        url: "/bezs/telemedicine/admin/manage-doctors",
        revalidatePath: true,
        operationErrorMessage: "Failed to delete doctor profile.",
      }
    );
  });

export const getDoctorDataById = createServerAction()
  .input(DeleteDoctorProfileSchema, { skipInputParsing: false })
  .handler(async ({ input }) => {
    return await withMonitoring<TDoctor | null>(
      "getDoctorDataById",
      () => getDoctorDataByIdController(input),
      {
        operationErrorMessage: "Failed to get doctor profile.",
      }
    );
  });

export const createOrUpdateDoctorPersonalDetails = createServerAction()
  .input(DoctorProfileCreateOrUpdateValidationSchema, {
    skipInputParsing: true,
  })
  .handler(async ({ input }) => {
    return await withMonitoring<TDoctor>(
      "createOrUpdateDoctorPersonalDetails",
      () => createorUpdateDoctorPersonalDetailsController(input),
      {
        url: "/bezs/telemedicine/admin/manage-doctors/create",
        revalidatePath: true,
        operationErrorMessage: "Failed to create doctor profile.",
      }
    );
  });
