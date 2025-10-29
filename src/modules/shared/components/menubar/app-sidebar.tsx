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
  House,
  LayoutDashboard,
  ShieldUser,
  UserRoundCog,
} from "lucide-react";
import { usePathname } from "@/i18n/navigation";

type TUser = {
  name?: string;
  email?: string;
  image?: string | null | undefined;
  username?: string | null | undefined;
};

const homeSidebarData = {
  navGroups: [
    {
      title: "Home",
      items: [
        {
          title: "Home",
          url: "/bezs",
          icon: House,
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
      ],
    },
  ],
};

export function AppSidebar({ user }: { user: TUser }) {
  const pathname = usePathname();
  const sidebarData = pathname.includes("admin")
    ? adminSidebarData
    : homeSidebarData;

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader>
        <AppTitle />
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
