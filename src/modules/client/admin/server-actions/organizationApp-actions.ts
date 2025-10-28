"use server";

import {
  addAppToOrganizationController,
  getOrganizationAppsController,
  removeAppFromOrganizationController,
} from "@/modules/server/admin/interface-adapters/controllers/organizationApp";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  TOrganizationApp,
  TOrganizationApps,
} from "@/modules/shared/entities/models/admin/organizationApp";
import {
  AddAppToOrganizationValidationSchema,
  GetOrganizationAppsValidationSchema,
} from "@/modules/shared/schemas/admin/organizationAppValidationSchema";
import { revalidatePath } from "next/cache";
import { ZSAError, createServerAction } from "zsa";

export const getOrganizationAppsData = createServerAction()
  .input(GetOrganizationAppsValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organizationAppsDatas: TOrganizationApps;

    try {
      organizationAppsDatas = await getOrganizationAppsController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to get org apps.");
      }

      throw new ZSAError("ERROR", err);
    }

    return organizationAppsDatas;
  });

export const addAppToOrganization = createServerAction()
  .input(AddAppToOrganizationValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organizationAppData: TOrganizationApp;

    try {
      organizationAppData = await addAppToOrganizationController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to add org app.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-organizations");
    return organizationAppData;
  });

export const removeAppFromOrganization = createServerAction()
  .input(AddAppToOrganizationValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organizationAppData: TOrganizationApp;

    try {
      organizationAppData = await removeAppFromOrganizationController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to remove org app.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-organizations");
    return organizationAppData;
  });
