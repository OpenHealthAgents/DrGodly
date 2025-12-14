"use client";

import { EmptyState } from "@/modules/shared/components/EmptyState";
import { AlertTriangle, FolderCog, Plus } from "lucide-react";
import { useFilenestAdminStoreModal } from "../../../stores/admin-store-modal";
import { IFileEntitiesProps } from "../../../types/fileEntities";
import DataTable from "@/modules/shared/components/table/data-table";
import { fileEntitiesTableColumn } from "./fileEntitiesTableColumn";

function FileEntitiesTable({ fileEntities, error }: IFileEntitiesProps) {
  const openModal = useFilenestAdminStoreModal((state) => state.onOpen);

  if (error) {
    return (
      <EmptyState
        icon={<AlertTriangle className="text-destructive" />}
        title="An Unexpected Error Occurred!"
        description={error.message || "Please try again later."}
        buttonLabel="Reload"
        error={error}
      />
    );
  }

  if (!fileEntities || fileEntities?.length === 0) {
    return (
      <EmptyState
        icon={<FolderCog />}
        title="No File Entitie Configured"
        description="Configure file entities."
        buttonLabel="Add File Entity"
        buttonIcon={<Plus />}
        buttonOnClick={() => {
          openModal({ type: "createFileEntity" });
        }}
      />
    );
  }

  return (
    <DataTable
      columns={fileEntitiesTableColumn}
      data={fileEntities ?? []}
      dataSize={fileEntities?.length ?? 0}
      label="File Entities Config"
      addLabelName="Add File Entity"
      searchField="name"
      fallbackText="No File Entity Config Found"
      openModal={() => {
        openModal({
          type: "createFileEntity",
        });
      }}
    />
  );
}

export default FileEntitiesTable;
