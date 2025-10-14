import { getAuthInjection } from "../../../di/container";
import { TSuccessRes } from "../../../entities/models/auth";

export async function signOutController(): Promise<TSuccessRes> {
  const authenticationService = getAuthInjection("IAuthenticationService");

  const data = await authenticationService.signOut();

  return data;
}
