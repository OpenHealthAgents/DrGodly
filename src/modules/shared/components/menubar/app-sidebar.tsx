"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavGroup } from "./nav-group";
import { NavUser } from "../nav-user";
import { AppTitle } from "./app-title";
import { usePathname } from "@/i18n/navigation";
import { OrgSwitcher } from "./org-switcher";
import {
  adminSidebarData,
  homeSidebarData,
  telemedicineSidebarData,
} from "./menu-datas";
import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import { useEffect, useMemo, useState } from "react";
import { getRolewiseAppMenuItems } from "./utils";
import { Loader2 } from "lucide-react";

type TUser = {
  name: string;
  email: string;
  image?: string | null;
  username?: string | null;
  currentOrgId?: string | null;
};

type TOrgs = {
  name: string;
  id: string;
  metadata: string | null;
  slug: string;
  logo: string | null;
}[];

type MenuItemsStateType = {
  name: string;
  slug: string;
  icon: string | null;
  description: string;
}[];

export function AppSidebar({ user, orgs }: { user: TUser; orgs: TOrgs }) {
  const pathname = usePathname();
  const { data, isPending } = useSession();

  const defaultMenuItems = useMemo(() => {
    if (pathname === "/bezs") {
      return homeSidebarData;
    } else {
      return {
        navGroups: [
          {
            title: "Menu Items",
            items: [],
          },
        ],
      };
    }
  }, [pathname]);

  const appSlug = pathname.split("/")[2];
  const isHomeRoute = appSlug === "/bezs";
  const [menuItems, setMenuItems] = useState<any>(defaultMenuItems);
  const [error, setError] = useState<string | null>(null);

  // let sidebarData;
  // if (pathname.startsWith("/bezs/admin")) {
  //   sidebarData = adminSidebarData;
  // } else if (pathname.includes("/bezs/telemedicine")) {
  //   sidebarData = telemedicineSidebarData;
  // } else {
  //   sidebarData = homeSidebarData;
  // }

  useEffect(() => {
    if (!isPending) {
      const rolewiseAppMenus = getRolewiseAppMenuItems(data?.userRBAC, appSlug);
      const items: any = {
        navGroups: [
          {
            title: "Menu Items",
            items: [],
          },
        ],
      };

      if (pathname !== "/bezs") {
        rolewiseAppMenus?.forEach((item) => {
          items.navGroups[0].items.push({
            title: item.name,
            url: item.slug,
            icon: item.icon,
          });
        });
        setMenuItems(items);
        if (rolewiseAppMenus?.length === 0 || !rolewiseAppMenus) {
          setError("Failed to get menu data");
        } else {
          setError(null);
        }
      }
    }
  }, [isPending, appSlug, data]);

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        {orgs.length > 0 ? (
          <OrgSwitcher orgs={orgs} currentOrgId={user?.currentOrgId} />
        ) : (
          <AppTitle />
        )}
      </SidebarHeader>
      <SidebarContent>
        {error && <div>{error}</div>}
        {!isHomeRoute && isPending && (
          <div className="flex items-center gap-2 px-4 mt-4 text-sm">
            <Loader2 className="animate-spin size-4" /> Loading...
          </div>
        )}
        {!error &&
          !isPending &&
          menuItems.navGroups.map((props: any) => (
            <NavGroup key={props.title} {...props} />
          ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} isSidebar />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
