"use client";

import { authClient } from "./betterauth/auth-client";

export async function checkAuthProvider() {
  const mode =
    (process.env.NEXT_PUBLIC_AUTH_PROVIDER as "better-auth" | "keycloak") ||
    "better-auth";

  if (mode === "keycloak") {
    console.log(mode);

    // const data = await auth.api.signInWithOAuth2({
    //   body: {
    //     providerId: "keycloak",
    //     callbackURL: "http://localhost:3000/bezs",
    //   },
    // });

    // console.log(data);

    // if (data?.redirect) {
    //   return data.url;
    // }

    await authClient.signIn.oauth2({
      providerId: "keycloak",
      callbackURL: "http://localhost:3000/bezs",
    });

    return null;
  }

  return null;
}
