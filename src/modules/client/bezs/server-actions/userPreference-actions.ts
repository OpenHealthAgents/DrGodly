"use server";

import { getUserPreferencesController } from "@/modules/server/shared/userPreferences/interface-adapters/controllers/getUserPreferences.controller";
import { updateUserPreferencesController } from "@/modules/server/shared/userPreferences/interface-adapters/controllers/updateUserPreferences.controller";
import {
  InputParseError,
  OperationError,
} from "@/modules/shared/entities/errors/commonError";
import {
  TUserPreference,
  updateUserPreferenceSchema,
} from "@/modules/shared/entities/models/userPreferences/userPreferences";
import { getUserPreferencesValidateSchema } from "@/modules/shared/schemas/userPreferences/userPreferencesValidationSchema";
import { revalidatePath } from "next/cache";
import { ZSAError, createServerAction } from "zsa";

export const getUserPreference = createServerAction()
  .input(getUserPreferencesValidateSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let userPreference: TUserPreference | null;

    try {
      userPreference = await getUserPreferencesController(input);
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

    return userPreference;
  });

export const updateUserPreference = createServerAction()
  .input(updateUserPreferenceSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let userPreference: TUserPreference;

    try {
      userPreference = await updateUserPreferencesController(input);
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

    revalidatePath("/bezs/settings/preferences");
    return userPreference;
  });
