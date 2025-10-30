"use client";

import { Bell, Search } from "lucide-react";

// import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher";
import { NavUser } from "../nav-user";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CommandSearch } from "./command-search";

type TUser = {
  name?: string;
  email?: string;
  image?: string | null | undefined;
  username?: string | null | undefined;
};

const AppNavbar = ({ user }: { user: TUser }) => {
  // const t = useTranslations("bezs");

  // bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60

  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight || 68;
      if (window.scrollY > headerHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 left-0 z-50 w-full bg-background transition-shadow duration-300",
        scrolled && "shadow-sm"
      )}
    >
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger
            className="cursor-pointer max-md:scale-125"
            variant="outline"
          />
          <Separator orientation="vertical" className="!h-6" />
          {/* <InputGroup>
            <InputGroupInput
              placeholder="Search..."
              className="!h-6 !rounded-4xl"
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd>⌘ k</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup> */}
          <CommandSearch />
        </div>

        <div className="flex items-center gap-6">
          <div>
            <LocaleSwitcher />
          </div>
          <Bell className="h-5 w-5 block text-zinc-500 dark:text-zinc-300 cursor-pointer" />
          <NavUser user={user} />
        </div>
      </nav>
    </header>
  );
};

export default AppNavbar;
