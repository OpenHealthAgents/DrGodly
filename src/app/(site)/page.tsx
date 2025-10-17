"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/modules/auth/betterauth/auth";
import { getServerSession } from "@/modules/auth/betterauth/auth-server";
import axios from "axios";
import { headers } from "next/headers";

export default function Home() {
  // const session = await getServerSession();
  // console.log(session);

  async function signInWithKeycloakAction(username: string, password: string) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/keycloakProvider/signin",
        {
          username,
          password,
        }
      );

      const data = res.data;

      if (!data.success) {
        console.log(data.error);
        throw new Error(data.error);
      }

      console.log(data);
      return data;
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  async function signUpWithKeyCloakAction({
    username,
    email,
    firstName,
    lastName,
    password,
  }: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
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
      console.log((err as Error).message);
    }
  }

  // await signInWithKeycloakAction("naveenraj.gl2002@gmail.com", "12345678");

  return (
    <div className="text-center space-y-4">
      <h1>Bezs</h1>
      <Button
        onClick={async () =>
          await signUpWithKeyCloakAction({
            email: "testuser.gnr@gmail.com",
            firstName: "Test",
            lastName: "User",
            password: "12345678",
            username: "test",
          })
        }
      >
        Signup with keycloak
      </Button>
    </div>
  );
}

async function name() {
  const data = await auth.api.signInEmail({
    body: {
      email: "john.doe@example.com", // required
      password: "password1234", // required
      rememberMe: true,
      callbackURL: "https://example.com/callback",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
}
