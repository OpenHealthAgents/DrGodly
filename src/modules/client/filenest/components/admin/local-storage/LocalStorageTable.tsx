"use client";

import { EmptyState } from "@/modules/shared/components/EmptyState";
import { HardDrive, Plus } from "lucide-react";
import { useFilenestAdminStoreModal } from "../../../stores/admin-store-modal";

function LocalStorageTable() {
  const openModal = useFilenestAdminStoreModal((state) => state.onOpen);

  return (
    <EmptyState
      icon={<HardDrive />}
      title="No Local Storage Configured"
      description="Configure local storage paths to organize and manage files on your server."
      buttonLabel="Add Local Storage"
      buttonIcon={<Plus />}
      buttonOnClick={() => {
        openModal({ type: "createLocalStorage" });
      }}
    />
  );
}

export default LocalStorageTable;
