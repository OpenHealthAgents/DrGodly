import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import {
  TUsernameAuthRes,
  TSignInWithUsername,
  SignInWithUsernameSchema,
} from "../../../entities/models/auth";
import { getAuthInjection } from "../../../di/container";

function presenter(data: TUsernameAuthRes) {
  return data;
}

export type TSignInWithUsernameControllerOutput = ReturnType<typeof presenter>;

export async function signInWithUsernameController(
  input: TSignInWithUsername
): Promise<TSignInWithUsernameControllerOutput> {
  const authenticationService = getAuthInjection(
    "IBetterauthAuthenticationService"
  );
  const { data, error: inputParseError } =
    SignInWithUsernameSchema.safeParse(input);

  if (inputParseError) {
    throw new InputParseError(inputParseError.name, { cause: inputParseError });
  }

  const authData = await authenticationService.signInWithUsername(data);

  return presenter(authData);
}
