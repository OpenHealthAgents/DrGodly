"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import { useFilenestAdminStoreModal } from "../../stores/admin-store-modal";
import { useServerAction } from "zsa-react";
import { handleInputParseError } from "@/modules/shared/utils/handleInputParseError";
import { CloudStorageForm } from "../../forms/admin/CloudStorageForm";
import { TCreateOrUpdateCloudStorageFormSchema } from "@/modules/shared/schemas/filenest/adminValidationSchemas";
import { updateCloudStorageConfig } from "../../server-actions/cloud-storage-action";

export const EditCloudStorageModal = () => {
  const session = useSession();
  const closeModal = useFilenestAdminStoreModal((state) => state.onClose);
  const modalType = useFilenestAdminStoreModal((state) => state.type);
  const isOpen = useFilenestAdminStoreModal((state) => state.isOpen);
  const cloudStorageConfigData = useFilenestAdminStoreModal(
    (state) => state.cloudStorageConfigData
  );

  const isModalOpen = isOpen && modalType === "editCloudStorage";

  const { execute } = useServerAction(updateCloudStorageConfig, {
    onSuccess({ data }) {
      toast.success(`${data?.name ?? ""} cloud storage edited.`);
      handleCloseModal();
    },
    onError({ err }) {
      // const handled = handleInputParseError({
      //   err,
      //   form,
      //   toastMessage: "Form validation failed",
      //   toastDescription: "Please correct the highlighted fields below.",
      // });

      // if (handled) return;

      toast.error("An unexpected error occurred.", {
        description: err.message ?? "Please try again later.",
      });
    },
  });

  async function handleCreateCloudStorage(
    values: TCreateOrUpdateCloudStorageFormSchema
  ) {
    if (!session || !session.data?.user || !session.data.user?.currentOrgId) {
      toast.error("User not authenticated.");
      return;
    }

    if (!cloudStorageConfigData) {
      toast.error("Cloud Storage Config not found.");
      return;
    }

    const data = {
      ...values,
      userId: session.data.user.id,
      orgId: session.data.user.currentOrgId,
      id: cloudStorageConfigData.id,
    };

    await execute(data);
  }

  function handleCloseModal() {
    closeModal();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Cloud Storage</DialogTitle>
          <DialogDescription>
            Edit the cloud storage details to update this entry in your
            collection.
          </DialogDescription>
        </DialogHeader>
        <CloudStorageForm
          onCancel={handleCloseModal}
          onSubmit={handleCreateCloudStorage}
          initialData={cloudStorageConfigData}
        />
      </DialogContent>
    </Dialog>
  );
};
