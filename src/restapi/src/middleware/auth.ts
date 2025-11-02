import { Context, Next } from "hono";
import { validateKeycloakToken } from "../utils/keycloakValidator";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await validateKeycloakToken(token);

    // Attach decoded payload (user info) to context
    c.set("user", payload);

    await next();
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
}
