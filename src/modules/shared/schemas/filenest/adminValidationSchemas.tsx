import z from "zod";
import { ZodECloudStorageVendor } from "../../entities/enums/filenest/storage";

const IdsSchema = z.object({
  id: z.bigint().positive().min(BigInt(1), "ID is required"),
  orgId: z.string().min(1, "Org ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

const BaseCloudStorageSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(100),
    vendor: ZodECloudStorageVendor,
    region: z.string().min(1, "Region is required"),
    bucketName: z.string().nullable(),
    containerName: z.string().nullable(),
    clientId: z.string().min(1, "Client ID is required"),
    clientSecret: z.string().min(1, "Client Secret is required"),
    maxFileSize: z.number().min(1),
    isActive: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.vendor === "AWS_S3") {
      if (!data.bucketName || data.bucketName.trim() === "") {
        ctx.addIssue({
          path: ["bucketName"],
          code: z.ZodIssueCode.custom,
          message: "Bucket name is required for AWS S3",
        });
      }
      if (data.containerName && data.containerName.trim() !== "") {
        ctx.addIssue({
          path: ["containerName"],
          code: z.ZodIssueCode.custom,
          message: "Container name must be empty for AWS S3",
        });
      }
    }

    if (data.vendor === "AZURE_BLOB") {
      if (!data.containerName || data.containerName.trim() === "") {
        ctx.addIssue({
          path: ["containerName"],
          code: z.ZodIssueCode.custom,
          message: "Container name is required for Azure Blob",
        });
      }
      if (data.bucketName && data.bucketName.trim() !== "") {
        ctx.addIssue({
          path: ["bucketName"],
          code: z.ZodIssueCode.custom,
          message: "Bucket name must be empty for Azure Blob",
        });
      }
    }
  });

export const GetCloudStorageConfigsValidationSchema = IdsSchema.omit({
  id: true,
});
export type TGetCloudStorageConfigsValidationSchema = z.infer<
  typeof GetCloudStorageConfigsValidationSchema
>;

export const CreateCloudStorageValidationSchema = BaseCloudStorageSchema.and(
  IdsSchema.omit({
    id: true,
  })
);
export type TCreateCloudStorageValidationSchema = z.infer<
  typeof CreateCloudStorageValidationSchema
>;

export const UpdateCloudStorageValidationSchema =
  BaseCloudStorageSchema.and(IdsSchema);
export type TUpdateCloudStorageValidationSchema = z.infer<
  typeof UpdateCloudStorageValidationSchema
>;

export const DeleteCloudStorageValidationSchema = IdsSchema.pick({
  id: true,
  orgId: true,
  userId: true,
});
export type TDeleteCloudStorageValidationSchema = z.infer<
  typeof DeleteCloudStorageValidationSchema
>;

export const CreateOrUpdateCloudStorageFormSchema = BaseCloudStorageSchema;
export type TCreateOrUpdateCloudStorageFormSchema = z.infer<
  typeof CreateOrUpdateCloudStorageFormSchema
>;

const BaseLocalStorageSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  basePath: z.string().min(1, "Base path is required"),
  maxFileSize: z.number().min(1),
  isActive: z.boolean(),
});

export const CreateLocalStorageValidationSchema = BaseLocalStorageSchema.and(
  IdsSchema.omit({
    id: true,
  })
);
export type TLocalStorageValidationSchema = z.infer<
  typeof CreateLocalStorageValidationSchema
>;

export const UpdateLocalStorageValidationSchema =
  BaseLocalStorageSchema.and(IdsSchema);
export type TUpdateLocalStorageValidationSchema = z.infer<
  typeof UpdateLocalStorageValidationSchema
>;

export const CreateOrUpdateLocalStorageFormSchema = BaseLocalStorageSchema;
export type TCreateOrUpdateLocalStorageFormSchema = z.infer<
  typeof CreateOrUpdateLocalStorageFormSchema
>;
