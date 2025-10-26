import { injectable } from "inversify";
import { IOrganizationRepository } from "../../application/repositories/organizationRepository.interface";
import {
  OrganizationSchema,
  OrganizationsDataSchema,
  TCreateOrganization,
  TOrganization,
  TOrganizationsData,
  TUpdateOrganization,
} from "@/modules/shared/entities/models/admin/organization";
import { OperationError } from "@/modules/shared/entities/errors/commonError";
import { prismaMain } from "@/modules/server/prisma/prisma";

@injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor() {}

  async getOrganizations(): Promise<TOrganizationsData> {
    try {
      const organizationsData = await prismaMain.organization.findMany({
        include: {
          _count: {
            select: {
              members: true,
              appOrganization: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      const total = await prismaMain.organization.count();

      const data = OrganizationsDataSchema.parse({ organizationsData, total });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async getOrganizationByUniqueFields(
    name: string,
    slug: string
  ): Promise<TOrganization | null> {
    try {
      const data = await prismaMain.organization.findFirst({
        where: {
          OR: [{ name }, { slug }],
        },
      });

      return OrganizationSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createOrganization(
    createData: TCreateOrganization
  ): Promise<TOrganization> {
    try {
      const data = await prismaMain.organization.create({
        data: {
          ...createData,
        },
      });

      return OrganizationSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async updateOrganization(
    updateData: TUpdateOrganization
  ): Promise<TOrganization> {
    const { id, ...updateValues } = updateData;

    try {
      const data = await prismaMain.organization.update({
        where: {
          id,
        },
        data: {
          ...updateValues,
        },
      });

      return OrganizationSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async deleteOrganization(id: string): Promise<TOrganization> {
    try {
      const data = await prismaMain.organization.delete({
        where: {
          id,
        },
      });

      return OrganizationSchema.parse(data);
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
