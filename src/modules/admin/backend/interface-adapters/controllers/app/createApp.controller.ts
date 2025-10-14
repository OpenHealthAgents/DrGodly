import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { App, CreateAppSchema } from "../../../entities/models/app";
import { createAppUseCase } from "../../../application/useCases/app/createApp.useCase";

function presenter(app: App) {
  return app;
}

export type CreateAppControllerOutputType = ReturnType<typeof presenter>;

export async function createAppController(
  input: any
): Promise<CreateAppControllerOutputType> {
  // TODO validate input, orchestrate use-cases
  const { data, error: inputParseError } = CreateAppSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const app = await createAppUseCase(data);
  return presenter(app);
}
