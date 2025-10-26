"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdminModalStore } from "../stores/admin-modal-store";
import { useSession } from "../../auth/betterauth/auth-client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import {
  CreateAppMenuItemFormSchema,
  TCreateAppMenuItemForm,
} from "@/modules/shared/schemas/admin/appMenuItemValidationSchema";
import { createAppMenuItem } from "../server-actions/appMenutem-actions";
import { useServerAction } from "zsa-react";

export const CreateAppMenuItemModal = () => {
  const session = useSession();
  const closeModal = useAdminModalStore((state) => state.onClose);
  const modalType = useAdminModalStore((state) => state.type);
  const isOpen = useAdminModalStore((state) => state.isOpen);
  const appId = useAdminModalStore((state) => state.appId) || "";

  const isModalOpen = isOpen && modalType === "addAppMenuItem";

  const form = useForm<TCreateAppMenuItemForm>({
    resolver: zodResolver(CreateAppMenuItemFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      icon: "",
      description: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    form.reset({
      name: "",
      slug: "",
      description: "",
      icon: "",
    });
  }, [form]);

  const { execute } = useServerAction(createAppMenuItem, {
    onSuccess({ data }) {
      toast.success(`${data?.name ?? ""} menu item created`);
      handleCloseModal();
    },
    onError({ err }) {
      toast.error("An Error Occurred!", {
        description: err.message,
      });
    },
  });

  async function handleCreateMenuItem(values: TCreateAppMenuItemForm) {
    if (!session) {
      return;
    }

    if (!appId) return;

    await execute({ ...values, appId });

    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="p-8 ">
        <DialogHeader>
          <DialogTitle className="mb-6 text-2xl text-center">
            Create App MenuItem
          </DialogTitle>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateMenuItem)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="...." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (Lowercase)</FormLabel>
                      <FormControl>
                        <Input placeholder="my-org" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menu Icon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="icon name"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-x-4">
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Submit <Loader2 className="animate-spin" />
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="cursor-pointer"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </div>
          <DialogFooter className="space-x-2"></DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
