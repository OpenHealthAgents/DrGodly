export function getAuthProvider() {
  const mode =
    (process.env.AUTH_PROVIDER as "betterauth" | "keycloak") || "betterauth";

  const isKeycloak = mode === "keycloak";

  return {
    provider: mode,
    isKeycloak,
  };
}
