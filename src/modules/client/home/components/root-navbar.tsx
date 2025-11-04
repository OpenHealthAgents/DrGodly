"use client";

import LocaleSwitcher from "@/modules/shared/components/LocaleSwitcher";
import { ThemeSwitcher } from "@/theme/theme-switcher";
import { landingButtonVariants } from "./landing-page-button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

const RootNavBarPage = ({ session }: { session: any | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const { execute, isPending } = useServerAction(signInWithKeycloak);

  // async function handleSignIn(url: string) {
  //   const authProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER;

  //   if (authProvider === "keycloak") {
  //     const [data, error] = await execute();

  //     if (error) {
  //       toast.error("Failed to do signin");
  //     }

  //     if (data && data.redirect) {
  //       window.location.href = data.url;
  //     }
  //   }
  //   router.push(url);
  // }

  {
    /* <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleSignIn("/signin")}
                  disabled={isPending || session.isPending}
                  className="!no-underline cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleSignIn("/signup")}
                  disabled={isPending || session.isPending}
                  className="!no-underline cursor-pointer"
                >
                  Sign Up
                </Button> */
  }

  return (
    <>
      {/* <nav className="flex items-center justify-between px-4 py-1.5 bg-white dark:bg-zinc-800/60 shadow-md">
        <div>
          <h1>
            <Link href="/">Bezs</Link>
          </h1>
        </div>
        <ul className="flex items-center gap-2">
          <li>
            <LocaleSwitcher />
          </li>
          <li>
            <ThemeSwitcher />
          </li>
          <li className="flex items-center gap-2">
            {!session ? (
              <>
                <Link
                  href="/signin"
                  className={cn(
                    "cursor-pointer",
                    buttonVariants({
                      variant: "link",
                      size: "sm",
                      className: "!no-underline",
                    })
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    "cursor-pointer",
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                      className: "!no-underline",
                    })
                  )}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/bezs"
                className={cn(
                  "cursor-pointer",
                  buttonVariants({
                    variant: "default",
                    size: "sm",
                    className: "!no-underline",
                  })
                )}
              >
                Open
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
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
                Dr. Godly
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-[var(--color-landing-foreground)] font-medium hover:text-[var(--color-landing-primary)] transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-[var(--color-landing-foreground)] font-medium hover:text-[var(--color-landing-primary)] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-[var(--color-landing-foreground)] font-medium hover:text-[var(--color-landing-primary)] transition-colors"
              >
                Testimonials
              </a>
            </nav>

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
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className={landingButtonVariants({
                      variant: "primary",
                      size: "sm",
                    })}
                  >
                    Sign Up
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
                  Open App
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
