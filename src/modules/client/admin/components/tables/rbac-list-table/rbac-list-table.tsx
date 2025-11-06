"use client";

import { RbacListColumn } from "./rbac-list-column";
import DataTable from "@/modules/shared/components/table/data-table";
import { TRbacDatas } from "@/modules/shared/entities/models/admin/rbac";
import { ZSAError } from "zsa";
import { TRole } from "@/modules/shared/entities/models/admin/role";

type IRBACListTable = {
  rbacDatas: TRbacDatas | null;
  roleDatas?: TRole[] | null;
  error: ZSAError | null;
};

export const RBACListTable = ({
  rbacDatas,
  roleDatas,
  error,
}: IRBACListTable) => {
  const roleFilterData = roleDatas?.map((data) => data.name);

  return (
    <>
      <div className="mx-auto w-full">
        <DataTable
          columns={RbacListColumn}
          data={rbacDatas?.rbacDatas ?? []}
          dataSize={rbacDatas?.total}
          label="RBAC Datas"
          isAddButton={false}
          searchField="user"
          filterField="role"
          filterValues={roleFilterData}
          error={(!rbacDatas && error?.message) || null}
          fallbackText={
            (error && error.message) ||
            (rbacDatas?.rbacDatas?.length === 0 && "No Organizations") ||
            undefined
          }
        />
      </div>
    </>
  );
};
