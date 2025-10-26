import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="text-center space-y-4">
      <h1>{t("header")}</h1>
    </div>
  );
}
