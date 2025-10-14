import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { App, DeleteAppSchema } from "../../../entities/models/app";
import { deleteAppUseCase } from "../../../application/useCases/app/deleteApp.useCase";

function presenter(app: App) {
  return app;
}

export type DeleteAppControllerOutputType = ReturnType<typeof presenter>;

export async function deleteAppController(
  input: any
): Promise<DeleteAppControllerOutputType> {
  // TODO validate input, orchestrate use-cases
  const { data, error: inputParseError } = DeleteAppSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const app = await deleteAppUseCase(data.id);
  return presenter(app);
}
