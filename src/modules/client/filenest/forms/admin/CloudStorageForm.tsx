"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  CreateOrUpdateCloudStorageFormSchema,
  TCreateOrUpdateCloudStorageFormSchema,
} from "@/modules/shared/schemas/filenest/adminValidationSchemas";
import { cloudStorageVendorOptions } from "@/modules/shared/entities/enums/filenest/storage";
import {
  FormInput,
  FormSelect,
  FormSwitch,
} from "@/modules/shared/custom-form-fields";
import { fileSizeOptions } from "../../datas/storage";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { TCloudStorageConfig } from "../../types/cloudStorage";

interface CloudStorageFormProps {
  onSubmit: (data: TCreateOrUpdateCloudStorageFormSchema) => Promise<void>;
  onCancel: () => void;
  initialData?: TCloudStorageConfig | null;
}

export function CloudStorageForm({
  onSubmit,
  onCancel,
  initialData,
}: CloudStorageFormProps) {
  const [showSecret, setShowSecret] = useState(false);

  const form = useForm<TCreateOrUpdateCloudStorageFormSchema>({
    resolver: zodResolver(CreateOrUpdateCloudStorageFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      vendor: initialData?.vendor || "AWS_S3",
      region: initialData?.region || "",
      bucketName: initialData?.bucketName || "",
      containerName: initialData?.containerName || "",
      clientId: initialData?.clientId || "",
      clientSecret: initialData?.clientSecret || "",
      maxFileSize: initialData?.maxFileSize || 500,
      isActive: initialData?.isActive ?? true,
    },
  });

  const vendor = form.watch("vendor");

  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (data: TCreateOrUpdateCloudStorageFormSchema) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    setShowSecret(false);
    form.reset();
    onCancel();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Basic Info */}
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Basic Information</FieldLegend>
          <FieldGroup className="grid sm:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="name"
              placeholder="My AWS Storage"
              label="Configuration Name"
            />

            <FormSelect
              control={form.control}
              name="vendor"
              label="Cloud Vendor"
              placeholder="Select vendor"
            >
              {cloudStorageVendorOptions.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.label}
                </SelectItem>
              ))}
            </FormSelect>

            <FormInput
              control={form.control}
              name="region"
              placeholder="Enter region name"
              label="Region"
            />

            {vendor === "AWS_S3" && (
              <FormInput
                control={form.control}
                label="Bucket Name"
                name="bucketName"
                placeholder="my-bucket"
              />
            )}

            {vendor === "AZURE_BLOB" && (
              <FormInput
                control={form.control}
                label="Container Name"
                name="containerName"
                placeholder="my-container"
              />
            )}
          </FieldGroup>
        </FieldSet>
      </FieldGroup>

      {/* Credentials */}
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Credentials</FieldLegend>
          <FieldGroup className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              label="Client ID / Access Key"
              name="clientId"
              placeholder="Enter client ID"
            />
            <Controller
              control={form.control}
              name="clientSecret"
              render={({ field, fieldState }) => {
                return (
                  <Field className="gap-2" data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>
                        Client Secret / Secret Key
                      </FieldLabel>
                    </FieldContent>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        value={field.value ?? ""}
                        placeholder="Enter client secret"
                        type={showSecret ? "text" : "password"}
                      />
                      <InputGroupAddon>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full hover:bg-transparent"
                          onClick={() => setShowSecret(!showSecret)}
                        >
                          {showSecret ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>

      {/* Settings */}
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Settings</FieldLegend>

          <FieldGroup className="grid grid-cols-2 gap-4">
            <FormSelect
              control={form.control}
              name="maxFileSize"
              label="Maximum File Size"
              placeholder="Select max size"
              customValue={form.watch("maxFileSize").toString()}
              onCustomChange={(value) =>
                form.setValue("maxFileSize", parseInt(value))
              }
            >
              {fileSizeOptions.map((size) => (
                <SelectItem key={size.value} value={size.value.toString()}>
                  {size.label}
                </SelectItem>
              ))}
            </FormSelect>

            <FormSwitch
              control={form.control}
              name="isActive"
              label="Active Status"
            >
              <span className="text-sm text-muted-foreground">
                {form.watch("isActive") ? "Active" : "Inactive"}
              </span>
            </FormSwitch>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>

      {/* Actions */}
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button disabled={isSubmitting} size="sm">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" /> Save Configuration
            </>
          ) : (
            "Save Configuration"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
