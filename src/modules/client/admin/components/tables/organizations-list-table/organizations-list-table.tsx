"use client";

import DataTable from "@/modules/shared/components/table/data-table";
import { useAdminModalStore } from "@/modules/client/admin/stores/admin-modal-store";
import type { ZSAError } from "zsa";
import { organizationsListTableColumn } from "./organizations-list-table-column";
import { TOrganizationsData } from "@/modules/shared/entities/models/admin/organization";

type IOrganizationsListTable = {
  organizationsDatas: TOrganizationsData | null;
  error: ZSAError | null;
};

export const OrganizationsListTable = ({
  organizationsDatas,
  error,
}: IOrganizationsListTable) => {
  const openModal = useAdminModalStore((state) => state.onOpen);

  return (
    <>
      <div className="space-y-8 w-full">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Manage Organizations</h1>
          <p className="text-sm">Manage Organizations and members.</p>
        </div>
        <DataTable
          columns={organizationsListTableColumn}
          data={organizationsDatas?.organizationsData ?? []}
          dataSize={organizationsDatas?.total}
          label="All Organizations"
          addLabelName="Add Organization"
          searchField="name"
          error={(!organizationsDatas && error?.message) || null}
          fallbackText={
            (error && error.message) ||
            (organizationsDatas?.organizationsData?.length === 0 &&
              "No Organizations") ||
            undefined
          }
          openModal={() =>
            openModal({
              type: "addOrganization",
            })
          }
        />
      </div>
    </>
  );
};
