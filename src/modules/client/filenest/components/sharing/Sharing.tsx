"use client";

import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import { TSharedUser } from "@/modules/shared/types";
import { useSearchParams } from "next/navigation";
import { getUserFilePermissionsByOwnerAction } from "../../server-actions/user-file-permission.actions";
import { useQuery } from "@tanstack/react-query";

interface ISharingProps {
  user: TSharedUser;
}

export function Sharing({ user }: ISharingProps) {
  const session = useSession();
  const searchParams = useSearchParams();
  const appSlug = searchParams?.get("app") as string;

  const {
    data: sharingFilesData,
    error: sharingFilesDataError,
    isPending: sharingFilesDataIsPending,
    isFetching: sharingFilesDataIsFetching,
  } = useQuery({
    queryKey: ["fileUploadEntitiesData", user.orgId, appSlug],
    enabled: !!appSlug, // 👈 wait until param exists
    queryFn: async () =>
      await getUserFilePermissionsByOwnerAction({
        orgId: user.orgId,
        userId: user.id,
        appSlug: appSlug,
      }),
  });

  if (sharingFilesData?.[0]) {
    const data = Object.groupBy(
      sharingFilesData?.[0],
      ({ sharedUserId }) => sharedUserId
    );

    console.log(data);
  }

  //   console.log(sharingFilesData);

  return <p>Sharing Files Listing Component</p>;
}
