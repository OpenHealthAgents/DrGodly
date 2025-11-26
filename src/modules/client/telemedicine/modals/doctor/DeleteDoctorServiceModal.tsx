"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useServerAction } from "zsa-react";
import { useDoctoeModalStore } from "../../stores/doctor-modal-store";
import { deleteDoctorService } from "../../server-actions/doctorService-action";

export const DeleteDoctorServiceModal = () => {
  const closeModal = useDoctoeModalStore((s) => s.onClose);
  const modalType = useDoctoeModalStore((s) => s.type);
  const isOpen = useDoctoeModalStore((s) => s.isOpen);
  const userId = useDoctoeModalStore((s) => s.userId);
  const orgId = useDoctoeModalStore((s) => s.orgId);
  const serviceId = useDoctoeModalStore((s) => s.serviceId);

  const isModalOpen = isOpen && modalType === "deleteService";

  const { execute, isPending } = useServerAction(deleteDoctorService, {
    onSuccess({ data }) {
      toast.success(`${data?.name ?? ""} service Deleted.`);
      handleCloseModal();
    },
    onError({ err }) {
      toast.error("An Error Occurred!", {
        description: err.message,
      });
    },
  });

  async function handleAppDelete() {
    if (!userId || !orgId || !serviceId) {
      toast.error("Unauthorized", {
        description: "User or Organization or Service information is missing.",
      });
      return;
    }

    await execute({ orgId, serviceId, userId });
  }

  function handleCloseModal() {
    closeModal();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete App</DialogTitle>
          <DialogDescription>
            Deleting this service will permanently remove it from your service
            list and related records.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleAppDelete} disabled={isPending} size="sm">
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Delete
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
