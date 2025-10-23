import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { getAuthInjection } from "../../../di/container";
import {
  SignOutWithKeycloakGenericOAuthSchema,
  TSuccessRes,
} from "../../../entities/models/auth";
import { getAuthProvider } from "@/modules/server/auth/utils/getAuthProvider";

export async function signOutController(
  refreshToken?: string
): Promise<TSuccessRes> {
  const betterAuthAuthenticationService = getAuthInjection(
    "IBetterauthAuthenticationService"
  );
  const keyCloakAuthenticationService = getAuthInjection(
    "IKeycloakAuthenticationService"
  );

  const { isKeycloak } = getAuthProvider();

  let data;

  if (isKeycloak) {
    const {
      success,
      data: refreshTokenData,
      error,
    } = SignOutWithKeycloakGenericOAuthSchema.safeParse({ refreshToken });

    if (error && !success) {
      throw new InputParseError(error.name, { cause: error });
    }

    const [keycloakRes, betterauthRes] = await Promise.all([
      await keyCloakAuthenticationService.signOutWithKeycloakGenericOAuth(
        refreshTokenData.refreshToken
      ),
      await betterAuthAuthenticationService.signOut(),
    ]);

    if (
      !keycloakRes ||
      !betterauthRes ||
      !keycloakRes.success ||
      !betterauthRes.success
    ) {
      throw new Error("Failed to logout, please try again!");
    }

    data = keycloakRes || betterauthRes;
  } else {
    data = await betterAuthAuthenticationService.signOut();
  }

  return data;
}
