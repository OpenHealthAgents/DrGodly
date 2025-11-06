"use server";

import {
  getRolesController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
} from "@/modules/server/admin/interface-adapters/controllers/role";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import { TRole, TRolesData } from "@/modules/shared/entities/models/admin/role";
import {
  CreateRoleValidationSchema,
  DeleteRoleValidationSchema,
  UpdateRoleValidationSchema,
} from "@/modules/shared/schemas/admin/roleValidationSchema";
import { revalidatePath } from "next/cache";
import { ZSAError, createServerAction } from "zsa";

export const getAllRolesData = createServerAction().handler(async () => {
  let roleDatas: TRolesData;

  try {
    roleDatas = await getRolesController();
  } catch (err) {
    if (err instanceof InputParseError) {
      throw new ZSAError("INPUT_PARSE_ERROR", err.message);
    }

    if (err instanceof OperationError) {
      console.log(err);
      throw new ZSAError("ERROR", "Failed to get roles.");
    }

    throw new ZSAError("ERROR", err);
  }

  return roleDatas;
});

export const createRole = createServerAction()
  .input(CreateRoleValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let roleData: TRole;

    try {
      roleData = await createRoleController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to create role.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-roles");
    return roleData;
  });

export const editRole = createServerAction()
  .input(UpdateRoleValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let roleData: TRole;

    try {
      roleData = await updateRoleController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to edit role.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-roles");
    return roleData;
  });

export const deleteRole = createServerAction()
  .input(DeleteRoleValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let roleData: TRole;

    try {
      roleData = await deleteRoleController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to delete role.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-roles");
    return roleData;
  });
