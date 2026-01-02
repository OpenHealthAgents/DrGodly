// "use client";

// import { Button } from "@/components/ui/button";
// import { seedDoctorServices } from "../../../../seed-script/doctor-seed";
// import { setPasswordForUsers } from "../../../../seed-script/s";

import { redirect } from "@/i18n/navigation";
import { getServerSession } from "@/modules/server/auth/betterauth/auth-server";
import { getLocale } from "next-intl/server";

const BezsPage = async () => {
  const session = await getServerSession();
  const locale = await getLocale();

  if (!session) {
    redirect({ href: "/signin", locale });
  }

  if (session?.user.roleBasedRedirectUrls) {
    redirect({ href: session.user.roleBasedRedirectUrls, locale });
  }

  return (
    <div className="h-full p-4">
      <h1>Bezs</h1>
      {/* <Button
        onClick={async () => {
          await setPasswordForUsers();
        }}
      >
        Seed
      </Button> */}
    </div>
  );
};

export default BezsPage;
