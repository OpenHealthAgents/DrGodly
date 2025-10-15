"use server";

import z from "zod";
import { createServerAction, ZSAError } from "zsa";
import { signInWithEmailController } from "../../backend/interface-adapters/controllers/auth/signInWithEmail.controller";
import { InputParseError } from "@/modules/shared/entities/errors/commonError";
import { AuthenticationError } from "@/modules/shared/entities/errors/authError";
import { redirect } from "next/navigation";
import { send2FaOTPController } from "../../backend/interface-adapters/controllers/auth/send2FaOTP.controller";
import { signOutController } from "../../backend/interface-adapters/controllers/auth/signOut.controller";
import { signInWithUsernameController } from "../../backend/interface-adapters/controllers/auth/signInWithUsername.controller";
import { signInWithKeycloakController } from "../../backend/interface-adapters/controllers/auth/signInWithKeycloak.controller";

const signInWithEmailSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must have atleast two characters")
    .max(16, "Password must have atmost 16 characters"),
});

const signInWithUsernameSchema = z.object({
  username: z.string(),
  password: z
    .string()
    .min(8, "Password must have atleast two characters")
    .max(16, "Password must have atmost 16 characters"),
});

export const signInWithEmail = createServerAction()
  .input(signInWithEmailSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let redirectUrl: string | null = null;

    try {
      const data = await signInWithEmailController(input);
      if (data.type === "2fa" && data.twoFactorRedirect) {
        return {
          twoFa: true,
          redirectUrl: "/2fa-verification",
        };
      }

      if (data.type === "success" && data.redirect && data.url) {
        redirectUrl = data.url;
      }
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", "Invalid input");
      }

      if (err instanceof AuthenticationError) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    if (redirectUrl) {
      redirect(redirectUrl);
    }
  });

export const signInWithUsername = createServerAction()
  .input(signInWithUsernameSchema, { skipInputParsing: true })
  .handler(async ({ input }) => {
    let redirectUrl: string | null = null;

    try {
      const data = await signInWithUsernameController(input);
      if (data?.type === "2fa" && data?.twoFactorRedirect) {
        return {
          twoFa: true,
          redirectUrl: "/2fa-verification",
        };
      }

      if (data?.type === "success" && data.redirect && data.url) {
        redirectUrl = data.url;
      }
    } catch (err) {
      if (err instanceof InputParseError) {
        throw new ZSAError("INPUT_PARSE_ERROR", "Invalid input");
      }

      if (err instanceof AuthenticationError) {
        throw new ZSAError("ERROR", err.message);
      }

      throw new ZSAError("ERROR", err);
    }

    if (redirectUrl) {
      redirect(redirectUrl);
    }
  });

export const signOut = createServerAction().handler(async () => {
  let isSuccess: boolean = false;

  try {
    const data = await signOutController();
    if (data.success) {
      isSuccess = true;
    }
  } catch (err) {
    if (err instanceof InputParseError) {
      throw new ZSAError("INPUT_PARSE_ERROR", "Invalid input");
    }

    if (err instanceof AuthenticationError) {
      throw new ZSAError("ERROR", err.message);
    }

    throw new ZSAError("ERROR", err);
  }

  if (isSuccess) {
    redirect("/");
  }
});

export const sendTwoFa = createServerAction().handler(async () => {
  try {
    await send2FaOTPController();
  } catch (err) {
    if (err instanceof InputParseError) {
      throw new ZSAError("INPUT_PARSE_ERROR", "Invalid input");
    }

    if (err instanceof AuthenticationError) {
      throw new ZSAError("ERROR", err.message);
    }

    throw new ZSAError("ERROR", err);
  }
});

export const signInWithKeycloak = createServerAction().handler(async () => {
  try {
    const data = await signInWithKeycloakController();

    return data;
  } catch (err) {
    if (err instanceof InputParseError) {
      throw new ZSAError("INPUT_PARSE_ERROR", "Invalid input");
    }

    if (err instanceof AuthenticationError) {
      throw new ZSAError("ERROR", err.message);
    }

    throw new ZSAError("ERROR", err);
  }
});
