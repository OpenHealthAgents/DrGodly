"use client";

import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import { useTranslations } from "next-intl";

const BezsPage = () => {
  const t = useTranslations("home");
  const { data } = useSession();
  console.log(data);

  return (
    <div className="flex items-center justify-center h-full">
      <h1>{t("header")}</h1>
    </div>
  );
};

export default BezsPage;
