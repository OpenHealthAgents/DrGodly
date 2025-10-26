import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { TAppMenuItem } from "@/modules/shared/entities/models/admin/appMenuItem";
import { createAppMenuItemUseCase } from "../../../application/useCases/appMenuItem/createAppMenuItem.useCase";
import { CreateAppMenuItemValidationSchema } from "@/modules/shared/schemas/admin/appMenuItemValidationSchema";

function presenter(appMenuItem: TAppMenuItem) {
  return appMenuItem;
}

export type TCreateAppMenuItemController = ReturnType<typeof presenter>;

export async function createAppMenuItemController(
  input: any
): Promise<TCreateAppMenuItemController> {
  const { data, error: inputParseError } =
    CreateAppMenuItemValidationSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const appMenuItem = await createAppMenuItemUseCase(data);
  return presenter(appMenuItem);
}
