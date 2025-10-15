import z from "zod";

export const SignUpSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export type TSignUp = z.infer<typeof SignUpSchema>;

export const SignInWithEmailSchema = SignUpSchema.pick({
  email: true,
  password: true,
});
export type TSignInWithEmail = z.infer<typeof SignInWithEmailSchema>;

export const SignInWithUsernameSchema = SignUpSchema.pick({
  username: true,
  password: true,
});
export type TSignInWithUsername = z.infer<typeof SignInWithUsernameSchema>;

export const ResetPasswordSchema = z.object({
  newPassword: z.string(),
  token: z.string(),
});
export type TResetPassword = z.infer<typeof ResetPasswordSchema>;

export const UpdatePasswordSchema = z.object({
  newPassword: z.string(),
  currentPassword: z.string(),
});
export type TUpdatePassword = z.infer<typeof UpdatePasswordSchema>;

type TAuthEmailSuccessRes = {
  type: "success";
  redirect: boolean;
  token: string;
  url: string | undefined;
  user: {
    id: string;
    email: string;
    name: string;
    image: string | null | undefined;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};
type TAuth2FARes = {
  type: "2fa";
  twoFactorRedirect: boolean;
};
export type TEmailAuthRes = TAuthEmailSuccessRes | TAuth2FARes;

type TAuthUsernameSuccessRes = {
  type: "success";
  redirect: boolean;
  token: string;
  url: string | undefined;
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    username: string;
    displayUsername: string;
    name: string;
    image: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
  };
};
export type TUsernameAuthRes =
  | TAuthUsernameSuccessRes
  | TAuth2FARes
  | undefined;

export type T2Fa = {
  status: boolean;
};

export type TSuccessRes = {
  success: boolean;
};

// Keycloak

export type TSignInKeycloak = {
  url: string;
  redirect: boolean;
};
