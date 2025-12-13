"use server";

import {
  createFileEntityController,
  deleteFileEntityController,
  getFileEntitiesController,
  updateFileEntityController,
  TCreateFileEntityControllerOutput,
  TDeleteFileEntityControllerOutput,
  TGetFileEntitiesControllerOutput,
  TUpdateFileEntityControllerOutput,
} from "@/modules/server/filenest/interface-adapters/controllers/fileEntity";

import {
  CreateFileEntityValidationSchema,
  DeleteFileEntityValidationSchema,
  GetFileEntitiesValidationSchema,
  UpdateFileEntityValidationSchema,
} from "@/modules/shared/schemas/filenest/adminValidationSchemas";

import { withMonitoring } from "@/modules/shared/utils/serverActionWithMonitoring";
import { createServerAction } from "zsa";

export const getFileEntities = createServerAction()
  .input(GetFileEntitiesValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TGetFileEntitiesControllerOutput>(
      "getFileEntities",
      () => getFileEntitiesController(input),
      {
        operationErrorMessage: "Failed to get File Entities.",
      }
    );
  });

export const createFileEntity = createServerAction()
  .input(CreateFileEntityValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TCreateFileEntityControllerOutput>(
      "createFileEntity",
      () => createFileEntityController(input),
      {
        url: "/bezs/filenest/admin/file-entities",
        revalidatePath: true,
        operationErrorMessage: "Failed to create File Entity.",
      }
    );
  });

export const updateFileEntity = createServerAction()
  .input(UpdateFileEntityValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TUpdateFileEntityControllerOutput>(
      "updateFileEntity",
      () => updateFileEntityController(input),
      {
        url: "/bezs/filenest/admin/file-entities",
        revalidatePath: true,
        operationErrorMessage: "Failed to update File Entity.",
      }
    );
  });

export const deleteFileEntity = createServerAction()
  .input(DeleteFileEntityValidationSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    return await withMonitoring<TDeleteFileEntityControllerOutput>(
      "deleteFileEntity",
      () => deleteFileEntityController(input),
      {
        url: "/bezs/filenest/admin/file-entities",
        revalidatePath: true,
        operationErrorMessage: "Failed to delete File Entity.",
      }
    );
  });
