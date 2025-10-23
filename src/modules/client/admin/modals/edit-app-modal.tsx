"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppType } from "../../../server/prisma/generated/main-database";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAdminModalStore } from "../stores/admin-modal-store";
import { useSession } from "@/modules/client/auth/betterauth/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  TCreateAppForm as TEditAppForm,
  CreateAppValidationSchema as EditAppValidationFormSchema,
} from "@/modules/shared/schemas/admin/appValidationSchema";
import { CustomInput } from "@/modules/shared/components/custom-input";
import { useEffect } from "react";
import { editApp } from "../server-actions/app-actions";
import { useServerAction } from "zsa-react";

export const EditAppModal = () => {
  const session = useSession();
  const closeModal = useAdminModalStore((state) => state.onClose);
  const modalType = useAdminModalStore((state) => state.type);
  const isOpen = useAdminModalStore((state) => state.isOpen);
  const appData = useAdminModalStore((state) => state.appData);

  const isModalOpen = isOpen && modalType === "editApp";

  const form = useForm<TEditAppForm>({
    resolver: zodResolver(EditAppValidationFormSchema),
    defaultValues: {
      name: appData?.name,
      slug: appData?.slug,
      description: appData?.description,
      type: appData?.type,
    },
  });

  useEffect(() => {
    if (isModalOpen && appData) {
      form.reset({
        name: appData.name,
        slug: appData.slug,
        description: appData.description,
        type: appData.type,
      });
    }
  }, [appData, form, isModalOpen]);

  const {
    formState: { isSubmitting },
  } = form;

  const selectAppType = Object.values(AppType).map((type) => ({
    label: type,
    value: type,
  }));

  const { execute } = useServerAction(editApp, {
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

  async function handleEditUser(values: TEditAppForm) {
    if (!session) {
      return;
    }

    if (!appData || !appData?.id) {
      toast.warning("No app data found.");
      return;
    }

    const data = {
      id: appData?.id,
      ...values,
    };

    await execute({ ...data });
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">Edit App</DialogTitle>
          <DialogDescription>Apps are used by consumers.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditUser)}
              className="grid w-full items-center gap-3"
            >
              <CustomInput
                type="input"
                control={form.control}
                name="name"
                label="Name"
                placeholder="name"
                inputType="text"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="slug"
                label="Slug"
                placeholder="..."
                inputType="text"
              />

              <CustomInput
                type="textarea"
                control={form.control}
                name="description"
                label="Description"
                placeholder="..."
                inputType="text"
              />

              <CustomInput
                type="select"
                control={form.control}
                name="type"
                label="Type"
                placeholder="Select a type"
                selectList={selectAppType}
              />

              <div className="space-x-4 justify-self-end">
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                  size="sm"
                >
                  {isSubmitting ? (
                    <>
                      Edit <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    "Edit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
