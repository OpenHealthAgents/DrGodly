"use client";

import { SignInForm } from "@/modules/client/auth/components/auth/signin-form";
import { signInWithKeycloakGenericOAuth } from "@/modules/client/auth/server-actions/auth-actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useServerAction } from "zsa-react";

const SignInPage = () => {
  const router = useRouter();
  const { execute, isPending } = useServerAction(
    signInWithKeycloakGenericOAuth
  );

  useEffect(() => {
    (async () => {
      const [data] = await execute();
      console.log(data);

      if (data?.redirect) {
        window.location.href = data.url;
      }
    })();
  }, [execute, router]);

  return (
    <>
      <SignInForm isAuthCheckPending={isPending} />
    </>
  );
};

export default SignInPage;
