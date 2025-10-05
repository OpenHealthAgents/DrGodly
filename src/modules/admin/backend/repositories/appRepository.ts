import { prismaMain } from "@/lib/prisma";
import { IAppRepository } from ".";
import { AppDatasDTOSchema } from "../dtos/app";
import { OperationError } from "../../../shared/errors/commonError";

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
}
