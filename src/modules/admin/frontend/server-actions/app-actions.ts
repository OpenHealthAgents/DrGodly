"use server";

import { revalidatePath } from "next/cache";
import { ZSAError } from "zsa";
import { adminAuthenticatedProcedure } from "@/modules/admin/frontend/server-actions/admin-zsa-procedures";
import { AppDatas, App } from "@/modules/admin/backend/entities/models/app";
import { getAppInjection } from "@/modules/admin/backend/di/container";
import {
  createAppFormSchema,
  deleteAppSchema,
  editAppFormSchema,
} from "@/modules/admin/frontend/zod-schemas/app/app-schemas";
import { OperationError } from "@/modules/shared/entities/errors/commonError";

export const getAllAppsData = adminAuthenticatedProcedure
  .createServerAction()
  .handler(async () => {
    const appUseCases = getAppInjection("AppUseCases");

    let appDatas: AppDatas;

    try {
      appDatas = await appUseCases.getApps();
    } catch (err) {
      if (err instanceof OperationError) {
        // TODO report error to sentry
        throw new ZSAError("ERROR", "Cannot get app datas.");
      }
      throw new ZSAError("ERROR", err);
    }

    return appDatas;
  });

export const createApp = adminAuthenticatedProcedure
  .createServerAction()
  .input(createAppFormSchema)
  .handler(async ({ input }) => {
    const appUseCases = getAppInjection("AppUseCases");

    let appData: App;

    try {
      appData = await appUseCases.createApp({ ...input });
    } catch (err) {
      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Cannot create app.");
      }
      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const editApp = adminAuthenticatedProcedure
  .createServerAction()
  .input(editAppFormSchema)
  .handler(async ({ input }) => {
    const appUseCases = getAppInjection("AppUseCases");

    let appData: App;

    try {
      appData = await appUseCases.updateApp({ ...input });
    } catch (err) {
      if (err instanceof OperationError) {
        throw new ZSAError("ERROR", "Cannot update app.");
      }
      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const deleteApp = adminAuthenticatedProcedure
  .createServerAction()
  .input(deleteAppSchema)
  .handler(async ({ input }) => {
    const appUseCases = getAppInjection("AppUseCases");

    let appData: App;

    try {
      appData = await appUseCases.deleteApp(input.id);
    } catch (err) {
      if (err instanceof OperationError) {
        throw new ZSAError("ERROR", "Cannot delete app.");
      }
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
