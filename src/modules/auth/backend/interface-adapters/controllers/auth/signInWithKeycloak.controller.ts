import { TSignInKeycloak } from "../../../entities/models/auth";
import { getAuthInjection } from "../../../di/container";

function presenter(data: TSignInKeycloak) {
  return data;
}

export type TSignInWithKeycloakControllerOutput = ReturnType<typeof presenter>;

export async function signInWithKeycloakController(): Promise<TSignInWithKeycloakControllerOutput> {
  const authenticationService = getAuthInjection(
    "IKeycloakAuthenticationService"
  );

  const data = await authenticationService.signIn();

  return presenter(data);
}
