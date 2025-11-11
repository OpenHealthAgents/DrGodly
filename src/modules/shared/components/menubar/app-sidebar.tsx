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
import {
  Building,
  CalendarRange,
  FileSliders,
  LayoutDashboard,
  Palette,
  Settings,
  ShieldUser,
  UserCog,
  UserRoundCog,
  Wrench,
} from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { OrgSwitcher } from "./org-switcher";

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

const homeSidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/bezs",
          icon: LayoutDashboard,
        },
        {
          title: "Calendar",
          url: "/bezs/calendar",
          icon: CalendarRange,
        },
      ],
    },
    {
      title: "Others",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: "/bezs/settings",
              icon: UserCog,
            },
            {
              title: "Account",
              url: "/bezs/settings/account",
              icon: Wrench,
            },
            {
              title: "Preference",
              url: "/bezs/settings/preference",
              icon: Palette,
            },
          ],
        },
      ],
    },
  ],
};

const adminSidebarData = {
  navGroups: [
    {
      title: "Admin Management",
      items: [
        {
          title: "Manage Apps",
          url: "/bezs/admin/manage-apps",
          icon: LayoutDashboard,
        },
        {
          title: "Manage Organizations",
          url: "/bezs/admin/manage-organizations",
          icon: Building,
        },
        {
          title: "Manage Roles",
          url: "/bezs/admin/manage-roles",
          icon: UserRoundCog,
        },
        {
          title: "RBAC",
          url: "/bezs/admin/rbac",
          icon: ShieldUser,
        },
        {
          title: "Preference Templates",
          url: "/bezs/admin/manage-preferences",
          icon: FileSliders,
        },
      ],
    },
  ],
};

export function AppSidebar({ user, orgs }: { user: TUser; orgs: TOrgs }) {
  const pathname = usePathname();
  const sidebarData = pathname.includes("admin")
    ? adminSidebarData
    : homeSidebarData;

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
