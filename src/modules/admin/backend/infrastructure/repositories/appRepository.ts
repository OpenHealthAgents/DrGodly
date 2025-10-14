import { prismaMain } from "@/lib/prisma";
import { IAppRepository } from "../../application/repositories/appRepository.interface";
import { OperationError } from "@/modules/shared/entities/errors/commonError";
import {
  App,
  AppDatas,
  AppDatasSchema,
  CreateApp,
  AppSchema,
  UpdateApp,
} from "@/modules/admin/backend/entities/models/app";
import { injectable } from "inversify";

@injectable()
export class AppRepository implements IAppRepository {
  constructor() {}

  async getApps(): Promise<AppDatas> {
    try {
      const appDatas = await prismaMain.app.findMany({
        include: {
          _count: {
            select: {
              appMenuItems: true,
              appActions: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      const total = await prismaMain.app.count();

      const data = AppDatasSchema.parse({
        appDatas,
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

  async getAppById(appId: string): Promise<App> {
    try {
      const data = await prismaMain.app.findUnique({
        where: {
          id: appId,
        },
      });

      return AppSchema.parse(data);
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
    appName: string,
    appSlug: string
  ): Promise<App | null> {
    try {
      const data = await prismaMain.app.findFirst({
        where: {
          OR: [{ name: appName }, { slug: appSlug }],
        },
      });

      return AppSchema.nullable().parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createApp(app: CreateApp) {
    try {
      const data = await prismaMain.app.create({
        data: {
          ...app,
        },
      });

      return AppSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async updateApp(app: UpdateApp): Promise<App> {
    const { id, ...appDatas } = app;

    try {
      const data = await prismaMain.app.update({
        where: {
          id,
        },
        data: {
          ...appDatas,
        },
      });

      return AppSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async deleteApp(appId: string): Promise<App> {
    try {
      const data = await prismaMain.app.delete({
        where: {
          id: appId,
        },
      });

      return AppSchema.parse(data);
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
