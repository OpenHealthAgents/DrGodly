import { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint, APIError } from "better-auth/api";
import { hashPassword } from "better-auth/crypto";
import { setSessionCookie } from "better-auth/cookies";
import { TAuthTokenResponse, TUserInfo } from "./models/keycloak/keycloak";
import axios from "axios";

export const keycloakProvider = ({
  baseUrl,
  clientId,
  clientSecret,
  realm,
  autoSignIn = true,
  providerId = "keycloak",
}: {
  baseUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
  autoSignIn?: boolean;
  providerId?: string;
}): BetterAuthPlugin => {
  const issuerUrl = `${baseUrl}/realms/${realm}`;
  const adminIssuerUrl = `${baseUrl}/admin/realms/${realm}`;

  const keyclockEndpoints = {
    issuer: issuerUrl,
    authorization_endpoint: `${issuerUrl}/protocol/openid-connect/auth`,
    token_endpoint: `${issuerUrl}/protocol/openid-connect/token`,
    introspection_endpoint: `${issuerUrl}/protocol/openid-connect/token/introspect`,
    userinfo_endpoint: `${issuerUrl}/protocol/openid-connect/userinfo`,
    end_session_endpoint: `${issuerUrl}/protocol/openid-connect/logout`,
    admin_user: { endpoint: `${adminIssuerUrl}/users` },
  };

  return {
    id: "keycloakProvider",

    async init() {
      if (!baseUrl || !realm || !clientId || !clientSecret) {
        throw new APIError("BAD_REQUEST", {
          message: "Missing Keycloak configuration.",
        });
      }

      if (process.env.NODE_ENV !== "production") {
        console.log("[Keycloak Plugin] initialized for realm:", realm);
      }
    },

    endpoints: {
      signin: createAuthEndpoint(
        "/keycloakProvider/signin",
        { method: "POST" },
        async (ctx) => {
          const { username, password, rememberMe, callbackURL } =
            await ctx.body;

          if (!username || !password) {
            return ctx.error("BAD_REQUEST", { message: "Missing credentials" });
          }

          const data = new URLSearchParams({
            grant_type: "password",
            client_id: clientId,
            client_secret: clientSecret,
            username,
            password,
            scope: "openid profile email",
          });

          try {
            // Exchange credentials for token
            const tokenRes = await axios.post<TAuthTokenResponse>(
              keyclockEndpoints.token_endpoint,
              data,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            if (!tokenRes.data) {
              return ctx.json({ success: false, error: "Invalid credentials" });
            }

            const tokenData = tokenRes.data;

            // Fetch user info
            const userRes = await axios.get(
              keyclockEndpoints.userinfo_endpoint,
              {
                headers: {
                  Authorization: `Bearer ${tokenData.access_token}`,
                },
              }
            );

            if (!userRes.data) {
              return ctx.json({
                success: false,
                error: "Failed to get user info",
              });
            }

            const userData = userRes.data as TUserInfo;
            const ip =
              ctx?.request?.headers.get("x-forwarded-for") ??
              ctx?.request?.headers.get("cf-connecting-ip") ??
              null;
            const ua = ctx?.request?.headers.get("user-agent") ?? null;

            const now = Date.now();
            const defaultExpSec = 60 * 60 * 24 * 7;
            const remember = rememberMe === true;
            const expiresInSec = remember ? defaultExpSec : defaultExpSec;
            const expiresAt = new Date(now + expiresInSec * 1000);

            const existingUserData =
              await ctx.context.internalAdapter.findUserByEmail(userData.email);

            if (!existingUserData) {
              return ctx.json({
                success: false,
                error: "Failed to get user info",
              });
            }

            const user = await ctx.context.internalAdapter.updateUser(
              existingUserData.user.id,
              {
                email: userData.email,
                name: userData.name,
                emailVerified: userData.email_verified,
              },
              ctx
            );

            const existingKeycloakAccount = existingUserData.accounts.find(
              (acc) => acc.providerId === (providerId ?? "keycloak")
            );

            if (!existingKeycloakAccount) {
              return ctx.json({
                success: false,
                error: "Failed to get user account info",
              });
            }

            await ctx.context.internalAdapter.updateAccount(
              existingKeycloakAccount?.id,
              {
                providerId: providerId ?? "keycloak",
                accountId: userData.sub,
                userId: user.id,
                accessToken: tokenData.access_token,
                accessTokenExpiresAt: new Date(
                  Date.now() + tokenData.expires_in * 1000
                ),
                refreshToken: tokenData.refresh_token,
                refreshTokenExpiresAt: new Date(
                  Date.now() + tokenData.refresh_expires_in * 1000
                ),
                idToken: tokenData?.id_token,
                scope: tokenData.scope,
                password: await hashPassword(password),
              },
              ctx
            );

            const session = await ctx.context.internalAdapter.createSession(
              user.id,
              ctx,
              false,
              {
                expiresAt,
                ipAddress: ip,
                userAgent: ua,
                token: tokenData.access_token,
                userId: user.id,
              },
              false
            );

            await setSessionCookie(ctx, {
              session,
              user,
            });

            return ctx.json({ success: true, data: user, callbackURL });
          } catch (error: any) {
            const keycloakError = error?.response?.data?.error_description;
            const customError = "Failed to login";

            return ctx.json({
              success: false,
              error: keycloakError || customError,
            });
          }
        }
      ),

      signup: createAuthEndpoint(
        "/keycloakProvider/signup",
        { method: "POST" },
        async (ctx) => {
          const {
            username,
            email,
            firstName,
            lastName,
            password,
            callbackURL,
          } = ctx.body;

          if (!username || !email || !firstName || !lastName || !password) {
            return ctx.error("BAD_REQUEST", { message: "Missing credentials" });
          }

          const data = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "client_credentials",
          });

          try {
            // 1️⃣ Exchange credentials for token
            const tokenRes = await axios.post<TAuthTokenResponse>(
              keyclockEndpoints.token_endpoint,
              data,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            if (!tokenRes.data) {
              return ctx.json({
                success: false,
                error: "Failed to create user",
              });
            }

            const tokenData = tokenRes.data;

            // console.log({ tokenData });

            const newUser = {
              username,
              firstName,
              lastName,
              email,
              enabled: true,
              emailVerified: false,
              credentials: [
                {
                  temporary: false,
                  type: "password",
                  value: password,
                },
              ],
            };

            // 2️⃣ create user in keycloak via Admin api
            const createUserRes = await axios.post(
              keyclockEndpoints.admin_user.endpoint,
              newUser,
              {
                headers: {
                  Authorization: `Bearer ${tokenData.access_token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (createUserRes.status !== 201) {
              return ctx.error("BAD_REQUEST", {
                message: "Failed to create user",
              });
            }

            // console.log({ createUserRes });

            // Getting keycloak new_user id via headers
            const location = createUserRes.headers["location"];
            const keycloakUserId = location?.split("/").pop();

            // const userDetailsRes = await axios.get(
            //   `${keyclockEndpoints.admin_user.endpoint}?email=${newUser.email}`,
            //   {
            //     headers: {
            //       Authorization: `Bearer ${tokenData.access_token}`,
            //     },
            //   }
            // );

            // if (userDetailsRes.status !== 200) {
            //   ctx.json({
            //     success: false,
            //     error: "Failed to get user details",
            //   });
            // }

            // based on config args doing autosignin after user created (default true)
            if (autoSignIn) {
              const data = new URLSearchParams({
                grant_type: "password",
                client_id: clientId,
                client_secret: clientSecret,
                username,
                password,
                scope: "openid profile email",
              });

              // 3️⃣ Exchange credentials for user token (log in user)
              const tokenRes = await axios.post<TAuthTokenResponse>(
                keyclockEndpoints.token_endpoint,
                data,
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              );

              // if (!tokenRes.data) {
              //   return ctx.json({
              //     success: false,
              //     error: "Invalid credentials",
              //   });
              // }

              const tokenData = tokenRes.data;

              // 4️⃣ Fetch user info using access token
              const userRes = await axios.get(
                keyclockEndpoints.userinfo_endpoint,
                {
                  headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                  },
                }
              );

              // if (!userRes.data) {
              //   return ctx.json({
              //     success: false,
              //     error: "Failed to get user info",
              //   });
              // }

              const userData = userRes.data as TUserInfo;
              const ip =
                ctx?.request?.headers.get("x-forwarded-for") ??
                ctx?.request?.headers.get("cf-connecting-ip") ??
                null;
              const ua = ctx?.request?.headers.get("user-agent") ?? null;

              const now = Date.now();
              const defaultExpSec = 60 * 60 * 24 * 7;
              const remember = true;
              const expiresInSec = remember ? defaultExpSec : defaultExpSec;
              const expiresAt = new Date(now + expiresInSec * 1000);

              // 5️⃣ Create user in BetterAuth internal DB
              const user = await ctx.context.internalAdapter.createUser(
                {
                  email: userData.email,
                  name: userData.name,
                  emailVerified: userData.email_verified,
                },
                ctx
              );

              await ctx.context.internalAdapter.createAccount(
                {
                  providerId: providerId ?? "keycloak",
                  accountId: userData.sub ?? keycloakUserId,
                  userId: user.id,
                  accessToken: tokenData.access_token,
                  accessTokenExpiresAt: new Date(
                    Date.now() + tokenData.expires_in * 1000
                  ),
                  refreshToken: tokenData.refresh_token,
                  refreshTokenExpiresAt: new Date(
                    Date.now() + tokenData.refresh_expires_in * 1000
                  ),
                  idToken: tokenData?.id_token,
                  scope: tokenData.scope,
                  password: await hashPassword(password),
                },
                ctx
              );

              // 6️⃣ Create session in BetterAuth
              const session = await ctx.context.internalAdapter.createSession(
                user.id,
                ctx,
                false,
                {
                  expiresAt,
                  ipAddress: ip,
                  userAgent: ua,
                  token: tokenData.access_token,
                  userId: user.id,
                },
                false
              );

              await setSessionCookie(ctx, {
                session,
                user,
              });

              return ctx.json({ success: true, data: user, callbackURL });
            } else {
              // based on config args doing autosignin when it false
              // Sync with BetterAuth
              const user = await ctx.context.internalAdapter.createUser(
                {
                  email: newUser.email,
                  name: (newUser.firstName + " " + newUser.lastName).trim(),
                  emailVerified: newUser.emailVerified,
                },
                ctx
              );

              await ctx.context.internalAdapter.createAccount(
                {
                  providerId: "keycloak",
                  accountId: keycloakUserId || "dummy",
                  userId: user.id,
                  password: password ? await hashPassword(password) : null,
                },
                ctx
              );
              return ctx.json({ success: true });
            }
          } catch (error: any) {
            console.log({ error: error?.response?.data });
            const keycloakError =
              error?.response?.data?.error_description ||
              error?.response?.data?.errorMessage ||
              error?.message;
            const customError = "Failed to create user";

            return ctx.json({
              success: false,
              error: keycloakError || customError,
            });
          }
        }
      ),
    },
  };
};
