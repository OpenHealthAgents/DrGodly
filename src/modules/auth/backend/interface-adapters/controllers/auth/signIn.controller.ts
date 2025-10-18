import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { SignInSchema, TSignIn } from "../../../entities/models/auth";
import { getAuthInjection } from "../../../di/container";
import { getAuthProvider } from "@/modules/auth/utils/getAuthProvider";
import { auth } from "@/modules/auth/betterauth/auth";

export async function signInController(input: TSignIn) {
  const betterAuthAuthenticationService = getAuthInjection(
    "IBetterauthAuthenticationService"
  );
  const keycloakAuthenticationService = getAuthInjection(
    "IKeycloakAuthenticationService"
  );

  const parsed = SignInSchema.safeParse(input);

  if (parsed.error && !parsed.success) {
    throw new InputParseError(parsed.error.name, { cause: parsed.error });
  }

  const { isKeycloak } = getAuthProvider();

  if (isKeycloak) {
    const data = await keycloakAuthenticationService.signIn({
      ...parsed.data,
    });

    return data;
  } else {
    const isEmailLogin = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      parsed.data.usernameorEmail
    );

    if (isEmailLogin) {
      const data = await betterAuthAuthenticationService.signInWithEmail({
        email: parsed.data.usernameorEmail,
        password: parsed.data.password,
      });
      return data;
    } else {
      const data = await betterAuthAuthenticationService.signInWithUsername({
        username: parsed.data.usernameorEmail,
        password: parsed.data.password,
      });
      return data;
    }
  }
}
