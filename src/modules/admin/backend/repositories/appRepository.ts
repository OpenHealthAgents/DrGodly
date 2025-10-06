import { prismaMain } from "@/lib/prisma";
import { IAppRepository } from ".";
import { AppDatasDTOSchema, AppDTO, AppDTOSchema } from "../dtos/app";
import { OperationError } from "../../../shared/errors/commonError";
import { AppInsert, AppUpdate } from "../types/app-types";

import { injectable } from "inversify";

@injectable()
export class AppRepository implements IAppRepository {
  constructor() {}

  async getApps() {
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
      });

      const total = await prismaMain.app.count();

      const data = AppDatasDTOSchema.parse({
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

  async getAppById(appId: string): Promise<AppDTO> {
    try {
      const data = await prismaMain.app.findUnique({
        where: {
          id: appId,
        },
      });

      return AppDTOSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async createApp(app: AppInsert) {
    try {
      const data = await prismaMain.app.create({
        data: {
          ...app,
        },
      });

      return AppDTOSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async updateApp(app: AppUpdate): Promise<AppDTO> {
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

      return AppDTOSchema.parse(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async deleteApp(appId: string): Promise<AppDTO> {
    try {
      const data = await prismaMain.app.delete({
        where: {
          id: appId,
        },
      });

      return AppDTOSchema.parse(data);
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
