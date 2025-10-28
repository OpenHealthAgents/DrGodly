"use server";

import {
  createOrganizationController,
  deleteOrganizationController,
  getOrganizationsController,
  updateOrganizationController,
} from "@/modules/server/admin/interface-adapters/controllers/organization";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  TOrganization,
  TOrganizationsData,
} from "@/modules/shared/entities/models/admin/organization";
import {
  CreateOrganizationFormSchema,
  DeleteOrganizationFormSchema,
  UpdateOrganizationFormSchema,
} from "@/modules/shared/schemas/admin/organizationValidationSchema";
import { revalidatePath } from "next/cache";
import { ZSAError, createServerAction } from "zsa";

export const getAllOrganizationsData = createServerAction().handler(
  async () => {
    let organizationDatas: TOrganizationsData;

    try {
      organizationDatas = await getOrganizationsController();
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to get organizations.");
      }

      throw new ZSAError("ERROR", err);
    }

    return organizationDatas;
  }
);

export const createOrganization = createServerAction()
  .input(CreateOrganizationFormSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organization: TOrganization;

    try {
      organization = await createOrganizationController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to create organization.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-organizations");
    return organization;
  });

export const editOrganization = createServerAction()
  .input(UpdateOrganizationFormSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organization: TOrganization;

    try {
      organization = await updateOrganizationController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to edit organization.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-organizations");
    return organization;
  });

export const deleteOrganization = createServerAction()
  .input(DeleteOrganizationFormSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organization: TOrganization;

    try {
      organization = await deleteOrganizationController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to delete organization.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-organizations");
    return organization;
  });
