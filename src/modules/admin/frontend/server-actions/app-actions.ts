"use server";

import { ServiceLocator } from "../../backend/services/serviceLocator";
import { ZSAError } from "zsa";
import { adminAuthenticatedProcedure } from "./admin-zsa-procedures";
import { AppDatasDTO } from "../../backend/dtos/app";

export const getAllAppsData = adminAuthenticatedProcedure
  .createServerAction()
  .handler(async () => {
    const appServices = ServiceLocator.getService("AppService");

    let appDatas: AppDatasDTO;

    try {
      appDatas = await appServices.getApps();
    } catch (err) {
      throw new ZSAError("ERROR", err);
    }

    return appDatas;
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
