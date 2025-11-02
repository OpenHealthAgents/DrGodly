import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "@/modules/server/auth/betterauth/auth-server";
import BreadCrumb from "@/modules/shared/components/breadcrumb";
import { AppSidebar } from "@/modules/shared/components/menubar/app-sidebar";
import AppNavbar from "@/modules/shared/components/navbar/app-navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AppListingLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession();
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const user = {
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image,
    username: session?.user.username,
  };

  if (!session) {
    redirect("/signin");
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user} />
      <SidebarInset className="min-w-0">
        <AppNavbar user={user} />
        <main className="mx-auto px-8 max-w-[110rem] space-y-6 w-full">
          <BreadCrumb />
          <div className="w-full">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppListingLayout;

/* 
<SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="flex flex-col min-w-0">
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <AppNavbar user={user} />
        </div>
        <main className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto p-6 space-y-6">
          <BreadCrumb />
          <div className="w-full min-w-0 overflow-x-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
*/
