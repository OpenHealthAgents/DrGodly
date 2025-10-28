"use server";

import {
  getRoleAppMenuItemsController,
  mapAppMenuItemsToRoleController,
  unmapAppMenuItemsToRoleController,
} from "@/modules/server/admin/interface-adapters/controllers/roleAppMenuItem";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  TRoleAppMenuItem,
  TRoleAppMenuItemsData,
} from "@/modules/shared/entities/models/admin/roleAppMenuItem";
import {
  MapOrUnmapAppMenuItemToRoleValidateSchema,
  getRoleAppMenuItemsValidateSchema,
} from "@/modules/shared/schemas/admin/roleAppMenuItemValidatorSchema";
import { ZSAError, createServerAction } from "zsa";

export const getRoleAppMenuItems = createServerAction()
  .input(getRoleAppMenuItemsValidateSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let roleAppMenuItems: TRoleAppMenuItemsData;

    try {
      roleAppMenuItems = await getRoleAppMenuItemsController(input);
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

    return roleAppMenuItems;
  });

export const mapAppMenuItemsToRole = createServerAction()
  .input(MapOrUnmapAppMenuItemToRoleValidateSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let roleAppMenuItem: TRoleAppMenuItem;

    try {
      roleAppMenuItem = await mapAppMenuItemsToRoleController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to map app menu item.");
      }

      if (err instanceof Error) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    return roleAppMenuItem;
  });

export const unmapAppMenuItemsToRole = createServerAction()
  .input(MapOrUnmapAppMenuItemToRoleValidateSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let roleAppMenuItem: TRoleAppMenuItem;

    try {
      roleAppMenuItem = await unmapAppMenuItemsToRoleController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to unmap app menu item.");
      }

      if (err instanceof Error) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    return roleAppMenuItem;
  });
