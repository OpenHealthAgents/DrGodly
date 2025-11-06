"use client";

import { SignUpForm } from "@/modules/client/auth/components/auth/signup-form";
import { signInWithKeycloakGenericOAuth } from "@/modules/client/auth/server-actions/auth-actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useServerAction } from "zsa-react";

const SignUpPage = () => {
  const router = useRouter();
  const { execute, isPending } = useServerAction(
    signInWithKeycloakGenericOAuth
  );

  useEffect(() => {
    (async () => {
      const [data] = await execute();

      if (data?.redirect) {
        window.location.href = data.url;
      }
    })();
  }, [execute, router]);

  return (
    <>
      <SignUpForm isAuthCheckPending={isPending} />
    </>
  );
};

export default SignUpPage;
