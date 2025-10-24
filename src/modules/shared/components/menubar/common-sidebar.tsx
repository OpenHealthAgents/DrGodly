"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/modules/client/auth/betterauth/auth-client";
// import { getRolewiseAppMenuItems } from "@/shared/modules-utils/utils";
import { Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type MenuItemsStateType = {
  name: string;
  slug: string;
  icon: string | null;
  description: string;
}[];

const isMatch = (pathname: string, slug: string) => {
  return pathname === slug;
};

// const isActive = (pathname: string, slug: string) => {
//   return pathname === slug || pathname.startsWith(slug);
// };

/**
 * Renders a collapsible sidebar with dynamic menu items, active-route highlighting and loading/error states.
 * @example
 * <CommonSideBar label="Admin" />
 * // Returns a JSX sidebar element ready to be embedded in a page.
 * @param {string} label - Text displayed as the sidebar group label.
 * @returns {JSX.Element} Fully composed sidebar component.
 * @description
 *   - Shows a spinner until user session data is resolved, then populates menu items.
 *   - Uses current pathname and theme to style active links and colors appropriately.
 *   - Displays an error message when menu data cannot be retrieved.
 *   - Icon components are looked up at runtime from lucide-react; falls back to LayoutGrid when missing.
 */
export const CommonSideBar = ({ label }: { label: string }) => {
  const { data, isPending } = useSession();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const appSlug = pathname?.split("/")[2];
  const [menuItems, setMenuItems] = useState<MenuItemsStateType>([
    {
      name: "Manage Apps",
      slug: "/bezs/admin/manage-apps",
      description: "addwef",
      icon: "Dashboard",
    },
  ]);
  const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     if (!isPending) {
  //       const rolewiseAppMenus = getRolewiseAppMenuItems(
  //         data?.userRBAC,
  //         appSlug!
  //       );
  //       setMenuItems(rolewiseAppMenus || []);
  //       if (rolewiseAppMenus?.length === 0 || !rolewiseAppMenus) {
  //         setError("Failed to get menu data");
  //       } else {
  //         setError(null);
  //       }
  //     }
  //   }, [isPending, appSlug, data]);

  return (
    <Sidebar
      className="!absolute h-full overflow-y-auto overflow-hidden"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          {isPending && <Loader2 className="animate-spin" />}
          {error && <p>{error}</p>}
          <SidebarMenu>
            <SidebarMenuItem className="space-y-2">
              {menuItems.map((item, i) => {
                const Icon =
                  LucideIcons[item?.icon as keyof typeof LucideIcons] ||
                  LucideIcons.LayoutGrid;

                if (!item.icon) return null;

                return (
                  <SidebarMenuButton
                    key={i}
                    className={
                      isMatch(pathname, item.slug)
                        ? `bg-primary hover:bg-primary/50 ${
                            resolvedTheme === "zinc-dark"
                              ? "text-zinc-900 hover:text-zinc-100"
                              : "text-zinc-100 hover:text-zinc-100"
                          }`
                        : "hover:bg-primary/20"
                    }
                    asChild
                  >
                    <Link
                      href={item.slug}
                      className="flex items-center gap-2 w-full"
                    >
                      {Icon ? <Icon className="w-5 h-5" /> : null} {item.name}
                    </Link>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
