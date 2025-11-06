"use client";

import LocaleSwitcher from "@/modules/shared/components/LocaleSwitcher";
import { ThemeSwitcher } from "@/theme/theme-switcher";
import { landingButtonVariants } from "./landing-page-button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const RootNavBarPage = ({ session }: { session: any | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("navbar");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-landing-background)]/80 backdrop-blur-sm shadow-md border-b border-[var(--color-landing-border)]"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-[var(--color-landing-primary)]"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3ZM22 17.5H17.5V22H14.5V17.5H10V14.5H14.5V10H17.5V14.5H22V17.5Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-2xl font-bold text-[var(--color-landing-foreground)]">
                {t("brand")}
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-[var(--color-landing-foreground)] font-medium hover:text-[var(--color-landing-primary)] transition-colors"
              >
                {t("features")}
              </a>
              <a
                href="#how-it-works"
                className="text-[var(--color-landing-foreground)] font-medium hover:text-[var(--color-landing-primary)] transition-colors"
              >
                {t("howItWorks")}
              </a>
              <a
                href="#testimonials"
                className="text-[var(--color-landing-foreground)] font-medium hover:text-[var(--color-landing-primary)] transition-colors"
              >
                {t("testimonials")}
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <LocaleSwitcher />
              <ThemeSwitcher />
              {!session ? (
                <>
                  <Link
                    href="/signin"
                    className={landingButtonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    {t("signIn")}
                  </Link>
                  <Link
                    href="/signup"
                    className={landingButtonVariants({
                      variant: "primary",
                      size: "sm",
                    })}
                  >
                    {t("signUp")}
                  </Link>
                </>
              ) : (
                <Link
                  href="/bezs"
                  className={landingButtonVariants({
                    variant: "primary",
                    size: "sm",
                  })}
                >
                  {t("openApp")}
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default RootNavBarPage;
