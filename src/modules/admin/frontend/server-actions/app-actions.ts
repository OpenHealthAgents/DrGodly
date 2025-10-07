"use server";

import { ZSAError } from "zsa";
import { adminAuthenticatedProcedure } from "./admin-zsa-procedures";
import { AppDatas, App } from "../../backend/entities/models/app";
import { getAppInjection } from "../../backend/di/container";
import { DI_TYPES } from "../../backend/di/types";
import {
  createAppFormSchema,
  deleteAppSchema,
  editAppFormSchema,
} from "../zod-schemas/app/app-schemas";
import { revalidatePath } from "next/cache";
import type { AppUseCases } from "../../backend/application/use-cases/appUseCases";

export const getAllAppsData = adminAuthenticatedProcedure
  .createServerAction()
  .handler(async () => {
    const appUseCases = getAppInjection<AppUseCases>(DI_TYPES.AppUseCases);

    let appDatas: AppDatas;

    try {
      appDatas = await appUseCases.getApps();
    } catch (err) {
      throw new ZSAError("ERROR", err);
    }

    return appDatas;
  });

export const createApp = adminAuthenticatedProcedure
  .createServerAction()
  .input(createAppFormSchema)
  .handler(async ({ input }) => {
    const appUseCases = getAppInjection<AppUseCases>(DI_TYPES.AppUseCases);

    let appData: App;

    try {
      appData = await appUseCases.createApp({ ...input });
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
    const appUseCases = getAppInjection<AppUseCases>(DI_TYPES.AppUseCases);

    let appData: App;

    try {
      appData = await appUseCases.updateApp({ ...input });
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
    const appUseCases = getAppInjection<AppUseCases>(DI_TYPES.AppUseCases);

    let appData: App;

    try {
      appData = await appUseCases.deleteApp(input.id);
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
