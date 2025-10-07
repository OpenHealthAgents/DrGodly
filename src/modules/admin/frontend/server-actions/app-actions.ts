"use server";

import { ZSAError } from "zsa";
import { adminAuthenticatedProcedure } from "./admin-zsa-procedures";
import { AppDatasDTO, AppDTO } from "../../backend/dtos/app";
import { getAppInjection } from "../../backend/di/container";
import { DI_TYPES } from "../../backend/di/types";
import type { AppService } from "../../backend/services/appService";
import {
  createAppFormSchema,
  deleteAppSchema,
  editAppFormSchema,
} from "../zod-schemas/app/app-schemas";
import { revalidatePath } from "next/cache";

export const getAllAppsData = adminAuthenticatedProcedure
  .createServerAction()
  .handler(async () => {
    const appServices = getAppInjection<AppService>(DI_TYPES.AppService);

    let appDatas: AppDatasDTO;

    try {
      appDatas = await appServices.getApps();
    } catch (err) {
      throw new ZSAError("ERROR", err);
    }

    return appDatas;
  });

export const createApp = adminAuthenticatedProcedure
  .createServerAction()
  .input(createAppFormSchema)
  .handler(async ({ input }) => {
    const appServices = getAppInjection<AppService>(DI_TYPES.AppService);

    let appData: AppDTO;

    try {
      appData = await appServices.createApp({ ...input });
    } catch (err) {
      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const editApp = adminAuthenticatedProcedure
  .createServerAction()
  .input(editAppFormSchema)
  .handler(async ({ input }) => {
    const appServices = getAppInjection<AppService>(DI_TYPES.AppService);

    let appData: AppDTO;

    try {
      appData = await appServices.updateApp({ ...input });
    } catch (err) {
      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const deleteApp = adminAuthenticatedProcedure
  .createServerAction()
  .input(deleteAppSchema)
  .handler(async ({ input }) => {
    const appServices = getAppInjection<AppService>(DI_TYPES.AppService);

    let appData: AppDTO;

    try {
      appData = await appServices.deleteApp(input.id);
    } catch (err) {
      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

/*
import { Prisma } from "@prisma/client";
import { OperationError } from "../errors/commonError";

export async function getAppsAction() {
  try {
    const apps = await appRepository.getApps();
    return apps;
  } catch (error: any) {
    if (error instanceof OperationError) {
      if (error.cause instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.cause.code) {
          case "P2002":
            throw new Error("This app already exists.");
          case "P2025":
            throw new Error("Requested record not found.");
          default:
            throw new Error("Database error occurred.");
        }
      }

      throw new Error(error.message || "Operation failed.");
    }

    console.error("Unexpected error:", error);
    throw new Error("Unexpected server error occurred.");
  }
}

*/
