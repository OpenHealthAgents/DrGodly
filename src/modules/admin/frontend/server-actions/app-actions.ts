"use server";

import { revalidatePath } from "next/cache";
import { createServerAction, ZSAError } from "zsa";
import { AppDatas, App } from "@/modules/admin/backend/entities/models/app";
import {
  createAppFormSchema,
  deleteAppSchema,
  editAppFormSchema,
} from "@/modules/admin/frontend/zod-schemas/app/app-schemas";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  getAppsController,
  createAppController,
  deleteAppController,
  updateAppController,
} from "../../backend/interface-adapters/controllers/app";

export const getAllAppsData = createServerAction().handler(async () => {
  let appDatas: AppDatas;

  try {
    appDatas = await getAppsController();
  } catch (err) {
    if (err instanceof OperationError) {
      // TODO report error to sentry
      throw new ZSAError("ERROR", "Cannot get app datas.");
    }
    throw new ZSAError("ERROR", err);
  }

  return appDatas;
});

export const createApp = createServerAction()
  .input(createAppFormSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appData: App;

    try {
      appData = await createAppController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Cannot create app.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const editApp = createServerAction()
  .input(editAppFormSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appData: App;

    try {
      appData = await updateAppController(input);
    } catch (err) {
      if (err instanceof OperationError) {
        throw new ZSAError("ERROR", "Cannot update app.");
      }
      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps");
    return appData;
  });

export const deleteApp = createServerAction()
  .input(deleteAppSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appData: App;

    try {
      appData = await deleteAppController(input);
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
