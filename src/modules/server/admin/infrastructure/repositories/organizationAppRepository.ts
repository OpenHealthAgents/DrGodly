import { OperationError } from "@/modules/shared/entities/errors/commonError";
import { IOrganizationAppRepository } from "../../application/repositories/organizationAppRepository.interface";
import { prismaMain } from "@/modules/server/prisma/prisma";
import {
  OrganizationAppSchema,
  OrganizationAppsSchema,
  TOrganizationApp,
  TOrganizationApps,
} from "@/modules/shared/entities/models/admin/organizationApp";
import { injectable } from "inversify";

@injectable()
export class OrganizationAppRepository implements IOrganizationAppRepository {
  constructor() {}

  async getOrganizationApps(
    organizationId: string
  ): Promise<TOrganizationApps> {
    try {
      const data = await prismaMain.appOrganization.findMany({
        where: {
          organizationId,
        },
        include: {
          app: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              type: true,
            },
          },
        },
      });

      return OrganizationAppsSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async getAppByUniqueFields(
    appId: string,
    organizationId: string
  ): Promise<TOrganizationApp | null> {
    try {
      const data = await prismaMain.appOrganization.findFirst({
        where: {
          appId,
          organizationId,
        },
        include: {
          app: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              type: true,
            },
          },
        },
      });

      return OrganizationAppSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async addAppToOrganization(
    organizationId: string,
    appId: string
  ): Promise<TOrganizationApp> {
    try {
      const data = await prismaMain.appOrganization.create({
        data: {
          organizationId,
          appId,
        },
        include: {
          app: {
            select: {
              id: true,
              name: true,
              slug: true,
              description: true,
              type: true,
            },
          },
        },
      });

      return OrganizationAppSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async removeAppToOrganization(
    organizationId: string,
    appId: string
  ): Promise<TOrganizationApp> {
    try {
      const data = await prismaMain.appOrganization.delete({
        where: {
          appId_organizationId: {
            appId,
            organizationId,
          },
        },
      });

      return OrganizationAppSchema.parse(data);
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
