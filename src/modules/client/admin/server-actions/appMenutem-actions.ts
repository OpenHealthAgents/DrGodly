import {
  createAppMenuItemController,
  getAppMenuItemsController,
} from "@/modules/server/admin/interface-adapters/controllers/appMenuItem";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  AppIdSchema,
  CreateAppMenuItemSchema,
  TAppMenuItem,
  TAppMenuItemsData,
} from "@/modules/shared/entities/models/admin/appMenuItem";
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
  .input(CreateAppMenuItemSchema, { skipInputParsing: true })
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
