import {
  Building,
  CalendarClock,
  CalendarPlus,
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

export const homeSidebarData = {
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

export const adminSidebarData = {
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

export const telemedicineSidebarData = {
  navGroups: [
    {
      title: "Admin Management",
      items: [
        {
          title: "Manage Doctors",
          url: "/bezs/telemedicine/admin/manage-doctors",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Doctor",
      items: [
        {
          title: "Dashboard",
          url: "/bezs/telemedicine/doctor",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Patient",
      items: [
        {
          title: "Dashboard",
          url: "/bezs/telemedicine/patient",
          icon: LayoutDashboard,
        },
        {
          title: "Book Appointment",
          url: "/bezs/telemedicine/patient/askai",
          icon: CalendarPlus,
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
              url: "/bezs/telemedicine/doctor/profile",
              icon: UserCog,
            },
            {
              title: "Availability",
              url: "/bezs/telemedicine/doctor/availability",
              icon: CalendarClock,
            },
          ],
        },
      ],
    },
  ],
};
