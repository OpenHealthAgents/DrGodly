"use server";

import { revalidatePath } from "next/cache";
import { createServerAction, ZSAError } from "zsa";
import { TAppDatas, TApp } from "@/modules/shared/entities/models/admin/app";
import {
  CreateAppValidationSchema,
  UpdateAppValidationFormSchema,
  DeleteAppValidationSchema,
} from "@/modules/shared/schemas/admin/appValidationSchema";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  getAppsController,
  createAppController,
  deleteAppController,
  updateAppController,
} from "@/modules/server/admin/interface-adapters/controllers/app";
import { getSharedInjection } from "@/modules/server/shared/di/container";

export const getAllAppsData = createServerAction().handler(async () => {
  const monitoringService = getSharedInjection("IMonitoringService");

  return monitoringService.instrumentServerAction(
    "getAllAppsData",
    { op: "server.action" },
    async () => {
      let appDatas: TAppDatas;

      try {
        appDatas = await getAppsController();
      } catch (err) {
        if (err instanceof InputParseError) {
          throw new ZSAError("INPUT_PARSE_ERROR", err.message);
        }

        if (err instanceof OperationError) {
          monitoringService.report(err);
          console.log("Error reported to sentry");
          throw new ZSAError("ERROR", "Failed to get apps.");
        }

        throw new ZSAError("ERROR", err);
      }

      return appDatas;
    }
  );
});

export const createApp = createServerAction()
  .input(CreateAppValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    // const monitoringService = getSharedInjection("IMonitoringService");
    let appData: TApp;

    try {
      appData = await createAppController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.cause);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to create app.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const editApp = createServerAction()
  .input(UpdateAppValidationFormSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appData: TApp;

    try {
      appData = await updateAppController(input);
    } catch (err) {
      if (err instanceof OperationError) {
        throw new ZSAError("ERROR", "Failed to update app.");
      }
      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const deleteApp = createServerAction()
  .input(DeleteAppValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appData: TApp;

    try {
      appData = await deleteAppController(input);
    } catch (err) {
      if (err instanceof OperationError) {
        throw new ZSAError("ERROR", "Failed to delete app.");
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
