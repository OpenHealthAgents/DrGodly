import { prismaMain } from "@/modules/server/prisma/prisma";
import { OperationError } from "@/modules/shared/entities/errors/commonError";
import { IUserRepository } from "../../application/repositories/userRepository.interface";
import { injectable } from "inversify";
import {
  TUser,
  TUserUniqueFields,
  UserSchema,
} from "../../entities/models/user";

@injectable()
export class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<TUser | null> {
    try {
      const user = await prismaMain.user.findUnique({
        where: { id },
      });
      return UserSchema.parse(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }

  async getUserByUniqueFields(
    fields: TUserUniqueFields
  ): Promise<TUser | null> {
    const { email, username } = fields;

    try {
      const user = await prismaMain.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });
      return UserSchema.parse(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }
}
