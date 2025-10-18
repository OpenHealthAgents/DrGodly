import { injectable } from "inversify";
import { IKeycloakAuthenticationService } from "../../application/services/authenticationService.interface";
import { auth } from "@/modules/auth/betterauth/auth";
import { UnauthenticatedError } from "@/modules/shared/entities/errors/authError";
import {
  TEmailAuthRes,
  TResetPassword,
  TSignInWithEmail,
  TSignInWithUsername,
  TSignUp,
  T2Fa,
  TUpdatePassword,
  TUsernameAuthRes,
  TSignInKeycloak,
  TSignIn,
  TSignOutKeycloak,
  TSignInKeycloakRes,
} from "../../entities/models/auth";
import { headers, cookies } from "next/headers";
import axios, { AxiosError } from "axios";

@injectable()
export class KeyCloakAuthenticationService
  implements IKeycloakAuthenticationService
{
  private _providers = ["github", "google"];

  constructor() {}

  async signIn({
    usernameorEmail,
    password,
  }: TSignIn): Promise<TSignInKeycloak> {
    const cookieStore = await cookies();

    try {
      const res = await axios.post<TSignInKeycloakRes>(
        "http://localhost:3000/api/auth/keycloakProvider/signin",
        {
          usernameorEmail,
          password,
          callbackURL: "/bezs",
        }
      );

      /*
      // not working
      const setCookieHeader = res.headers["set-cookie"];

      if (setCookieHeader) {
        setCookieHeader.forEach((cookieString) => {
          // Parse cookie attributes
          const [cookiePair, ...attributes] = cookieString.split("; ");
          const [name, value] = cookiePair.split("=");

          // Default attributes
          let maxAge: number | undefined;
          let path = "/";
          let httpOnly = false;
          let sameSite: "lax" | "strict" | "none" = "lax";
          let secure = process.env.NODE_ENV === "production";

          // Parse attributes
          attributes.forEach((attr) => {
            const [key, val] = attr.split("=");
            if (key.toLowerCase() === "max-age") {
              maxAge = parseInt(val, 10);
            } else if (key.toLowerCase() === "path") {
              path = val;
            } else if (key.toLowerCase() === "httponly") {
              httpOnly = true;
            } else if (key.toLowerCase() === "samesite") {
              sameSite = val.toLowerCase() as "lax" | "strict" | "none";
            } else if (key.toLowerCase() === "secure") {
              secure = true;
            }
          });

          // Set the cookie in the Next.js cookie store
          cookieStore.set({
            name,
            value,
            maxAge: 604800,
            path,
            httpOnly,
            sameSite,
            secure,
          });
        });
      }
        */

      return {
        url: res.data.callbackURL,
        redirect: res.data.redirect,
        success: res.data.success,
        user: res.data.user,
      };
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        throw new UnauthenticatedError(
          error.response?.data.message || "Unable to login",
          { cause: error }
        );
      }

      throw new UnauthenticatedError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async signUp({
    email,
    name,
    password,
    username,
  }: TSignUp): Promise<TSignInKeycloak> {
    const nameArr = name.trim().split(/\s+/);
    let firstName: string = "";
    let lastName: string | undefined = undefined;
    if (nameArr.length > 1) {
      lastName = nameArr.pop();
    }
    firstName = nameArr.join(" ");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/keycloakProvider/signup",
        {
          username,
          password,
          email,
          firstName,
          lastName,
          callbackURL: "/bezs",
        }
      );

      return {
        url: res.data.redirectURL,
        redirect: res.data.redirect,
        success: res.data.success,
        user: res.data.user,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new UnauthenticatedError(
          error.response?.data.message || "Unable to create account",
          { cause: error }
        );
      }

      throw new UnauthenticatedError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async signOut(refreshToken: string): Promise<TSignOutKeycloak> {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/keycloakProvider/logout",
        {
          refreshToken,
          callbackURL: "/",
        }
      );

      const data = res.data;

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnauthenticatedError(error.message, { cause: error });
      }

      throw new UnauthenticatedError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async resetPassword({ newPassword, token }: TResetPassword): Promise<void> {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword,
          token,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnauthenticatedError(error.message, { cause: error });
      }

      throw new UnauthenticatedError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async updatePassword({
    currentPassword,
    newPassword,
  }: TUpdatePassword): Promise<void> {
    try {
      await auth.api.changePassword({
        body: {
          currentPassword,
          newPassword,
          revokeOtherSessions: true,
        },
        headers: await headers(),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnauthenticatedError(error.message, { cause: error });
      }

      throw new UnauthenticatedError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async send2FaOTP(): Promise<T2Fa> {
    try {
      const data = await auth.api.sendTwoFactorOTP({
        body: {
          trustDevice: true,
        },
        headers: await headers(),
      });
      return data;
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        throw new UnauthenticatedError(error.message, { cause: error });
      }

      throw new UnauthenticatedError("An unexpected erorr occurred", {
        cause: error,
      });
    }
  }

  async requestPasswordReset(data: TResetPassword): Promise<void> {}
}
