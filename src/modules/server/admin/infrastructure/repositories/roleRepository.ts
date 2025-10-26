import {
  RoleSchema,
  RolesDataSchema,
  TCreateRole,
  TRole,
  TRolesData,
  TUpdateRole,
} from "@/modules/shared/entities/models/admin/role";
import { IRoleRepository } from "../../application/repositories/roleRepository.interface";
import { OperationError } from "@/modules/shared/entities/errors/commonError";
import { prismaMain } from "@/modules/server/prisma/prisma";
import { injectable } from "inversify";

@injectable()
export class RoleRepository implements IRoleRepository {
  constructor() {}

  async getRoles(): Promise<TRolesData> {
    try {
      const data = await prismaMain.role.findMany({
        orderBy: {
          updatedAt: "desc",
        },
      });

      return RolesDataSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async getRoleByUniqueField(roleName: string): Promise<TRole | null> {
    try {
      const data = await prismaMain.role.findUnique({
        where: {
          name: roleName,
        },
      });

      return RoleSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createRole(createData: TCreateRole): Promise<TRole> {
    try {
      const data = await prismaMain.role.create({
        data: {
          ...createData,
        },
      });

      return RoleSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async updateRole(updateData: TUpdateRole): Promise<TRole> {
    const { id, ...updateValues } = updateData;

    try {
      const data = await prismaMain.role.update({
        where: {
          id,
        },
        data: {
          ...updateValues,
        },
      });

      return RoleSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async deleteRole(roleId: string): Promise<TRole> {
    try {
      const data = await prismaMain.role.delete({
        where: {
          id: roleId,
        },
      });

      return RoleSchema.parse(data);
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
