import { getServerSession } from "@/modules/server/auth/betterauth/auth-server";
import AppNavbar from "@/modules/shared/components/navbar/app-navbar";
import { redirect } from "next/navigation";

const AppListingLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession();
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
    <>
      <AppNavbar user={user} />
      {/* <BreadCrumb /> */}
      <main>{children}</main>
    </>
  );
};

export default AppListingLayout;
