"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/modules/auth/betterauth/auth";
import { getServerSession } from "@/modules/auth/betterauth/auth-server";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
// import { headers } from "next/headers";

export default function Home() {
  // const session = await getServerSession();
  // console.log(session);

  async function signInWithKeycloakAction(
    usernameorEmail: string,
    password: string,
    callbackURL: string
  ) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/keycloakProvider/signin",
        {
          usernameorEmail,
          password,
          callbackURL,
        }
      );

      const data = res.data;

      // if (!data.success) {
      //   console.log(data.error);
      //   throw new Error(data.error);
      // }

      return data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.statusText + "!" || "Error!", {
          description: err.response?.data.message || "Unable to login.",
        });
      }
    }
  }

  async function keycloakSendVerificationEmail(
    keycloakUserId: string,
    userId: string,
    callbackURL: string
  ) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/keycloakProvider/send-verify-email",
        {
          keycloakUserId,
          userId,
          callbackURL,
        }
      );

      const data = res.data;

      // if (!data.success) {
      //   console.log(data.error);
      //   throw new Error(data.error);
      // }

      return data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.statusText + "!" || "Error!", {
          description: err.response?.data.message || "Unable to login.",
        });
      }
    }
  }

  async function signUpWithKeyCloakAction({
    username,
    email,
    firstName,
    lastName,
    password,
    callbackURL,
  }: {
    username: string;
    email: string;
    firstName: string;
    lastName?: string;
    password: string;
    callbackURL: string;
  }) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/keycloakProvider/signup",
        {
          username,
          password,
          email,
          firstName,
          lastName,
          callbackURL,
        }
      );

      const data = res.data;

      if (!data.success) {
        console.log(data.error);
        throw new Error(data.error);
      }

      console.log({ data });
      return data;
    } catch (err) {
      console.log({ err });
      console.log((err as Error).message);
    }
  }

  // await signInWithKeycloakAction("naveenraj.gl2002@gmail.com", "12345678");

  return (
    <div className="text-center space-y-4">
      <h1>Bezs</h1>
      <Button
        onClick={async () => {
          // const data = await signUpWithKeyCloakAction({
          //   email: "testuser2345.gnr@gmail.com",
          //   firstName: "Test",
          //   lastName: undefined,
          //   password: "12345678",
          //   username: "test234",
          //   callbackURL: "http://localhost:3000/bezs",
          // });

          const data = await signInWithKeycloakAction(
            "testuser.gnr@gmail.com",
            "12345678",
            "http://localhost:3000/bezs"
          );

          // const data = await keycloakSendVerificationEmail(
          //   "675c4419-2db6-4f91-a0e5-c4cb9806713a",
          //   "MnCFfmokhqOWVHNz7x5rpeMYR4uPcLK8",
          //   "http://localhost:3000"
          // );

          console.log(data);

          // if (data?.redirect) {
          //   window.location.href = data.callbackURL;
          // }
        }}
      >
        SignIn with keycloak
      </Button>
    </div>
  );
}

// async function name() {
//   const data = await auth.api.signInEmail({
//     body: {
//       email: "john.doe@example.com", // required
//       password: "password1234", // required
//       rememberMe: true,
//       callbackURL: "https://example.com/callback",
//     },
//     // This endpoint requires session cookies.
//     headers: await headers(),
//   });
// }

// http://localhost:8080/realms/bezs/login-actions/action-token?key=eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjNDc1ODJhMy02NTRmLTRiYWYtYTJmOC0zMjg1YWY4OTNiZTkifQ.eyJleHAiOjE3NjA3MTM4NTgsImlhdCI6MTc2MDcxMDI1OCwianRpIjoiZDhkMzhmOWQtODllNy00Yjk1LTg0ZjEtOTBhZjFkZTdiNDA5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9iZXpzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9iZXpzIiwic3ViIjoiODQ5NGQ3YTUtNDAyMy00Zjg0LTlkYWYtNTY1MDJjNjdiN2MwIiwidHlwIjoidmVyaWZ5LWVtYWlsIiwiYXpwIjoiYmV6cy1hdXRoIiwibm9uY2UiOiJlZDhjZDQxNi0xZmYzLTRmYTYtOGJiOS03M2FhZWRmMTczYzkiLCJlbWwiOiJ0ZXN0dXNlci5nbnJAZ21haWwuY29tIn0.OuLIdZmNItJa8thG0PR00t-GVSeaAZiLc-O7-iCtL03OEQXKd-teD8s5yDB7iLSs57NqK8JItPzYOgPh2dU1UA
