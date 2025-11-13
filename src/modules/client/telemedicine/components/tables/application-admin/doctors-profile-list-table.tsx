"use client";

import DataTable from "@/modules/shared/components/table/data-table";
import { doctorsProfileListTableColumn } from "./doctors-profile-list-table-column";
import type { ZSAError } from "zsa";
import { TAppDatas } from "@/modules/shared/entities/models/admin/app";
// import { clientLogger } from "@/modules/shared/utils/client-logger";
// import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { TDoctorDatas } from "@/modules/shared/entities/models/telemedicine/doctorProfile";
import { useServerAction } from "zsa-react";
import { createDoctorInitialProfile } from "../../../server-actions/doctorProfile-actions/doctorProfile-actions";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";

type TUser = {
  id: string;
  name: string;
  username?: string | null;
  currentOrgId?: string | null;
  email: string;
};

type IAppsListTable = {
  doctorDatas: TDoctorDatas | null;
  error: ZSAError | null;
  user: TUser;
};

export const DoctorsProfileListTable = ({
  doctorDatas,
  error,
  user,
}: IAppsListTable) => {
  const router = useRouter();
  const t = useTranslations("admin.manageApps");

  const { execute, isPending, isSuccess } = useServerAction(
    createDoctorInitialProfile
  );

  if (isPending) {
    return (
      <div className="w-full grid place-content-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin size-6" />{" "}
          <span>Initiating create doctor...</span>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="w-full grid place-content-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin size-6" />{" "}
          <span>Redirecting to doctor profile creation...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 w-full">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-sm">{t("subtitle")}</p>
        </div>
        <DataTable
          columns={doctorsProfileListTableColumn(t)}
          data={doctorDatas?.doctorDatas ?? []}
          dataSize={doctorDatas?.total}
          label={t("table.label")}
          addLabelName={t("table.addApp")}
          //   searchField="name"
          error={(!doctorDatas && error?.message) || null}
          fallbackText={
            (error && error.message) ||
            (doctorDatas?.doctorDatas?.length === 0 && t("table.noApps")) ||
            undefined
          }
          //   filterField="type"
          //   filterValues={typeFilteredData}
          openModal={async () => {
            if (!user.currentOrgId) {
              toast.warning("No Organization Found", {
                description: "Join in an organization to continue.",
              });
              return;
            }

            const [data, error] = await execute({
              orgId: user.currentOrgId,
              createdBy: user.id,
            });

            if (!error && data) {
              router.push({
                pathname: "/bezs/telemedicine/admin/manage-doctors/create",
                query: { id: data.id },
              });
            }
          }}
        />
      </div>
    </>
  );
};
