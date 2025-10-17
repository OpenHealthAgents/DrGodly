import { getAuthInjection } from "../../../di/container";
import { TSuccessRes } from "../../../entities/models/auth";

export async function signOutController(): Promise<TSuccessRes> {
  const betterAuthAuthenticationService = getAuthInjection(
    "IBetterauthAuthenticationService"
  );
  const keyCloakAuthenticationService = getAuthInjection(
    "IKeycloakAuthenticationService"
  );

  const authProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER;

  let data;

  if (authProvider === "keycloak") {
    const [keycloakRes, betterauthRes] = await Promise.all([
      await keyCloakAuthenticationService.signOut(),
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
