import { OperationError } from "@/modules/shared/entities/errors/commonError";
import { IAppMenuItemRepository } from "../../application/repositories/appMenuItemRepository.interface";
import { prismaMain } from "@/modules/server/prisma/prisma";
import {
  AppMenuItemsDataSchema,
  AppMenuItemSchema,
  TAppMenuItem,
  TAppMenuItemsData,
  TCreateAppMenuItem,
  TUpdateAppMenuItem,
  TDeleteAppMenuItem,
} from "@/modules/shared/entities/models/admin/appMenuItem";
import { injectable } from "inversify";

@injectable()
export class AppMenuItemRepository implements IAppMenuItemRepository {
  constructor() {}

  async getAppMenuItems(appId: string): Promise<TAppMenuItemsData> {
    try {
      const appMenuItems = await prismaMain.appMenuItem.findMany({
        where: {
          appId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      const total = await prismaMain.appMenuItem.count({
        where: {
          appId,
        },
      });

      const data = AppMenuItemsDataSchema.parse({
        appMenuItemsData: appMenuItems,
        total,
      });

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

  async createAppMenuItem(
    createData: TCreateAppMenuItem
  ): Promise<TAppMenuItem> {
    try {
      const data = await prismaMain.appMenuItem.create({
        data: {
          ...createData,
        },
      });

      return AppMenuItemSchema.parse(data);
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
    appMenuItemName: string,
    appMenuItemSlug: string
  ): Promise<TAppMenuItem | null> {
    try {
      const data = await prismaMain.appMenuItem.findFirst({
        where: {
          appId,
          OR: [{ name: appMenuItemName }, { slug: appMenuItemSlug }],
        },
      });

      return AppMenuItemSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async updateAppMenuItem(
    updateData: TUpdateAppMenuItem
  ): Promise<TAppMenuItem> {
    const { appId, id, ...updateValues } = updateData;

    try {
      const data = await prismaMain.appMenuItem.update({
        where: {
          id,
          appId,
        },
        data: {
          ...updateValues,
        },
      });

      return AppMenuItemSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async deleteAppMenuItem(
    deleteData: TDeleteAppMenuItem
  ): Promise<TAppMenuItem> {
    try {
      const data = await prismaMain.appMenuItem.delete({
        where: {
          appId: deleteData.appId,
          id: deleteData.id,
        },
      });

      return AppMenuItemSchema.parse(data);
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
