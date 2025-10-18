"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/modules/auth/betterauth/auth-client";
import axios from "axios";
import { useRouter } from "next/navigation";

const BezsPage = () => {
  const { data } = useSession();
  console.log(data);
  const router = useRouter();

  async function logOutKeycloakAction(
    refreshToken: string,
    callbackURL: string
  ) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/keycloakProvider/logout",
        {
          refreshToken,
          callbackURL,
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

  return (
    <div className="flex items-center justify-center h-full">
      <h1>Bezs Page</h1>
      <Button
        size="sm"
        onClick={async () => {
          const resData = await logOutKeycloakAction(
            data.keycloak.refreshToken,
            "http://localhost:3000"
          );

          if (resData.redirect) {
            // router.push(resData.callbackURL);
            window.location.href = resData.callbackURL;
          }
        }}
      >
        Logout Keycloak
      </Button>
    </div>
  );
};

export default BezsPage;
