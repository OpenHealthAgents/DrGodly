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

export function AppSidebar({ user, orgs }: { user: TUser; orgs: TOrgs }) {
  const pathname = usePathname();

  let sidebarData;
  if (pathname.startsWith("/bezs/admin")) {
    sidebarData = adminSidebarData;
  } else if (pathname.includes("/bezs/telemedicine")) {
    sidebarData = telemedicineSidebarData;
  } else {
    sidebarData = homeSidebarData;
  }

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
        {sidebarData.navGroups.map((props) => (
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
