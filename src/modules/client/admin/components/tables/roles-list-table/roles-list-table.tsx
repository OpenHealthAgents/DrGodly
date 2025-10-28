"use client";

import DataTable from "@/modules/shared/components/table/data-table";
import { useAdminModalStore } from "@/modules/client/admin/stores/admin-modal-store";
import type { ZSAError } from "zsa";
import { rolesListTableColumn } from "./roles-list-table-column";
import { TRolesData } from "@/modules/shared/entities/models/admin/role";

type IRolesListTable = {
  rolesData: TRolesData | null;
  error: ZSAError | null;
};

export const RolesListTable = ({ rolesData, error }: IRolesListTable) => {
  const openModal = useAdminModalStore((state) => state.onOpen);

  return (
    <>
      <div className="space-y-8 w-full">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Manage Roles</h1>
          <p className="text-sm">
            Define and control user access by creating and editing roles with
            specific permissions.
          </p>
        </div>
        <DataTable
          columns={rolesListTableColumn}
          data={rolesData?.roleDatas ?? []}
          dataSize={rolesData?.total}
          label="All Roles"
          addLabelName="Add Role"
          searchField="name"
          error={(!rolesData?.roleDatas && error?.message) || null}
          fallbackText={
            (error && error.message) ||
            (rolesData?.roleDatas?.length === 0 && "No Roles") ||
            undefined
          }
          openModal={() =>
            openModal({
              type: "addRole",
            })
          }
        />
      </div>
    </>
  );
};
