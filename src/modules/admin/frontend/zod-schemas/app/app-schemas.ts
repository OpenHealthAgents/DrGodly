import z from "zod";
import { AppType } from "../../../../../../prisma/generated/main-database";

export const createAppFormSchema = z.object({
  name: z.string().min(3, { message: "name must be atleast 3 characters." }),
  slug: z
    .string()
    .min(3, { message: "slug is required." })
    .refine((val) => val === val.toLowerCase(), {
      message: "Slug must be in lowercase.",
    }),
  description: z
    .string()
    .min(5, "Description must have atleast 5 characters")
    .max(150, "Description must have atmost 150 characters"),
  type: z.nativeEnum(AppType),
});

export const deleteAppSchema = z.object({
  id: z.string(),
});

export const editAppFormSchema = createAppFormSchema.merge(deleteAppSchema);
