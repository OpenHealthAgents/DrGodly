import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { App, UpdateAppSchema } from "../../../entities/models/app";
import { updateAppUseCase } from "../../../application/useCases/app/updateAppUseCase";

function presenter(app: App) {
  return app;
}

export type UpdateAppControllerOutputType = ReturnType<typeof presenter>;

export async function updateAppController(
  input: any
): Promise<UpdateAppControllerOutputType> {
  // TODO validate input, orchestrate use-cases
  const { data, error: inputParseError } = UpdateAppSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const app = await updateAppUseCase(data);
  return presenter(app);
}
