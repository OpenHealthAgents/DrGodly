import {
  RoleAppMenuItemSchema,
  RoleAppMenuItemsDataSchema,
  TGetRoleAppMenuItemsInput,
  TMapOrUnmapAppMenuItemsToRoleInput,
  TRoleAppMenuItem,
  TRoleAppMenuItemsData,
} from "../../../../../modules/shared/entities/models/admin/roleAppMenuItem";
import { IRoleAppMenuItemRepository } from "../../application/repositories/roleAppMenuItemRepository.interface";
import { OperationError } from "../../../../../modules/shared/entities/errors/commonError";
import { prismaMain } from "../../../prisma/prisma";
import { injectable } from "inversify";

@injectable()
export class RoleAppMenuItemRepository implements IRoleAppMenuItemRepository {
  constructor() {}

  async getRoleAppMenuItems(
    input: TGetRoleAppMenuItemsInput
  ): Promise<TRoleAppMenuItemsData> {
    try {
      const data = await prismaMain.menuPermission.findMany({
        where: {
          ...input,
        },
      });

      return RoleAppMenuItemsDataSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async mapAppMenuItemsToRole(
    input: TMapOrUnmapAppMenuItemsToRoleInput
  ): Promise<TRoleAppMenuItem> {
    try {
      const data = await prismaMain.menuPermission.create({
        data: {
          ...input,
        },
      });

      return RoleAppMenuItemSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async unmapAppMenuItemsToRole(
    input: TMapOrUnmapAppMenuItemsToRoleInput
  ): Promise<TRoleAppMenuItem> {
    try {
      const data = await prismaMain.menuPermission.delete({
        where: {
          roleId_appId_appMenuItemId: {
            ...input,
          },
        },
      });

      return RoleAppMenuItemSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }
}
