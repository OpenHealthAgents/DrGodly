"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSession } from "../../auth/betterauth/auth-client";
import { useAdminModalStore } from "../stores/admin-modal-store";
import { AppType } from "../../../server/prisma/generated/main-database";
import { CustomInput } from "@/modules/shared/components/custom-input";
import { useServerAction } from "zsa-react";
import { createApp } from "../server-actions/app-actions";
import {
  CreateAppValidationSchema,
  TCreateAppForm,
} from "@/modules/shared/schemas/admin/appValidationSchema";

export const CreateAppModal = () => {
  const session = useSession();
  const closeModal = useAdminModalStore((state) => state.onClose);
  const modalType = useAdminModalStore((state) => state.type);
  const isOpen = useAdminModalStore((state) => state.isOpen);

  const isModalOpen = isOpen && modalType === "addApp";

  const form = useForm<TCreateAppForm>({
    resolver: zodResolver(CreateAppValidationSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      type: "platform",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const selectAppType = Object.values(AppType).map((type) => ({
    label: type,
    value: type,
  }));

  const { execute } = useServerAction(createApp, {
    onSuccess({ data }) {
      toast.success(`${data?.name ?? ""} app created.`);
      handleCloseModal();
    },
    onError({ err }) {
      toast.error("An Error Occurred!", {
        description: err.message,
      });
    },
  });

  async function handleCreateApp(values: TCreateAppForm) {
    if (!session) {
      return;
    }

    await execute({ ...values });
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">Create App</DialogTitle>
          <DialogDescription>Apps are used by consumers.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateApp)}
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
                      Create <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    "Create"
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
