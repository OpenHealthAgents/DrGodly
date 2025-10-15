import { NextResponse } from "next/server";
import { auth } from "@/modules/auth/betterauth/auth";

export async function GET() {
  const data = await auth.api.signInWithOAuth2({
    body: {
      providerId: "keycloak",
      callbackURL: "http://localhost:3000/bezs",
    },
  });

  // Redirect to Keycloak
  NextResponse.redirect(data.url);
}
