import {
  PreferenceTemplateSchema,
  PreferenceTemplatesSchema,
  TCreatePreferenceTemplate,
  TPreferenceTemplate,
  TPreferenceTemplates,
} from "../../../../../modules/shared/entities/models/admin/preferenceTemplete";
import { IPreferenceTempleteRepository } from "../../application/repositories/preferenceTemplateRepository.interface";
import { prismaMain } from "../../../prisma/prisma";
import { OperationError } from "../../../../../modules/shared/entities/errors/commonError";
import { injectable } from "inversify";

@injectable()
export class PreferenceTemplateRepository
  implements IPreferenceTempleteRepository
{
  async getPreferenceTemplates(): Promise<TPreferenceTemplates> {
    try {
      const preferenceTemplates =
        await prismaMain.preferenceTemplate.findMany();

      const total = await prismaMain.preferenceTemplate.count();
      return PreferenceTemplatesSchema.parse({
        preferenceTemplates,
        total,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }

  async getPreferenceByScopeDefaultField(): Promise<TPreferenceTemplate | null> {
    try {
      const preferenceTemplate = await prismaMain.preferenceTemplate.findFirst({
        where: {
          scope: "GLOBAL",
        },
      });

      if (!preferenceTemplate) return null;

      return PreferenceTemplateSchema.parse(preferenceTemplate);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }

  async createPreferenceTemplate(
    createData: TCreatePreferenceTemplate
  ): Promise<TPreferenceTemplate> {
    try {
      const createUserPreferenceTemplateData =
        await prismaMain.preferenceTemplate.create({
          data: {
            ...createData,
          },
        });

      return PreferenceTemplateSchema.parse(createUserPreferenceTemplateData);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }

  async updatePreferenceTemplate(
    fields: TPreferenceTemplate
  ): Promise<TPreferenceTemplate> {
    const { id, ...datas } = fields;

    try {
      const updatedPreferenceTemplateData =
        await prismaMain.preferenceTemplate.update({
          where: {
            id,
          },
          data: {
            ...datas,
          },
        });

      return PreferenceTemplateSchema.parse(updatedPreferenceTemplateData);
    } catch (error) {
      if (error instanceof Error) {
        throw new OperationError(error.message, { cause: error });
      }

      throw new OperationError("An unexpected error occurred", {
        cause: error,
      });
    }
  }

  async deletePreferenceTemplate(id: string): Promise<TPreferenceTemplate> {
    try {
      const deletedPreferenceTemplateData =
        await prismaMain.preferenceTemplate.delete({
          where: {
            id,
          },
        });

      return PreferenceTemplateSchema.parse(deletedPreferenceTemplateData);
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
