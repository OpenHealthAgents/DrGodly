"use server";

import {
  mapRbacUserOrganizationRoleController,
  getRbacDatasController,
} from "@/modules/server/admin/interface-adapters/controllers/rbac";
import { unmapRbacUserOrganizationRoleController } from "@/modules/server/admin/interface-adapters/controllers/rbac/unmapRbacUserOrganizationRole.controller";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import { TRbac, TRbacDatas } from "@/modules/shared/entities/models/admin/rbac";
import { MapOrUnMapRbacUserOrgRoleValidationSchema } from "@/modules/shared/schemas/admin/rbacValidationSchema";
import { revalidatePath } from "next/cache";
import { ZSAError, createServerAction } from "zsa";

export const getRbacDatas = createServerAction().handler(async () => {
  let rbacDatas: TRbacDatas;

  try {
    rbacDatas = await getRbacDatasController();
  } catch (err) {
    if (err instanceof InputParseError) {
      throw new ZSAError("INPUT_PARSE_ERROR", err.message);
    }

    if (err instanceof OperationError) {
      console.log(err);
      throw new ZSAError("ERROR", "Failed to assign the role to the user.");
    }

    throw new ZSAError("ERROR", err);
  }

  return rbacDatas;
});

export const mapRbacUserOrganizationRole = createServerAction()
  .input(MapOrUnMapRbacUserOrgRoleValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let rbacData: TRbac;

    try {
      rbacData = await mapRbacUserOrganizationRoleController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to assign the role to the user.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/rbac");
    return rbacData;
  });

export const unmapRbacUserOrganizationRole = createServerAction()
  .input(MapOrUnMapRbacUserOrgRoleValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let rbacData: TRbac;

    try {
      rbacData = await unmapRbacUserOrganizationRoleController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to assign the role to the user.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/rbac");
    return rbacData;
  });
