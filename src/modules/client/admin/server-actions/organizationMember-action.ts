"use server";

import {
  addMemberToOrganizationController,
  getOrganizationMembersController,
  removeMemberFromOrganizationController,
} from "@/modules/server/admin/interface-adapters/controllers/organizationMember";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  TOrganizationMemberAndUser,
  TOrganizationMembersAndUsers,
} from "@/modules/shared/entities/models/admin/organizationMember";
import {
  AddMemberToOrganizationValidationSchema,
  GetOrganizationMembersValidationSchema,
  RemoveMemberFromOrganizationValidationSchema,
} from "@/modules/shared/schemas/admin/organizationMemberValidationSchema";
import { revalidatePath } from "next/cache";
import { ZSAError, createServerAction } from "zsa";

export const getOrganizationMembersData = createServerAction()
  .input(GetOrganizationMembersValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organizationMembersDatas: TOrganizationMembersAndUsers;

    try {
      organizationMembersDatas = await getOrganizationMembersController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to get org members.");
      }

      throw new ZSAError("ERROR", err);
    }

    return organizationMembersDatas;
  });

export const addMemberToOrganization = createServerAction()
  .input(AddMemberToOrganizationValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let organizationMemberData: TOrganizationMemberAndUser;

    try {
      organizationMemberData = await addMemberToOrganizationController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to add org member.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-organizations");
    return organizationMemberData;
  });

export const removeMemberFromOrganization = createServerAction()
  .input(RemoveMemberFromOrganizationValidationSchema, {
    skipInputParsing: true,
  })
  .handler(async ({ input }) => {
    let organizationMemberData: TOrganizationMemberAndUser;

    try {
      organizationMemberData = await removeMemberFromOrganizationController(
        input
      );
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to remove org member.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-organizations");
    return organizationMemberData;
  });
