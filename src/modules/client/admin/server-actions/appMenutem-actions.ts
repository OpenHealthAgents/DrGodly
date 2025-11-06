"use server";

import {
  createAppMenuItemController,
  getAppMenuItemsController,
} from "@/modules/server/admin/interface-adapters/controllers/appMenuItem";
import { deleteAppMenuItemController } from "@/modules/server/admin/interface-adapters/controllers/appMenuItem/deleteAppMenuItem.controller";
import { updateAppMenuItemController } from "@/modules/server/admin/interface-adapters/controllers/appMenuItem/updateAppMenuItem.controller";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  AppIdSchema,
  TAppMenuItem,
  TAppMenuItemsData,
} from "@/modules/shared/entities/models/admin/appMenuItem";
import {
  CreateAppMenuItemValidationSchema,
  DeleteAppMenuItemValidationSchema,
  UpdateAppMenuItemValidationSchema,
} from "@/modules/shared/schemas/admin/appMenuItemValidationSchema";
import { revalidatePath } from "next/cache";
import { createServerAction, ZSAError } from "zsa";

export const getAppMenuItems = createServerAction()
  .input(AppIdSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appMenuItems: TAppMenuItemsData;

    try {
      appMenuItems = await getAppMenuItemsController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to get app menu items.");
      }

      if (err instanceof Error) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    return appMenuItems;
  });

export const createAppMenuItem = createServerAction()
  .input(CreateAppMenuItemValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appMenuItem: TAppMenuItem;

    try {
      appMenuItem = await createAppMenuItemController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to create app menu item.");
      }

      if (err instanceof Error) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps/manage-menus");
    return appMenuItem;
  });

export const editAppMenuItem = createServerAction()
  .input(UpdateAppMenuItemValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appMenuItem: TAppMenuItem;

    try {
      appMenuItem = await updateAppMenuItemController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to edit app menu item.");
      }

      if (err instanceof Error) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps/manage-menus");
    return appMenuItem;
  });

export const deleteAppMenuItem = createServerAction()
  .input(DeleteAppMenuItemValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let appMenuItem: TAppMenuItem;

    try {
      appMenuItem = await deleteAppMenuItemController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to delete app menu item.");
      }

      if (err instanceof Error) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-apps/manage-menus");
    return appMenuItem;
  });
