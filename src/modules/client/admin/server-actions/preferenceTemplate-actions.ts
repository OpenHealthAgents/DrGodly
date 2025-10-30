"use server";

import {
  createPreferenceTemplateController,
  getPreferenceTemplatesController,
} from "@/modules/server/admin/interface-adapters/controllers/preferenceTemplate";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  TPreferenceTemplate,
  TPreferenceTemplates,
} from "@/modules/shared/entities/models/admin/preferenceTemplete";
import { PreferenceTemplateValidationSchema } from "@/modules/shared/schemas/admin/preferenceTemplateValidationSchema";
import { revalidatePath } from "next/cache";
import { ZSAError, createServerAction } from "zsa";

export const getAllPreferenceTemplates = createServerAction().handler(
  async () => {
    let preferenceTemplates: TPreferenceTemplates;

    try {
      preferenceTemplates = await getPreferenceTemplatesController();
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to get preference templates.");
      }

      throw new ZSAError("ERROR", err);
    }

    return preferenceTemplates;
  }
);

export const createPreferenceTemplate = createServerAction()
  .input(PreferenceTemplateValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let preferenceTemplate: TPreferenceTemplate;

    try {
      preferenceTemplate = await createPreferenceTemplateController(input);
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", err.message);
      }

      if (err instanceof OperationError) {
        console.log(err);
        throw new ZSAError("ERROR", "Failed to create preference template.");
      }

      throw new ZSAError("ERROR", err);
    }

    revalidatePath("/bezs/admin/manage-preferences");
    return preferenceTemplate;
  });
