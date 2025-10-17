// "use client";

// import { checkAuthProvider } from "@/modules/auth/checkAuthProvider";
import { checkAuthProvider } from "@/modules/auth/checkAuthProvider";
import { SignInForm } from "@/modules/auth/components/auth/signin-form";
import { signInWithKeycloak } from "@/modules/auth/frontend/server-actions/auth-actions";
import { useEffect } from "react";
import { useServerAction } from "zsa-react";

const SignInPage = async () => {
  // const { execute } = useServerAction(signInWithKeycloak);
  await checkAuthProvider();

  // useEffect(() => {
  //   (async () => {
  //     const [data, error] = await execute();

  //     if (data?.redirect) {
  //       window.location.href = data.url;
  //     }

  //     if (error) console.log(error);
  //   })();
  // }, [execute]);

  return (
    <>
      <SignInForm />
    </>
  );
};

export default SignInPage;
