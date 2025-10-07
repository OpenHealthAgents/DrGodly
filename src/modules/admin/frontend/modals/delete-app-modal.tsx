"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useAdminModalStore } from "../stores/admin-modal-store";
import { useSession } from "@/modules/auth/betterauth/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { deleteApp } from "../server-actions/app-actions";
import { useServerAction } from "zsa-react";

export const DeleteAppModal = () => {
  const session = useSession();
  const closeModal = useAdminModalStore((state) => state.onClose);
  const modalType = useAdminModalStore((state) => state.type);
  const isOpen = useAdminModalStore((state) => state.isOpen);
  const appId = useAdminModalStore((state) => state.appId) || "";

  const isModalOpen = isOpen && modalType === "deleteApp";

  const { execute, isPending } = useServerAction(deleteApp, {
    onSuccess({ data }) {
      toast.success(`${data?.name ?? ""} app Edited.`);
      handleCloseModal();
    },
    onError({ err }) {
      toast.error("An Error Occurred!", {
        description: err.message,
      });
    },
  });

  async function handleAppDelete() {
    if (session.data?.user.role !== "admin") {
      return;
    }

    await execute({ id: appId });
  }

  function handleCloseModal() {
    closeModal();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete App</DialogTitle>
          <DialogDescription className="mb-6 text-md">
            Are you sure you want to delete this App? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter className="space-x-2">
            <Button
              className="cursor-pointer"
              onClick={handleAppDelete}
              disabled={isPending}
              size="sm"
            >
              {isPending ? (
                <>
                  Delete <Loader2 className="animate-spin" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
            <DialogClose asChild>
              <Button className="cursor-pointer" size="sm" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
