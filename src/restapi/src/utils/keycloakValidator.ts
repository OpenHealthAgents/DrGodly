import { createRemoteJWKSet, jwtVerify } from "jose";

const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER_URL;
const JWKS_URL = `${KEYCLOAK_ISSUER}/protocol/openid-connect/certs`;
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

export async function validateKeycloakToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: KEYCLOAK_ISSUER,
      audience: process.env.KEYCLOAK_AUDIENCE,
    });

    return payload;
  } catch (err) {
    console.error("❌ Token verification failed:", err);
    throw new Error("Invalid or expired token");
  }
}
