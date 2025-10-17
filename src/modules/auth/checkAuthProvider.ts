import { redirect } from "next/navigation";
import { auth } from "./betterauth/auth";

export async function checkAuthProvider() {
  const mode =
    (process.env.AUTH_PROVIDER as "better-auth" | "keycloak") || "better-auth";

  if (mode === "keycloak") {
    console.log(mode);

    const data = await auth.api.signInWithOAuth2({
      body: {
        providerId: "keycloak",
        callbackURL: "http://localhost:3000/bezs",
      },
    });

    console.log(data);
    redirect(data.url);
  }

  return null;
}
