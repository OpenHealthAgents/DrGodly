import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { getAppMenuItemsUseCases } from "@/modules/server/admin/application/useCases/appMenuItem/getAppMenuItems.useCase";
import { TAppMenuItemsData } from "@/modules/shared/entities/models/admin/appMenuItem";
import { AppIdSchema } from "@/modules/shared/entities/models/admin/appMenuItem";

function presenter(appMenuItem: TAppMenuItemsData) {
  return appMenuItem;
}

export type getAppMenuItemsControllerOutputType = ReturnType<typeof presenter>;

export async function getAppMenuItemsController(
  input: any
): Promise<getAppMenuItemsControllerOutputType> {
  const { data, error: inputParseError } = AppIdSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const appMenuItems = await getAppMenuItemsUseCases(data.appId);
  return presenter(appMenuItems);
}
