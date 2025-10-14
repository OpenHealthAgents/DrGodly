import {
  TEmailAuthRes,
  TResetPassword,
  TSignInWithEmail,
  TSignInWithUsername,
  TSignUp,
  T2Fa,
  TUpdatePassword,
  TSuccessRes,
  TUsernameAuthRes,
} from "../../entities/models/auth";

export interface IAuthenticationService {
  signInWithProvider(provider: string): Promise<void>;
  signInWithEmail(data: TSignInWithEmail): Promise<TEmailAuthRes>;
  signInWithUsername(data: TSignInWithUsername): Promise<TUsernameAuthRes>;
  signUp(data: TSignUp): Promise<void>;
  signOut(): Promise<TSuccessRes>;
  resetPassword(data: TResetPassword): Promise<void>;
  updatePassword(data: TUpdatePassword): Promise<void>;
  send2FaOTP(): Promise<T2Fa>;
}
