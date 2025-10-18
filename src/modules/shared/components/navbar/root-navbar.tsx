import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "@/modules/auth/betterauth/auth-server";
import { ThemeSwitcher } from "@/theme/theme-switcher";
import Link from "next/link";

const RootNavBarPage = async () => {
  const session = await getServerSession();
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

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-1.5 bg-white dark:bg-zinc-800/60 shadow-md">
        <div>
          <h1>
            <Link href="/">Bezs</Link>
          </h1>
        </div>
        <ul className="flex items-center gap-2">
          <li>{/* <LangSwitcherBtn /> */}</li>
          <li>
            <ThemeSwitcher />
          </li>
          <li className="flex items-center gap-2">
            {!session ? (
              <>
                {/* <Button
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
                </Button> */}
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
      </nav>
    </>
  );
};

export default RootNavBarPage;
