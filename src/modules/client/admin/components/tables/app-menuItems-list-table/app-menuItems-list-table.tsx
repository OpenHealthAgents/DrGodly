"use client";

import { useAdminModalStore } from "../../../stores/admin-modal-store";
import DataTable from "@/modules/shared/components/table/data-table";
import { appMenuItemsListColumn } from "./app-menuItems-list-column";
import { TAppMenuItemsData } from "@/modules/shared/entities/models/admin/appMenuItem";
import type { ZSAError } from "zsa";

interface IAppMenuItemListTable {
  appMenuItemDatas: TAppMenuItemsData | null;
  error: ZSAError | null;
}

export const AppMenuItemsListTable = ({
  appMenuItemDatas,
  error,
}: IAppMenuItemListTable) => {
  const openModal = useAdminModalStore((state) => state.onOpen);

  return (
    <>
      <div className="space-y-8 w-full">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Manage Menu Items</h1>
          <p className="text-sm">Manage Menu Items and its functionality.</p>
        </div>
        <DataTable
          columns={appMenuItemsListColumn}
          data={appMenuItemDatas?.appMenuItemsData ?? []}
          dataSize={appMenuItemDatas?.total}
          label="All Menu Items"
          addLabelName="Add Menu Item"
          searchField="name"
          error={(!appMenuItemDatas && error?.message) || null}
          fallbackText={
            (error && error.message) ||
            (appMenuItemDatas?.appMenuItemsData?.length === 0 &&
              "No App Menu Items") ||
            undefined
          }
          openModal={() => openModal({ type: "addAppMenuItem" })}
        />
      </div>
    </>
  );
};
